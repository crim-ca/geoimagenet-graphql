// @flow
const {AuthDataSource} = require('./AuthDataSource');
const {JobLaunchResponse} = require('../schema');
const {job_input_reducer, job_output_reducer} = require('./geoimagenet_api');
const Sentry = require('@sentry/node');
const {pubsub} = require('../utils');

function to_readable_date(string) {
    const date = new Date(string);
    return `${date.toLocaleDateString('default')} ${date.toLocaleTimeString('default')}`;
}

class Jobs extends AuthDataSource {

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
            pubsub.publish('model-tester', job_data);
            return {
                success: true,
                job: await this.get_job('model-tester', job_data.job_uuid),
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
        const res = await this.post(`/processes/model-tester/jobs`, {
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

    job_reducer(job) {
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
