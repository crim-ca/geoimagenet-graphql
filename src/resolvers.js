module.exports = {
    Query: {
        datasets: (_, {status}, {dataSources}) => dataSources.MLAPI.get_all_datasets(status),
        models: (_, _1, {dataSources}) => dataSources.MLAPI.get_all_models(),
        jobs: (_, {process_id}, {dataSources}) => dataSources.MLAPI.get_all_jobs(process_id),
        benchmarks: (_, _1, {dataSources}) => dataSources.MLAPI.get_all_benchmarks(),
        processes: (_, _1, {dataSources}) => dataSources.MLAPI.get_all_processes(),
        process: (_, {process_id}, {dataSources}) => dataSources.MLAPI.get_process(process_id),
    },
    Mutation: {
        start_batch: (_, _1, {dataSources}) => dataSources.MLAPI.launch_batch(),
        upload_model: (_, {model_name, file}, {dataSources}) => dataSources.MLAPI.upload_model(model_name, file),
    },
};
