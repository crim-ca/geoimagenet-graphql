const {RESTDataSource} = require('apollo-datasource-rest');

function to_readable_date(string) {
    const date = new Date(string);
    return `${date.toLocaleDateString('default')} ${date.toLocaleTimeString('default')}`;
}

class MLAPI extends RESTDataSource {
    constructor(baseURL) {
        super();
        this.baseURL = baseURL;
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

    async modelReducer(model) {
        const model_detail_response = await this.get(`models/${model.uuid}`);
        const full_model = model_detail_response.data.model;
        return {
            id: full_model.uuid,
            name: full_model.name,
            created: full_model.created,
            path: full_model.path,
        };
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

    async getAllModels() {
        const res = await this.get('models');
        if (res.data && res.data.models) {
            return Array.isArray(res.data.models)
                ? res.data.models.map(async model => await this.modelReducer(model))
                : [];
        }
        return [];
    }
}

module.exports = MLAPI;
