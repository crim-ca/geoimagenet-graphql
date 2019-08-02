const {AuthDataSource} = require('./AuthDataSource');
const {job_input_reducer, job_output_reducer} = require('./GeoImageNetAPI');
const {typeDefs: {Patch}} = require('../schema');
const {to_readable_date} = require('../utils');



type api_response = {
    data: {
        patches: Array<Patch>
    },
    uuid: string,
    created: string,
    finished: string,
};

class MLAPI extends AuthDataSource {

    async dataset_reducer(full_dataset: api_response) {

        const patches = full_dataset.data['patches'];
        let classes = {};
        patches.map(patch => {
            classes[patch.class] = classes[patch.class] ? classes[patch.class] + 1 : 1;
        });

        return {
            ...full_dataset,
            id: full_dataset.uuid,
            created: to_readable_date(full_dataset.created),
            finished: to_readable_date(full_dataset.finished),
            patches: full_dataset.data.patches,
            classes_count: Object.keys(classes).length,
            annotations_count: patches.length,
        }
    }

    input_or_output_reducer(input_or_output) {
        let type;
        if (input_or_output['types']) {
            type = input_or_output['types'];
        } else {
            type = [input_or_output['type']];
        }
        // There doesn't seem to be any type guarantee in what's returned from the api. patching values with plausible replacements
        return {
            ...input_or_output,
            id: input_or_output.id || input_or_output.identifier,
            abstract: input_or_output.abstract || input_or_output.title,
            minOccurs: input_or_output.minOccurs || 0,
            type: type,
        };
    }

    async process_reducer(process) {
        return {
            ...process,
            id: process.uuid,
            inputs: process.inputs.map(input => this.input_or_output_reducer(input)),
            outputs: process.outputs.map(output => this.input_or_output_reducer(output)),
        };
    }

    async get_process(process_id) {
        const res = await this.get(`processes/${process_id}`);
        return this.process_reducer(res.data.process);
    }

    async get_all_processes() {
        const res = await this.get('processes');
        const ids = res.data.processes.map(process => process.uuid);
        const promises = ids.map(id => this.get(`processes/${id}`));
        const responses = await Promise.all(promises);
        return responses.map(response => this.process_reducer(response.data.process));
    }

    async get_dataset(dataset_id) {
        const response = await this.get(`datasets/${dataset_id}`);
        return this.dataset_reducer(response.data.dataset);
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

    // unused anymore? what was this for...
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
}

module.exports = {MLAPI};
