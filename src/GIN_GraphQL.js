// @flow
const {ApolloServer} = require('apollo-server');
const {typeDefs} = require('./schema');
const resolvers = require('./resolvers');

const {MLAPI} = require('./datasources/machine_learning');
const {GINAPI} = require('./datasources/geoimagenet_api');
const {ModelDataSource} = require('./datasources/ModelDataSource');

export class GIN_GraphQL {

    constructor() {
        this.model_storage_path = process.env.RAW_MODEL_STORAGE_PATH || throw new TypeError(`The "RAW_MODEL_STORAGE_PATH" variable should be set in the environment.`);
        this.ml_endpoint = process.env.ML_ENDPOINT || throw new TypeError(`The "ML_ENDPOINT" variable should be set in the environment.`);
        this.geoimagenet_api_endpoint = process.env.GEOIMAGENET_API_URL || throw new TypeError(`The "GEOIMAGENET_API_URL" variable should be set in the environment.`);
    }

    initialize() {

        this.server = new ApolloServer({
            typeDefs,
            resolvers,
            context: async ({req}) => {
                return {
                    cookie: req.headers.cookie
                }
            },
            dataSources: () => ({
                MLAPI: new MLAPI(this.ml_endpoint, this.geoimagenet_api_endpoint),
                GINAPI: new GINAPI(this.geoimagenet_api_endpoint),
                model_data_source: new ModelDataSource(this.ml_endpoint, this.model_storage_path)
            }),
        });

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