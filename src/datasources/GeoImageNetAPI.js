// @flow

type Output = {
    id: number,
    href: string,
};
type Input = {
    id: number,
    value: string,
    href: string,
};

/**
 * An input for a job as described from the processes API
 */
function job_input_reducer(input: Input) {
    return {
        id: input.id,
        value: input.value,
        href: input.href,
    };
}

/**
 * The output of a job, as described from the processes API
 */
function job_output_reducer(output: Output) {
    return {
        id: output.id,
        href: output.href,
    };
}

module.exports = {
    job_input_reducer,
    job_output_reducer
};
