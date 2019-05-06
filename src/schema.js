const {gql} = require('apollo-server');

const typeDefs = gql`

    type Query {
        datasets: [Dataset]!
        models: [Model]!
        benchmarks: [Benchmark]!
    }

    type Model {
        id: ID!
        name: String!
        path: String
        created: String!
    }

    type Dataset {
        id: ID!
        created: String!
        finished: String!
        path: String!
        status: String!
        type: String!
        files: [String]!
        patches: [Patch]!
        classes_count: Int!
        annotations_count: Int!
        name: String!
    }

    type Patch {
        class: Int!,
        crops: [Crop]!
        feature: String!
        image: String!
        split: String!
    }

    type Crop {
        coordinates: [Float]!
        data_type: Int!
        path: String!,
        shape: [Int]!
        type: String!
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
