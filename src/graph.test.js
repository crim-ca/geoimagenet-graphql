// @flow

const {GIN_GraphQL} = require('./GIN_GraphQL');
const fetchMock = require('fetch-mock');
const {MODEL_TESTER_RESULT} = require('./test_data');
const {ApolloServer, gql} = require('apollo-server');
const {create_GIN_GraphQL_server, create_datasources} = require('./GIN_GraphQL');
const {createTestClient} = require('apollo-server-testing');
const {resolvers} = require('./resolvers');
const {typeDefs} = require('./schema');
const {Jobs} = require('./datasources/Jobs');

const should_throw_because_no_env = () => {
    new GIN_GraphQL();
};

describe('environmental variables react sanely', () => {

    beforeEach(() => {
        delete process.env.RAW_MODEL_STORAGE_PATH;
        delete process.env.ML_ENDPOINT;
        delete process.env.GEOIMAGENET_API_URL;
    });

    test('declared string environment variables do not throw exceptions', () => {
        process.env.RAW_MODEL_STORAGE_PATH = 'string';
        process.env.ML_ENDPOINT = 'string';
        process.env.GEOIMAGENET_API_URL = 'string';
        expect(typeof process.env.RAW_MODEL_STORAGE_PATH).toBe('string');
        expect(should_throw_because_no_env).not.toThrow(TypeError);
    });

    test('undeclared environment variables throw exceptions', () => {
        expect(process.env.RAW_MODEL_STORAGE_PATH).toBe(undefined);
        expect(should_throw_because_no_env).toThrow(TypeError);
    });
});

test('server lifetime', () => {
    process.env.RAW_MODEL_STORAGE_PATH = 'string';
    process.env.ML_ENDPOINT = 'string';
    process.env.GEOIMAGENET_API_URL = 'string';
    const graph = new GIN_GraphQL();
    graph.initialize();
    graph.stop();
});

test('we can transform ml api response in usable data', async () => {

    const benchmarks_query = gql`
        query benchmarks {
            public_benchmarks {
                owner
                result {
                    metrics {
                        top_1_accuracy
                        top_5_accuracy
                    }
                }
            }
        }
    `;

    const job_api = new Jobs('http://ml', 'http://gin-api');
    job_api.get = jest.fn(() => MODEL_TESTER_RESULT);

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        datasources: {
            ...create_datasources(
                'http://ml',
                'http://gin-api',
                '/data'),
            jobs: job_api
        },
    });

    const {query} = createTestClient(server);

    const public_benchmarks = await query({ query: benchmarks_query });
    expect(public_benchmarks).toBe([{
        summary: {},
        metrics: {},
        samples: {},
        classes: {},
        mapping: {},
        predictions: {},
    }]);
});