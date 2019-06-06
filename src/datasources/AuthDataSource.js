// @flow
const {RESTDataSource, RequestOptions} = require('apollo-datasource-rest');

class AuthDataSource extends RESTDataSource {

    constructor(base_url: string) {
        super();
        this.baseURL = base_url;
    }

    willSendRequest(request: RequestOptions) {
        request.headers.set('Cookie', this.context.cookie);
    }
}

module.exports = {
    AuthDataSource
};
