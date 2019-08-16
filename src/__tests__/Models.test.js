// @flow

import {MODEL_UPLOAD_POST_RESPONSE, SPECIFIC_MODEL_RESPONSE} from "./api_responses";

const {Readable} = require('stream');

const {readFile, access, constants: {R_OK}} = require('fs');
const {createTestClient} = require('apollo-server-testing');
const {ApolloServer} = require('apollo-server');
const {make_model_root, make_model_file_path} = require('../datasources/ModelDataSource');
const {ModelDataSource} = require('../datasources/ModelDataSource');
const {typeDefs} = require('../schema');
const resolvers = require('../resolvers');
const gql = require('graphql-tag');

const UPLOAD_MODEL = gql`
    mutation upload_model($file: Upload!, $model_name: String!) {
        upload_model(model_name: $model_name, file: $file) {
            success
            message
            model {
                name
                id
            }
        }
    }
`;

const models = new ModelDataSource('', './models_data');
const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({model_data_source: models}),
    context: () => ({user_id: 1}),
});
models.post = jest.fn(() => {
    return MODEL_UPLOAD_POST_RESPONSE;
});
models.get = jest.fn(url => {
    if (url === 'models/model_response_id') {
        return SPECIFIC_MODEL_RESPONSE;
    }
    throw new TypeError(`Unsupport request "${url}"`);
});

const {query} = createTestClient(server);

function read_file_promise(filepath: string) {
    return new Promise((resolve, reject) => {
        readFile(filepath, 'UTF8', (err, content) => {
            if (err) {
                reject(err);
            }
            resolve(content);
        });
    });
}

function file_exists_promise(filepath: string) {
    return new Promise((resolve, reject) => {
        access(filepath, R_OK, (err) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    resolve(false);
                }
                reject(err);
            }
            resolve(true);
        });
    });
}

describe('The endpoint accepts a model file and saves it to the machine learning api.', () => {

    test('The upload is valid step by step.', async () => {
        let value;
        let done;

        const stream = new Readable();
        stream.push('file-content');
        stream.push(null);
        const file = {
            stream: stream,
            filename: 'filename',
            mimetype: 'whatever',
            encoding: 'whatever'
        };
        const generator = models.upload_generator('my_model', file);

        // make sure that we read the file
        const file_read_step = generator.next();
        ({value, done} = file_read_step);
        expect(done).toBe(false);
        const file_read_promise_result = await value;
        expect(typeof file_read_promise_result).toEqual('object');

        // validate that we saved the file to disk
        const save_file_to_disk_step = generator.next(file_read_promise_result);
        ({value, done} = save_file_to_disk_step);
        expect(done).toBe(false);
        const save_stream_to_disk_result = await value;
        expect(typeof save_stream_to_disk_result).toEqual('string');
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const filepath = `./models_data/${year}/${month}/filename`;
        expect(save_stream_to_disk_result).toEqual(filepath);
        const file_content = await read_file_promise(filepath);
        expect(file_content).toEqual('file-content');

        // evaluate what happens on success model creation
        const ml_api_post_request_step = generator.next(save_stream_to_disk_result);
        ({value, done} = ml_api_post_request_step);
        expect(done).toBe(false);
        const ml_api_response: ML_API_post_model_response_201 = await value;
        expect(ml_api_response.data.model.uuid).toEqual('model_response_id');

        // make sure the file is deleted
        const unlink_file_step = generator.next(ml_api_response);
        ({value, done} = unlink_file_step);
        expect(done).toBe(false);
        await value;
        expect(await file_exists_promise(filepath)).toBe(false);

        // get reduced model
        const reduced_model_step = generator.next();
        ({value, done} = reduced_model_step);
        expect(done).toBe(false);
        const model = await value;
        expect(model).toEqual({
            "created": "2019-06-03T17:58:58.369000+00:00",
            "id": "model_response_id",
            "name": "my_model",
            "path": "/data/geoimagenet/models/2019/6/ckpt.0000.PTW-SCPL1-20190425-162746.pth",
        });

        // get graphql response
        const graphql_response_step = generator.next(model);
        ({value, done} = graphql_response_step);
        expect(done).toBe(true);
        const graphql_response = await value;
        expect(graphql_response).toEqual({
            "message": "model upload was successful",
            "model": {
                "created": "2019-06-03T17:58:58.369000+00:00",
                "id": "model_response_id",
                "name": "my_model",
                "path": "/data/geoimagenet/models/2019/6/ckpt.0000.PTW-SCPL1-20190425-162746.pth",
            },
            "success": true,
        });

    });

    test('The upload file resolver works from an external graphql request.', async () => {
        const stream = new Readable();
        stream.push('file-content');
        stream.push(null);
        const file = {
            stream: stream,
            filename: 'filename',
            mimetype: 'whatever',
            encoding: 'whatever'
        };

        const result = await query({
            query: UPLOAD_MODEL,
            variables: {
                file: file,
                model_name: 'my_model'
            },
        });
        expect(result).toMatchSnapshot();
    });

});

test('correctly makes model root', () => {
    const root = make_model_root(new Date('2019-12-23'), '/root');
    expect(root).toBe('/root/2019/12');
    const filepath = make_model_file_path(root, "annotations d'écran railroads ééé.png");
    expect(filepath).toBe("/root/2019/12/annotations d'écran railroads ééé.png");
});
