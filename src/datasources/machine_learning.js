const {AuthDataSource} = require('./AuthDataSource');
const {job_input_reducer, job_output_reducer} = require('./geoimagenet_api');

function to_readable_date(string) {
    const date = new Date(string);
    return `${date.toLocaleDateString('default')} ${date.toLocaleTimeString('default')}`;
}

class MLAPI extends AuthDataSource {
    constructor(baseURL, GEOIMAGENET_API_URL) {
        super();
        this.baseURL = baseURL;
        this.GEOIMAGENET_API_URL = GEOIMAGENET_API_URL;
    }

    async dataset_reducer(full_dataset) {

        const patches = full_dataset.data['patches'];
        let classes = {};
        patches.map(patch => {
            classes[patch.class] = classes[patch.class] ? classes[patch.class] + 1 : 1;
        });

        return {
            id: full_dataset.uuid,
            created: to_readable_date(full_dataset.created),
            finished: to_readable_date(full_dataset.finished),
            path: full_dataset.path,
            status: full_dataset.status,
            type: full_dataset.type,
            files: full_dataset.files,
            patches: full_dataset.data.patches,
            classes_count: Object.keys(classes).length,
            annotations_count: patches.length,
            name: full_dataset.name,
        }
    }

    async model_reducer(model) {
        const model_detail_response = await this.get(`models/${model.uuid}`);
        const full_model = model_detail_response.data.model;
        return {
            id: full_model.uuid,
            name: full_model.name,
            created: full_model.created,
            path: full_model.path,
        };
    }

    async get_all_datasets(status = null) {
        const res = await this.get('datasets');
        if (res.data && res.data.datasets && Array.isArray(res.data.datasets)) {

            const promises = res.data.datasets.map(d => this.get(`datasets/${d.uuid}`));
            const all_datasets = await Promise.all(promises);
            const datasets = all_datasets.map(d => d.data.dataset);

            if (status !== null) {
                return datasets.filter(d => d.status === status).map(dataset => this.dataset_reducer(dataset));
            }
            return datasets.map(dataset => this.dataset_reducer(dataset));
        }
        return [];
    }

    async get_all_models() {
        const res = await this.get('models');
        if (res.data && res.data.models) {
            return Array.isArray(res.data.models)
                ? res.data.models.map(async model => await this.model_reducer(model))
                : [];
        }
        return [];
    }

    job_reducer(job) {
        return {
            id: job.uuid,
            process: job.process,
            task: job.task,
            service: job.service,
            user: job.user,
            inputs: job.inputs.map(input => job_input_reducer(input)),
            status: job.status,
            status_message: job.status_message,
            status_location: job.status_location,
            execute_async: job.execute_async,
            is_workflow: job.is_workflow,
            created: job.created,
            started: job.started,
            finished: job.finished,
            duration: job.duration,
            progress: job.progress,
            tags: job.tags
        };
    }

    async get_all_jobs(process_id) {
        const res = await this.get(`processes/${process_id}/jobs`);
        const fetch_jobs_statuses = res.data.jobs.map(job => this.get(`processes/${process_id}/jobs/${job.uuid}`));
        const responses = await Promise.all(fetch_jobs_statuses);
        return responses.map(job_response => this.job_reducer(job_response.data.job));
    }

    async get_job(process_id, job_id) {
        const res = await this.get(`processes/${process_id}/jobs/${job_id}`);
        return this.job_reducer(res.data.job);
    }

    async api_response_reducer(launch_batch_response) {
        const {sent_to_ml, response_from_ml, detail} = launch_batch_response;
        return {
            mlSent: {
                inputs: sent_to_ml.inputs.map(input => job_input_reducer(input)),
                outputs: sent_to_ml.outputs.map(output => job_output_reducer(output)),
            },
            mlReceived: response_from_ml,
            detail: detail
        }
    }

    async launch_batch() {
        const launch_batch_response = await this.post(`processes/batch-creation/jobs`, JSON.stringify({
            inputs: [
                {id: 'name', value: Date.now()},
                {
                    id: 'geojson_urls',
                    value: `${this.GEOIMAGENET_API_URL}/batches/annotations`,
                },
            ]
        }), {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const {job_uuid} = launch_batch_response.data;
        const job = await this.get_job('batch-creation', job_uuid);
        return {
            success: launch_batch_response.meta.code === 200,
            job: job,
        };
    }
}

module.exports = MLAPI;
