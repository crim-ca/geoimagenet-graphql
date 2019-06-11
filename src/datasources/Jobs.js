// @flow
const {AuthDataSource} = require('./AuthDataSource');
const {JobLaunchResponse} = require('../schema');
const {job_input_reducer, job_output_reducer} = require('./geoimagenet_api');
const Sentry = require('@sentry/node');
const {pubsub} = require('../utils');

const JOB_MODEL_TEST = 'model-tester';

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

    async get_job(process_id, job_id) {
        const res = await this.get(`processes/${process_id}/jobs/${job_id}`);
        return this.job_reducer(res.data.job);
    }

    async fetch_all_jobs_from_ml_api(process_id: string) {
        const res = await this.get(`processes/${process_id}/jobs`);
        const fetch_jobs_statuses = res.data.jobs.map(job => this.get(`processes/${process_id}/jobs/${job.uuid}`));
        const all_jobs = await Promise.all(fetch_jobs_statuses);
        return all_jobs.map(job_response => job_response.data.job);
    }

    async get_all_jobs(process_id: string, user_id: string) {
        const jobs = await this.fetch_all_jobs_from_ml_api(process_id);
        const filtered_jobs = jobs.filter(job => job.user = user_id);
        return filtered_jobs.map(job => this.job_reducer(job));
    }

    async get_public_benchmarks() {
        const all_benchmark_jobs = await this.fetch_all_jobs_from_ml_api(JOB_MODEL_TEST);
        const public_benchmark_jobs = all_benchmark_jobs.filter(job => job.visibility === 'public');
        return public_benchmark_jobs.map(job => this.job_reducer(job));
    }

    async launch_batch() {
        let launch_batch_response;
        try {
            launch_batch_response = await this.post(`processes/batch-creation/jobs`, JSON.stringify({
                inputs: [
                    {id: 'name', value: Date.now()},
                    {
                        id: 'geojson_urls',
                        value: `${this.geoimagenet_api_endpoint}/batches/annotations`,
                    },
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

        const {job_uuid} = launch_batch_response.data;
        const job = await this.get_job('batch-creation', job_uuid);
        return {
            success: launch_batch_response.meta.code === 200,
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

    job_reducer(job: any) {
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
