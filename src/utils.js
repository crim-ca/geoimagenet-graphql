const {PubSub} = require('apollo-server');

const pubsub = new PubSub();

function to_readable_date(string) {
    const date = new Date(string);
    return `${date.toLocaleDateString('default')} ${date.toLocaleTimeString('default')}`;
}

module.exports = {
    pubsub,
    to_readable_date,
};
