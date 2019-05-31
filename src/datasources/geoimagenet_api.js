const {AuthDataSource} = require('./AuthDataSource');

function job_input_reducer(input) {
    return {
        id: input.id,
        value: input.value,
        href: input.href,
    };
}

function job_output_reducer(output) {
    console.log(output);
    return {
        id: output.id,
        href: output.href,
    };
}

class GINAPI extends AuthDataSource {
    constructor(baseURL: string) {
        super();
        this.baseURL = baseURL;
    }
}

module.exports = {
    GINAPI,
    job_input_reducer,
    job_output_reducer
};
