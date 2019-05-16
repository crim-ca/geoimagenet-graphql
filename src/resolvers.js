module.exports = {
    Query: {
        datasets: (_, {status}, {dataSources}) => dataSources.MLAPI.get_all_datasets(status),
        models: (_, _1, {dataSources}) => dataSources.MLAPI.get_all_models(),
        jobs: (_, {process_id}, {dataSources}) => dataSources.MLAPI.get_all_jobs(process_id),
    },
    Mutation: {
        start_batch: (_, _1, {dataSources}) => dataSources.MLAPI.launch_batch(),
    },
};
