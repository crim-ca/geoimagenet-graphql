// @flow
const {GIN_GraphQL} = require('./GIN_GraphQL');
const Sentry = require('@sentry/node');
Sentry.init({dsn: 'https://58d731f21594457087bbd41837a399f1@sentry.crim.ca/27'});
const gin_graph = new GIN_GraphQL();
gin_graph.initialize();
