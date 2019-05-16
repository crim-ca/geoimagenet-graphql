const {RESTDataSource} = require('apollo-datasource-rest');

class AuthDataSource extends RESTDataSource {
    willSendRequest(request) {
        request.headers.set('cookie', this.context.cookie);
    }
}

module.exports = {
    AuthDataSource
};
