// @flow
const {AuthDataSource} = require('./AuthDataSource');
const Sentry = require('@sentry/node');
const stream = require('stream');
const fs = require('fs');
const sanitize = require('sanitize-filename');
const {to_readable_date} = require('../utils');
const {typeDefs: {Upload, ModelUploadResponse, Model}} = require('../schema');

function make_model_root(date: Date, shared_volume_path: string) {
    const year = date.getFullYear();
    // getMonth returns the month 0-indexed...
    const month = date.getMonth() + 1;
    return `${shared_volume_path}/${year}/${month}`;
}

function make_model_file_path(shared_root: string, filename: string) {
    return `${shared_root}/${sanitize(filename)}`;
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
        super(ml_endpoint);
        this.shared_volume_path = shared_volume_path;
    }

    /**
     * Lors de l'upload, plusieurs étapes bien distinctes doivent avoir lieu.
     *
     * 1. Recevoir le fichier streamé avec la requête et le sauver sur le disque
     *    1.1 TODO éventuellement valider le mimetype et la taille
     * 2. Faire un post à l'api de machine learning pour créer un nouveau modèle avec le path associé au modèle.
     *    L'api de ML va à son tour copier le fichier quelque part.
     * 3. Supprimer le fichier uploadé
     * 4. Envoyer une réponse de succès.
     *
     * à chacune de ces étapes des erreurs peuvent arriver. Il faut capturer l'exception avec Sentry et répondre avec un
     * message d'erreur pertinent pour la personne utilisant la plateforme.
     */
    * upload_generator(model_name: string, file: Upload): Generator<Promise<any>, ModelUploadResponse, any> {
        /**
         * Promesse 1: acquérir les ressources à partir de l'api fournie par
         */
        const {stream, filename, mimetype, encoding} = yield file;

        let path;
        try {
            /**
             * Promesse 2: sauver le fichier sur disque, retourne le path
             */
            path = yield this.store_model({stream, filename});
        } catch (e) {
            Sentry.captureException(e);
            return this.model_upload_response(false, "We were unable to save the file");
        }

        let res;
        try {
            /**
             * Promesse 3: requête POST à l'API de machine learning
             */
            res = yield this.post('models', {
                model_name: model_name,
                model_path: path,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        } catch (e) {
            Sentry.captureException(e);
            /**
             * Promesse 4: effacer le fichier
             */
            yield fs.unlinkSync(path);
            return this.model_upload_response(false, e.message);
        }

        /**
         * Promesse 4: effacer le fichier
         */
        yield fs.unlinkSync(path);

        /**
         * Promesse 5: create correct type from api response
         */
        const model = yield this.model_reducer(res.data.model);
        return this.model_upload_response(true, 'model upload was successful', model);
    }

    async upload_model(model_name: string, file: Upload) {

        let result;
        let value;
        let done;
        const generator = this.upload_generator(model_name, file);

        do {
            const next = generator.next(result);
            value = next.value;
            done = next.done;
            result = await value;
        } while (!done) ;

        return result;

    }

    async model_reducer(model: ML_API_model): Model {
        const model_detail_response = await this.get(`models/${model.uuid}`);
        const full_model = model_detail_response.data.model;
        return {
            id: full_model.uuid,
            name: full_model.name,
            created: full_model.created,
            path: full_model.path,
        };
    }

    model_upload_response(success: boolean, message: string, model: Model): ModelUploadResponse {
        return {
            success: success,
            message: message,
            model: model
        };
    }

    async store_model({stream, filename}: { stream: stream.Readable, filename: string }): Promise<string> {
        const shared_models_root = make_model_root(new Date(), this.shared_volume_path);
        await validate_or_create_path(shared_models_root);
        const path = make_model_file_path(shared_models_root, filename);
        return new Promise((resolve, reject) => {
            stream
                .on('error', async error => {
                    await fs.unlinkSync(path);
                    reject(error);
                })
                .pipe(fs.createWriteStream(path))
                .on('error', error => {
                    reject(error);
                })
                .on('finish', () => {
                    resolve(path);
                })
        });
    }

    async get_model(model_id: number) {
        const model_detail_response = await this.get(`models/${model_id}`);
        const full_model = model_detail_response.data.model;
        return {
            id: full_model.uuid,
            name: full_model.name,
            created: to_readable_date(full_model.created),
            path: full_model.path,
        };
    }
}

module.exports = {
    ModelDataSource,
    make_model_root,
    make_model_file_path
};
