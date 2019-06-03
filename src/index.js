// @flow
const {GIN_GraphQL} = require('./GIN_GraphQL');
const Raven = require('raven');
Raven.config('https://58d731f21594457087bbd41837a399f1@sentry.crim.ca/27').install();
Raven.context(() => {
    const gin_graph = new GIN_GraphQL();
    gin_graph.initialize();
});
