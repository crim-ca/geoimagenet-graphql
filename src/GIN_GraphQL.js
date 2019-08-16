// @flow
const {ApolloServer} = require('apollo-server');
const {typeDefs} = require('./schema');
const resolvers = require('./resolvers');
const fetch = require('node-fetch');

const {MLAPI} = require('./datasources/machine_learning');
const {ModelDataSource} = require('./datasources/ModelDataSource');
const {Jobs} = require('./datasources/Jobs');

function create_deployment_context(magpie_endpoint) {
    return async ({req}) => {
        const response = await fetch(`${magpie_endpoint}/session`, {
            headers: {
                cookie: req.headers.cookie
            }
        });
        const json = await response.json();
        const {authenticated, user} = json;
        if (authenticated) {
            const {user_id} = user;
            return {
                cookie: req.headers.cookie,
                user_id: user_id
            }
        }
        return {
            cookie: req.headers.cookie,
        }
    };
}

function create_datasources(ml_endpoint: string,
                            geoimagenet_api_endpoint: string,
                            model_storage_path: string) {
    return () => ({
        MLAPI: new MLAPI(ml_endpoint),
        model_data_source: new ModelDataSource(ml_endpoint, model_storage_path),
        jobs: new Jobs(ml_endpoint, geoimagenet_api_endpoint),
    })
}

function create_GIN_GraphQL_server(magpie_endpoint: string,
                                   ml_endpoint: string,
                                   geoimagenet_api_endpoint: string,
                                   model_storage_path: string,
                                   context) {
    return new ApolloServer({
        typeDefs,
        resolvers,
        context: context,
        dataSources: create_datasources(ml_endpoint, geoimagenet_api_endpoint, model_storage_path),
    });
}

class GIN_GraphQL {

    constructor() {
        this.model_storage_path = process.env.RAW_MODEL_STORAGE_PATH || throw new TypeError(`The "RAW_MODEL_STORAGE_PATH" variable should be set in the environment.`);
        this.ml_endpoint = process.env.ML_ENDPOINT || throw new TypeError(`The "ML_ENDPOINT" variable should be set in the environment.`);
        this.geoimagenet_api_endpoint = process.env.GEOIMAGENET_API_URL || throw new TypeError(`The "GEOIMAGENET_API_URL" variable should be set in the environment.`);
        this.magpie_endpoint = process.env.MAGPIE_ENDPOINT || throw new TypeError(`The "MAGPIE_ENDPOINT" variable should be set in the environment.`);
    }

    initialize() {

        this.server = create_GIN_GraphQL_server(
            this.magpie_endpoint,
            this.ml_endpoint,
            this.geoimagenet_api_endpoint,
            this.model_storage_path,
            create_deployment_context(this.magpie_endpoint)
        );

        this.server.listen().then(({url}) => {
            console.log(`server ready at ${url}`);
        });
    }

    stop() {
        this.server.stop().then(arg => {
            console.log(`server stopped`);
        });
    }
}

module.exports = {
    create_GIN_GraphQL_server,
    GIN_GraphQL,
    create_datasources
};


