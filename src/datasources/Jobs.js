// @flow
const {AuthDataSource} = require('./AuthDataSource');
const {typeDefs: {JobLaunchResponse, Job}} = require('../schema');
const {job_input_reducer, job_output_reducer} = require('./GeoImageNetAPI');
const Sentry = require('@sentry/node');
const {pubsub} = require('../utils');

const JOB_MODEL_TEST = 'model-tester';

type JobFromMachineLearningAPI = {
    user: Object,
    outputs: Object,
};

function to_readable_date(string) {
    const date = new Date(string);
    return `${date.toLocaleDateString('default')} ${date.toLocaleTimeString('default')}`;
}

class Jobs extends AuthDataSource {

    constructor(base_url: string, gin_api_endpoint: string) {
        super(base_url);
        this.geoimagenet_api_endpoint = gin_api_endpoint;
    }

    async launch_model_test_job(model_id: string): Promise<JobLaunchResponse> {

        let dataset_id;
        try {
            dataset_id = await this.latest_dataset();
        } catch (e) {
            return {
                success: false,
                message: 'There does not seem to be datasets yet. Please ask your admin to create a dataset ' +
                    'before launching tests.',
            }
        }

        try {
            const job_data = await this.api_job_launch_request(model_id, dataset_id);
            pubsub.publish(JOB_MODEL_TEST, job_data);
            return {
                success: true,
                job: await this.get_job(JOB_MODEL_TEST, job_data.job_uuid),
            };
        } catch (e) {
            console.log(e);
            Sentry.captureException(e);
            return {
                success: false,
                message: e.message,
            }
        }
    }

    async latest_dataset(): Promise<any> {
        const res = await this.get('/datasets/latest');
        return res.data.dataset.uuid;
    }

    async api_job_launch_request(model_id: string, dataset_id: string): Promise<any> {
        const res = await this.post(`/processes/${JOB_MODEL_TEST}/jobs`, {
            inputs: [
                {id: 'dataset', value: dataset_id},
                {id: 'model', value: model_id},
            ]
        });
        return res.data;
    }

    async get_job(process_id: string, job_id: string): Job {
        const res = await this.get(`processes/${process_id}/jobs/${job_id}`);
        return this.job_reducer(res.data.job);
    }

    async fetch_all_jobs_from_ml_api(process_id: string) {
        const res = await this.get(`processes/${process_id}/jobs`);
        const fetch_jobs_statuses = res.data.jobs.map(job => this.get(`processes/${process_id}/jobs/${job.uuid}`));
        const all_jobs = await Promise.all(fetch_jobs_statuses);
        // if the job is failed, fetch the logs and replace the status_message of the relevant job
        const failed_jobs_logs = all_jobs.filter(job => job.data.job.status === 'failed').map(job => this.get(`processes/${process_id}/jobs/${job.data.job.uuid}/logs`));
        if (failed_jobs_logs.length > 0) {
            const all_logs = await Promise.all(failed_jobs_logs);
            all_logs.forEach(log => {
                const log_job_uuid = log.meta.job_uuid;
                const next_to_last_log = log.data.logs.slice(-2)[0];
                const actual_message = next_to_last_log.match(/.+(Job <.+> .+)/)[1];
                const corresponding_job = all_jobs.find(job => job.data.job.uuid === log_job_uuid);
                corresponding_job.data.job.status_message = actual_message;
            });
        }
        return all_jobs.map(job_response => job_response.data.job);
    }

    async get_all_jobs(process_id: string, user_id: string) {
        const all_jobs = await this.fetch_all_jobs_from_ml_api(process_id);
        const filtered_jobs = all_jobs.filter(job => job.user === user_id);
        return filtered_jobs.map(job => this.job_reducer(job));
    }

    /*
    we need to compose the benchmarks
    they are an aggregate of data from multiple sources
    we first need to know what model was tested
      (model_id, owner, when the model was uploaded, when it was tested, what was the dataset)
    then we need the results from the test job itself.
     */
    async get_public_benchmarks() {

        // we first need all the public model-tester jobs ids
        const all_jobs = await this.fetch_all_jobs_from_ml_api(JOB_MODEL_TEST);
        const public_jobs = all_jobs.filter(job => job.visibility === 'public');
        const public_jobs_ids = public_jobs.map(job => job.uuid);

        // we then get all those jobs information and extract the data portion
        const public_jobs_information_responses = await Promise.all(public_jobs_ids
            .map(uuid => this.get(`processes/${JOB_MODEL_TEST}/jobs/${uuid}`)));
        const jobs_information = public_jobs_information_responses.map(({data: {job}}) => job);

        // we now fetch all the jobs results and aggregate those to the existing jobs objects
        const public_jobs_results_responses = await Promise.all(public_jobs_ids
            .map(uuid => this.get(`processes/${JOB_MODEL_TEST}/jobs/${uuid}/result`)));
        public_jobs_results_responses.forEach(response => {
            const {meta: {job_uuid}, data: {outputs}} = response;
            const existant_job = jobs_information.find(elem => elem.uuid === job_uuid);
            Object.assign(existant_job, {outputs});
        });

        return jobs_information.map(job => this.benchmark_reducer(job));
    }

    benchmark_reducer(job: JobFromMachineLearningAPI) {
        
        const {user, outputs} = job;
        const summary = outputs.find(dict => dict.id === 'summary');
        const metrics = outputs.find(dict => dict.id === 'metrics');
        // metrics compared to null to differentiate between 0 and null
        return {
            job: job,
            owner: user,
            result: {
                summary: summary && summary.value ? summary.value : {},
                metrics: {
                    top_1_accuracy: metrics && metrics.value.top_1_accuracy != null ? metrics.value.top_1_accuracy : 0.0,
                    top_5_accuracy: metrics.value.top_5_accuracy != null ? metrics.value.top_5_accuracy : 0.0,
                    mIoU: metrics && metrics.value.mIoU != null ? metrics.value.mIoU : 0.0,
                },
                samples: [],
                classes: [],
                mapping: [],
                predictions: [],
            },
        };
    }

    async launch_batch() {
        let result;
        try {
            result = await this.post(`processes/batch-creation/jobs`, JSON.stringify({
                inputs: [
                    {id: 'name', value: Date.now()},
                    {
                        id: 'geojson_urls',
                        value: `${this.geoimagenet_api_endpoint}/batches/annotations`,
                    },
                    {
                        id: 'taxonomy_url',
                        value: `${this.geoimagenet_api_endpoint}/taxonomy_classes`,
                    },
                    {
                        id: "overwrite",
                        value: true
                    },
                    {
                        id: "crop_fixed_size",
                        value: 64
                    },
                    {
                        id: "crop_mode",
                        value: 1
                    }
                ]
            }), {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        } catch (e) {
            Sentry.captureException(e);
            return {
                success: false,
                message: e.extensions.response.statusText,
            };
        }


        let job;
        try {
            const {job_uuid} = result.data;
            job = await this.get_job('batch-creation', job_uuid);
        } catch (e) {
            Sentry.captureException(e);
            return {
                success: false,
                message: e.extensions.response.statusText,
            };
        }
        return {
            success: true,
            job: job,
        };
    }

    async benchmark_visibility(job_id: string, visibility: string) {
        let response;
        try {
            response = await this.put(`processes/${JOB_MODEL_TEST}/jobs/${job_id}`, {
                visibility: visibility
            });
        } catch (e) {
            if (e.extensions.response.status === 403) {
                return {
                    success: false,
                    message: "You don't have permissions to update that job status."
                };
            }
            Sentry.captureException(e);
            return {
                success: false,
                message: 'We were unable to modify the job state.'
            };
        }
        const {data: {job: {uuid}}} = response;
        return {
            success: true,
            job: await this.get_job(JOB_MODEL_TEST, uuid),
        };
    }

    job_reducer(job: any): Job {
        return {
            ...job,
            id: job.uuid,
            inputs: job.inputs.map(input => job_input_reducer(input)),
            created: to_readable_date(job.created),
            started: to_readable_date(job.started),
            finished: to_readable_date(job.finished),
        };
    }

}

module.exports = {Jobs};
