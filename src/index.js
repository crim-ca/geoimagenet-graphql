const {ApolloServer} = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const MLAPI = require('./datasources/machine_learning');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        MLAPI: new MLAPI(process.env.ML_ENDPOINT),
    }),
});

server.listen().then(({url}) => {
    console.log(`server ready at ${url}`);
});
