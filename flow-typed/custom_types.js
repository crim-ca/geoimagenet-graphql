declare type ML_API_get_model_response = {
    meta: {
        code: number,
        type: "application/json",
        detail: string,
        route: string,
        uri: string,
        method: string
    },
    data: {
        model: ML_API_model
    }
};

declare type ML_API_model = {
    uuid: string,
    name: string,
    path: string,
    created: string
};

declare type ML_API_post_model_response_201 = {
    meta: {
        code: number,
        type: "application/json",
        detail: string,
        route: string,
        uri: string,
        method: string
    },
    data: {
        model: ML_API_model,
        owner: number,
        downloads: number,
    }
}
