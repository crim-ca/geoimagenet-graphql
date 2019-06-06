// @flow
const {AuthDataSource} = require('./AuthDataSource');
const {JobLaunchResponse} = require('../schema');
const Sentry = require('@sentry/node');
const {pubsub} = require('../utils');

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
                job: job_data,
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

}

module.exports = {Jobs};
