module.exports = {
    Query: {
        datasets: (_, _1, {dataSources}) => dataSources.MLAPI.getAllDatasets(),
    }
};
