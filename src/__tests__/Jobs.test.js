// @flow

import {
    BATCH_CREATION_JOBS_RESPONSE, MODEL_TESTER_JOBS_RESPONSE, MODEL_TESTER_RESULT,
    SPECIFIC_BATCH_CREATION_JOB_FAILURE_LOGS_1,
    SPECIFIC_BATCH_CREATION_JOB_FAILURE_LOGS_2,
    SPECIFIC_BATCH_CREATION_JOB_RESPONSE_1,
    SPECIFIC_BATCH_CREATION_JOB_RESPONSE_2,
    SPECIFIC_BATCH_CREATION_JOB_RESPONSE_3, SPECIFIC_MODEL_TESTER_JOB_RESPONSE_1,
} from "./api_responses";

const {createTestClient} = require('apollo-server-testing');
const {ApolloServer} = require('apollo-server');
const {Jobs} = require('../datasources/Jobs');
const {typeDefs} = require('../schema');
const resolvers = require('../resolvers');
const gql = require('graphql-tag');

const GET_JOBS = gql`
    query jobs {
        jobs(process_id: "batch-creation") {
            id
            status
            status_message
            progress
        }
    }
`;
const GET_PUBLIC_BENCHMARKS = gql`
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

const jobs = new Jobs('', '');
const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({jobs}),
    context: () => ({user_id: 1}),
});
jobs.get = jest.fn((url) => {
    switch (url) {
        case 'processes/batch-creation/jobs':
            return BATCH_CREATION_JOBS_RESPONSE;
        case 'processes/batch-creation/jobs/job_1':
            return SPECIFIC_BATCH_CREATION_JOB_RESPONSE_1;
        case 'processes/batch-creation/jobs/job_2':
            return SPECIFIC_BATCH_CREATION_JOB_RESPONSE_2;
        case 'processes/batch-creation/jobs/job_3':
            return SPECIFIC_BATCH_CREATION_JOB_RESPONSE_3;
        case 'processes/batch-creation/jobs/job_1/logs':
            return SPECIFIC_BATCH_CREATION_JOB_FAILURE_LOGS_1;
        case 'processes/batch-creation/jobs/job_2/logs':
            return SPECIFIC_BATCH_CREATION_JOB_FAILURE_LOGS_2;
        case 'processes/batch-creation/jobs/job_3/logs':
            throw new Error('This job is supposed to be successful, this should not be called.');
        case 'processes/model-tester/jobs':
            return MODEL_TESTER_JOBS_RESPONSE;
        case 'processes/model-tester/jobs/model-tester-job-id':
            return SPECIFIC_MODEL_TESTER_JOB_RESPONSE_1;
        case 'processes/model-tester/jobs/model-tester-job-id/result':
            return MODEL_TESTER_RESULT;
    }
    throw new Error('Unmanaged api response.');
});
const {query} = createTestClient(server);

test('Jobs have relevant error messages in accordance to their status', async () => {
    const res = await query({query: GET_JOBS});
    expect(res).toMatchSnapshot();
});

test('We create metrics from api response', async () => {
    const res = await query({query: GET_PUBLIC_BENCHMARKS});
    expect(res).toMatchSnapshot();
});
