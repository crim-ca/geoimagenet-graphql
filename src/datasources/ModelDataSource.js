// @flow
const {AuthDataSource} = require('./AuthDataSource');
const Raven = require('raven');
const stream = require('stream');
const fs = require('fs');
const sanitize = require('sanitize-filename');
const {typeDefs: {Model}} = require('../schema');

function make_model_root(date: Date, shared_volume_path: string) {
    const year = date.getFullYear();
    // getMonth returns the month 0-indexed...
    const month = date.getMonth() + 1;
    return `${shared_volume_path}/${year}/${month}`;
}
function make_model_file_path(shared_root: string, filename: string) {
    return `${shared_root}/${sanitize(filename)}`;
}

type UploadedFile = {
    stream: stream.Readable,
    filename: string,
    mimetype: string,
    encoding: string
}

function validate_or_create_path(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
        fs.mkdir(path, {recursive: true}, (err) => {
            if (err) {
                reject(err);
            }
            resolve(path);
        });
    });
}

class ModelDataSource extends AuthDataSource {
    constructor(ml_endpoint: string, shared_volume_path: string) {
        super();
        this.baseURL = ml_endpoint;
        this.shared_volume_path = shared_volume_path;
    }

    async upload_model(model_name: string, file: UploadedFile) {

        const {stream, filename, mimetype, encoding} = await file;
        // TODO validate mimetype, encoding, stuff

        let path;
        try {
            path = await this.store_model({stream, filename});
        } catch (e) {
            Raven.captureException(e);
            return this.model_upload_response(false, "We were unable to save the file");
        }

        let res;
        try {
            res = await this.post('models', {
                model_name: model_name,
                model_path: path,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        } catch (e) {
            Raven.captureException(e);
            Raven.captureMessage(`tried to save model at path ${path} with name ${model_name}`);
            await fs.unlinkSync(path);
            return this.model_upload_response(false, e.message);
        }

        await fs.unlinkSync(path);
        const model = this.model_reducer(res.data.model);
        return this.model_upload_response(true, 'model upload was successful', model);
    }

    model_upload_response(success: boolean, message: string, model: Model) {
        return {
            success: success,
            message: message,
            model: model
        };
    }

    async store_model({stream, filename}: {stream: stream.Readable, filename: string}) {
        const shared_models_root = make_model_root(new Date(), this.shared_volume_path);
        await validate_or_create_path(shared_models_root);
        const path = make_model_file_path(shared_models_root, filename);
        return new Promise((resolve, reject) => {
            stream
                .on('error', async error => {
                    console.log(error);
                    await fs.unlinkSync(path);
                    reject(error);
                })
                .pipe(fs.createWriteStream(path))
                .on('error', error => {
                    console.log(error);
                    reject(error);
                })
                .on('finish', () => {
                    resolve(path);
                })
        });
    }
}

module.exports = {
    ModelDataSource,
    make_model_root,
    make_model_file_path
};