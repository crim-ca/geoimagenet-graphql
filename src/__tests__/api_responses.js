export const BATCH_CREATION_JOBS_RESPONSE = {"meta": {"code": 200, "type": "application/json", "detail": "Get process jobs successful.", "route": "/processes/batch-creation/jobs", "uri": "http://10.30.90.114/processes/batch-creation/jobs", "method": "GET", "process_uuid": "batch-creation"}, "data": {"jobs": [{"uuid": "job_1", "process": "56d94f27-de54-43b4-a76c-1fb1b0e14549"},{"uuid": "job_2", "process": "56d94f27-de54-43b4-a76c-1fb1b0e14549"},{"uuid": "job_3", "process": "56d94f27-de54-43b4-a76c-1fb1b0e14549"},]}};

export const SPECIFIC_BATCH_CREATION_JOB_RESPONSE_1 = {"meta": {"code": 200, "type": "application/json", "detail": "Get process successful.", "route": "/processes/batch-creation/jobs/job_1", "uri": "http://10.30.90.114/processes/batch-creation/jobs/job_1", "method": "GET", "process_uuid": "batch-creation", "job_uuid": "job_1"}, "data": {"job": {"uuid": "job_1", "created": "2019-08-02T14:56:49.139000+00:00", "user": 1, "finished": "2019-08-02T14:56:54.846000+00:00", "visibility": "private", "task": "6d3a18e3-c90c-4f65-8cc1-758a4882a7f5", "service": null, "process": "56d94f27-de54-43b4-a76c-1fb1b0e14549", "inputs": [{"id": "name", "value": 1564757808788}, {"id": "geojson_urls", "value": "https://10.30.90.114/api/v1/batches/annotations"}], "status": "failed", "status_message": "Job <job_1> done.", "status_location": "https://10.30.90.114/ml/processes/batch-creation/jobs/job_1", "execute_async": true, "is_workflow": false, "started": "2019-08-02T14:56:54.675000+00:00", "duration": "0:00:00", "progress": 3, "tags": ["ml"]}}};
export const SPECIFIC_BATCH_CREATION_JOB_RESPONSE_2 = {"meta": {"code": 200, "type": "application/json", "detail": "Get process successful.", "route": "/processes/batch-creation/jobs/job_2", "uri": "http://10.30.90.114/processes/batch-creation/jobs/job_2", "method": "GET", "process_uuid": "batch-creation", "job_uuid": "job_2"}, "data": {"job": {"uuid": "job_2", "created": "2019-06-05T20:16:32.459000+00:00", "user": 1, "finished": "2019-06-05T20:16:33.354000+00:00", "visibility": "private", "task": "1ac096b0-66cd-4ed9-8979-fd15e3cc97da", "service": null, "process": "56d94f27-de54-43b4-a76c-1fb1b0e14549", "inputs": [{"id": "name", "value": 1559765792437}, {"id": "geojson_urls", "value": "http://10.30.90.114/api/v1/batches/annotations"}], "status": "failed", "status_message": "Job <job_2> done.", "status_location": "https://10.30.90.114/ml/processes/batch-creation/jobs/job_2", "execute_async": true, "is_workflow": false, "started": "2019-06-05T20:16:32.997000+00:00", "duration": "0:00:00", "progress": 7, "tags": ["ml"]}}};
export const SPECIFIC_BATCH_CREATION_JOB_RESPONSE_3 = {"meta": {"code": 200, "type": "application/json", "detail": "Get process successful.", "route": "/processes/batch-creation/jobs/job_3", "uri": "http://10.30.90.114/processes/batch-creation/jobs/job_3", "method": "GET", "process_uuid": "batch-creation", "job_uuid": "job_3"}, "data": {"job": {"uuid": "job_3", "created": "2019-06-05T20:16:32.459000+00:00", "user": 1, "finished": "2019-06-05T20:16:33.354000+00:00", "visibility": "private", "task": "1ac096b0-66cd-4ed9-8979-fd15e3cc97da", "service": null, "process": "56d94f27-de54-43b4-a76c-1fb1b0e14549", "inputs": [{"id": "name", "value": 1559765792437}, {"id": "geojson_urls", "value": "http://10.30.90.114/api/v1/batches/annotations"}], "status": "succeeded", "status_message": "Job <job_3> done.", "status_location": "https://10.30.90.114/ml/processes/batch-creation/jobs/job_3", "execute_async": true, "is_workflow": false, "started": "2019-06-05T20:16:32.997000+00:00", "duration": "0:00:00", "progress": 7, "tags": ["ml"]}}};

export const SPECIFIC_BATCH_CREATION_JOB_FAILURE_LOGS_1 = {"meta": {"code": 200, "type": "application/json", "detail": "Get process job result successful.", "route": "/processes/batch-creation/jobs/job_1/logs", "uri": "http://10.30.90.114/processes/batch-creation/jobs/job_1/logs", "method": "GET", "process_uuid": "batch-creation", "job_uuid": "job_1"}, "data": {"logs": ["[2019-08-02 14:56:54] INFO     [geoimagenet_ml.store.datatypes.Job] 0:00:00   0% running    Job <job_1> initializing configuration settings.", "[2019-08-02 14:56:54] INFO     [geoimagenet_ml.store.datatypes.Job] 0:00:00   1% running    Job <job_1> initiation done.", "[2019-08-02 14:56:54] INFO     [geoimagenet_ml.store.datatypes.Job] 0:00:00   2% running    Job <job_1> creating dataset container for patches.", "[2019-08-02 14:56:54] INFO     [geoimagenet_ml.store.datatypes.Job] 0:00:00   3% running    Job <job_1> obtaining references from process job inputs.", "[2019-08-02 14:56:54] ERROR    [geoimagenet_ml.store.datatypes.Job] 0:00:00   3% failed     Job <job_1> failed execution [builtins.ValueError: Missing input 'taxonomy_url' not matched from literal process input nor defaults.]..", "[2019-08-02 14:56:54] INFO     [geoimagenet_ml.store.datatypes.Job] 0:00:00   3% failed     Job <job_1> done."]}};
export const SPECIFIC_BATCH_CREATION_JOB_FAILURE_LOGS_2 = {"meta": {"code": 200, "type": "application/json", "detail": "Get process job result successful.", "route": "/processes/batch-creation/jobs/job_2/logs", "uri": "http://10.30.90.114/processes/batch-creation/jobs/job_2/logs", "method": "GET", "process_uuid": "batch-creation", "job_uuid": "job_2"}, "data": {"logs": ["[2019-06-05 20:16:32] INFO     [geoimagenet_ml.store.datatypes.Job] 0:00:00   0% running    Job <job_2> initializing configuration settings.", "[2019-06-05 20:16:33] INFO     [geoimagenet_ml.store.datatypes.Job] 0:00:00   1% running    Job <job_2> initiation done.", "[2019-06-05 20:16:33] INFO     [geoimagenet_ml.store.datatypes.Job] 0:00:00   2% running    Job <job_2> creating dataset container for patches.", "[2019-06-05 20:16:33] INFO     [geoimagenet_ml.store.datatypes.Job] 0:00:00   3% running    Job <job_2> obtaining references from process job inputs.", "[2019-06-05 20:16:33] INFO     [geoimagenet_ml.store.datatypes.Job] 0:00:00   4% running    Job <job_2> fetching annotations using process job inputs.", "[2019-06-05 20:16:33] INFO     [geoimagenet_ml.store.datatypes.Job] 0:00:00   5% running    Job <job_2> looking for latest batch.", "[2019-06-05 20:16:33] WARNING  [geoimagenet_ml.store.datatypes.Job] 0:00:00   5% running    Job <job_2> Could not find latest dataset with [None]. Building from scratch....", "[2019-06-05 20:16:33] INFO     [geoimagenet_ml.store.datatypes.Job] 0:00:00   6% running    Job <job_2> starting batch patches creation.", "[2019-06-05 20:16:33] INFO     [geoimagenet_ml.store.datatypes.Job] 0:00:00   7% running    Job <job_2> parsing raster files.", "[2019-06-05 20:16:33] ERROR    [geoimagenet_ml.store.datatypes.Job] 0:00:00   7% failed     Job <job_2> failed execution [builtins.AssertionError: invalid rasterfile paths specified: []]..", "[2019-06-05 20:16:33] INFO     [geoimagenet_ml.store.datatypes.Job] 0:00:00   7% failed     Job <job_2> done."]}};

export const MODEL_UPLOAD_POST_RESPONSE = {
    "meta": {
        "code": 201,
        "type": "application/json",
        "detail": "Create model successful.",
        "route": "/models",
        "uri": "http://ml:3000/models",
        "method": "POST"
    },
    "data": {
        "model": {
            "uuid": "model_response_id",
            "created": "2019-08-06T20:57:07.806000+00:00",
            "name": "test_model-best-url",
            "user": 12,
            "visibility": "private",
            "path": "https://ogc-ems.crim.ca/wpsoutputs/ckpt.best.pth"
        }
    }
};

export const SPECIFIC_MODEL_RESPONSE = {"meta": {"code": 200, "type": "application/json", "detail": "Get model successful.", "route": "/models/model_response_id", "uri": "http://10.30.90.114/models/model_response_id", "method": "GET", "model_uuid": "model_response_id"}, "data": {"model": {"uuid": "model_response_id", "created": "2019-06-03T17:58:58.369000+00:00", "name": "my_model", "user": 1, "visibility": "private", "path": "/data/geoimagenet/models/2019/6/ckpt.0000.PTW-SCPL1-20190425-162746.pth"}, "owner": 1, "downloads": 0}};
