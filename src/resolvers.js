const {pubsub} = require('./utils');

module.exports = {
    Query: {
        datasets: (_, {status}, {dataSources}) => dataSources.MLAPI.get_all_datasets(status),
        models: (_, __, {dataSources}) => dataSources.MLAPI.get_all_models(),
        jobs: (_, {process_id}, {dataSources, user_id}) => dataSources.jobs.get_all_jobs(process_id, user_id),
        public_benchmarks: (_, __, {dataSources}) => dataSources.jobs.get_public_benchmarks(),
        processes: (_, __, {dataSources}) => dataSources.MLAPI.get_all_processes(),
        process: (_, {process_id}, {dataSources}) => dataSources.MLAPI.get_process(process_id),
    },
    Mutation: {
        launch_test: (_, {model_id}, {dataSources}) => dataSources.jobs.launch_model_test_job(model_id),
        launch_dataset_creation_job: (_, __, {dataSources}) => dataSources.jobs.launch_batch(),
        benchmark_visibility: (_, {job_id, visibility}, {dataSources}) => dataSources.jobs.benchmark_visibility(job_id, visibility),
        upload_model: (_, {model_name, file}, {dataSources}) => dataSources.model_data_source.upload_model(model_name, file),
    },
    Subscription: {
        jobs: (_, {process_id}) => pubsub.asyncIterator([process_id])
    },
    Benchmark: {
        model: (benchmark, _, {dataSources}) => {
            const model_id = benchmark.job.inputs.find(dict => dict.id === 'model').value;
            return dataSources.model_data_source.get_model(model_id);
        },
        dataset: (benchmark, _, {dataSources}) => {
            const dataset_id = benchmark.job.inputs.find(dict => dict.id === 'dataset').value;
            return dataSources.MLAPI.get_dataset(dataset_id);
        },
    }
};
