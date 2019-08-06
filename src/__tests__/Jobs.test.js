// @flow

import {
    BATCH_CREATION_JOBS_RESPONSE,
    SPECIFIC_BATCH_CREATION_JOB_FAILURE_LOGS_1,
    SPECIFIC_BATCH_CREATION_JOB_FAILURE_LOGS_2,
    SPECIFIC_BATCH_CREATION_JOB_FAILURE_LOGS_3,
    SPECIFIC_BATCH_CREATION_JOB_RESPONSE_1,
    SPECIFIC_BATCH_CREATION_JOB_RESPONSE_2,
    SPECIFIC_BATCH_CREATION_JOB_RESPONSE_3,
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
    }
    throw new Error('Unmanaged api response.');
});
const {query} = createTestClient(server);

test('Jobs have relevant error messages inaccordance to their status', async () => {
    const res = await query({query: GET_JOBS});
    expect(res).toMatchSnapshot();
});
