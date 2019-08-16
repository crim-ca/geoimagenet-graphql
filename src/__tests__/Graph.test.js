// @flow

const {GIN_GraphQL} = require('../GIN_GraphQL');

const should_throw_because_no_env = () => {
    new GIN_GraphQL();
};

describe('environmental variables react sanely', () => {

    beforeEach(() => {
        delete process.env.RAW_MODEL_STORAGE_PATH;
        delete process.env.ML_ENDPOINT;
        delete process.env.MAGPIE_ENDPOINT;
        delete process.env.GEOIMAGENET_API_URL;
    });

    test('declared string environment variables do not throw exceptions', () => {
        process.env.RAW_MODEL_STORAGE_PATH = 'string';
        process.env.ML_ENDPOINT = 'string';
        process.env.MAGPIE_ENDPOINT = 'string';
        process.env.GEOIMAGENET_API_URL = 'string';
        expect(typeof process.env.RAW_MODEL_STORAGE_PATH).toBe('string');
        expect(should_throw_because_no_env).not.toThrow(TypeError);
    });

    test('undeclared environment variables throw exceptions', () => {
        expect(process.env.RAW_MODEL_STORAGE_PATH).toBe(undefined);
        expect(should_throw_because_no_env).toThrow(TypeError);
    });
});
