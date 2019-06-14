const {gql} = require('apollo-server');

const typeDefs = gql`

    type Query {
        datasets(status: Status): [Dataset]!
        models: [Model!]!
        benchmarks: [Benchmark!]!
        processes: [Process!]!
        process(process_id: ID!): Process
        public_benchmarks: [Job!]!
        jobs(process_id: ID!): [Job!]!
        job(process_id: ID!, job_id: ID!): Job
    }

    type Subscription {
        jobs(process_id: ID!): [Job!]!
    }

    type Mutation {
        upload_model(
            model_name: String!,
            file: Upload!
        ): ModelUploadResponse!
        launch_test(model_id: ID!): JobMutationResponse!
        launch_dataset_creation_job: JobMutationResponse!
        benchmark_visibility(
            job_id: ID!,
            visibility: Visibility!
        ): JobMutationResponse!
    }

    type JobMutationResponse {
        success: Boolean!
        job: Job
        message: String
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
        inputs: [JobInput]
        outputs: [JobOutput]
    }

    type ModelUploadResponse {
        success: Boolean!
        message: String!
        model: Model
    }

    type Process {
        id: ID!
        identifier: String!
        title: String!
        abstract: String
        keywords: [String]!
        metadata: [ProcessMetaData]!
        version: String!
        execute_endpoint: String!
        user: String!
        inputs: [ProcessInputOrOutput!]!
        outputs: [ProcessInputOrOutput!]!
        limit_single_job: Boolean!
    }

    type ProcessInputOrOutput {
        id: String!
        abstract: String
        type: [String!]!
        formats: [ProcessInputOrOutputFormat]!
        minOccurs: Int!
        maxOccurs: Int!
    }

    type ProcessInputOrOutputFormat {
        mimeType: String!
        schema: String!
        encoding: String!
    }

    type ProcessMetaData {
        href: String!
        rel: String!
        type: String!
        hreflang: String!
        title: String!
        role: String!
        value: String!
    }

    type Job {
        id: ID!
        process: String!
        task: String!
        service: String
        user: String
        inputs: [JobInput!]!
        status: Status!
        status_message: String!
        status_location: String!
        execute_async: Boolean!
        is_workflow: Boolean!
        created: String!
        started: String!
        finished: String
        duration: String
        visibility: Visibility!
        progress: Int!
        tags: [String]!
    }

    enum Visibility {
        private
        public
    }

    enum Status {
        accepted
        succeeded
        finished
        failed
        running
    }

    type JobInput {
        id: ID!
        value: String!
        href: String
    }
    type JobOutput {
        id: ID!
        href: String
    }

    type Model {
        id: ID!
        name: String!
        path: String
        created: String!
        owner: String
        downloads: Int!
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

module.exports = {typeDefs};
