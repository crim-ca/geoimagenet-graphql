const {RESTDataSource} = require('apollo-datasource-rest');

class MLAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://geoimagenetdev.crim.ca/ml';
    }

    async datasetReducer(dataset) {
        const dataset_detail_response = await this.get(`datasets/${dataset.uuid}`);
        const full_dataset = dataset_detail_response.data.dataset;

        const patches = full_dataset.data['patches'];
        let classes = {};
        patches.map(patch => {
            classes[patch.class] = classes[patch.class] ? classes[patch.class] + 1 : 1;
        });

        return {
            id: full_dataset.uuid,
            created: full_dataset.created,
            classes: Object.keys(classes).length,
            annotations: patches.length,
            name: full_dataset.name,
        }
    }

    async getAllDatasets() {
        const res = await this.get('datasets');
        if (res.data && res.data.datasets) {
            return Array.isArray(res.data.datasets)
                ? res.data.datasets.map(async dataset => await this.datasetReducer(dataset))
                : [];
        }
        return [];
    }
}

module.exports = MLAPI;
