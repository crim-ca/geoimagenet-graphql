const {gql} = require('apollo-server');

const typeDefs = gql`

    type Query {
        datasets(status: Status): [Dataset]!
        models: [Model]!
        benchmarks: [Benchmark]!
        jobs(process_id: ID!): [Job]!
        job(process_id: ID!, job_id: ID!): Job
    }
    
    type Subscription {
        jobs: [Job]!
    }
    
    type Mutation {
        upload_model(
            model_name: String!,
            model: String!
        ): ModelUploadResponse!
        start_batch: BatchCreationResponse!
    }
    
    type BatchCreationResponse {
        success: Boolean!
        job: Job
    }
    
    type ApiResponse {
        mlSent: MLSentContent
        mlResponse: MLReceivedContent
        detail: [MLError]
    }
    
    type MLError {
        location: [String]!
        message: String!
        type: String!
    }
    
    type MLReceivedContent {
        bob: String
    }
    
    type MLSentContent {
        inputs: [Input]
        outputs: [Output]
    }
    
    type ModelUploadResponse {
        success: Int!
        message: String!
        model: Model
    }
    
    type Job {
        id: ID!
        process: String!
        task: String!
        service: String
        user: String
        inputs: [Input]!
        status: Status!
        status_message: String!
        status_location: String!
        execute_async: Boolean!
        is_workflow: Boolean!
        created: String!
        started: String!
        finished: String
        duration: String
        progress: Int!
        tags: [String]!
    }
    
    enum Status {
        accepted
        succeeded
        finished
        failed
        running
    }
    
    type Input {
        id: ID!
        value: String!
        href: String
    }
    type Output {
        id: ID!
        href: String
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
        status: Status!
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
