const {gql} = require('apollo-server');

const typeDefs = gql`

    type Query {
        datasets: [Dataset]!
        models: [Model]!
        benchmarks: [Benchmark]!
    }
    
    type Model {
        id: ID!
        uploaded: String!
        status: String!
        results: [Benchmark]!
        published: Boolean!
    }
    
    type Dataset {
        id: ID!
        created: String!
        classes: Int!
        annotations: Int!
        name: String!
    }
    
    type Benchmark {
        model_id: ID!
        owner: String!
        uploaded: String!
        tested: String!
        dataset_id: ID!
        result: String!
    }

`;

module.exports = typeDefs;
