const {ApolloServer} = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const MLAPI = require('./datasources/machine_learning');
const {GINAPI} = require('./datasources/geoimagenet_api');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        return {
            cookie: req.headers.cookie
        }
    },
    dataSources: () => ({
        MLAPI: new MLAPI(process.env.ML_ENDPOINT, process.env.GEOIMAGENET_API_URL, process.env.MODEL_STORAGE_PATH),
        GINAPI: new GINAPI(process.env.GEOIMAGENET_API_URL),
    }),
});

server.listen().then(({url}) => {
    console.log(`server ready at ${url}`);
});
