export const BATCH_CREATION_JOBS_RESPONSE = {"meta": {"code": 200, "type": "application/json", "detail": "Get process jobs successful.", "route": "/processes/batch-creation/jobs", "uri": "http://10.30.90.114/processes/batch-creation/jobs", "method": "GET", "process_uuid": "batch-creation"}, "data": {"jobs": [{"uuid": "job_1", "process": "56d94f27-de54-43b4-a76c-1fb1b0e14549"},{"uuid": "job_2", "process": "56d94f27-de54-43b4-a76c-1fb1b0e14549"},{"uuid": "job_3", "process": "56d94f27-de54-43b4-a76c-1fb1b0e14549"},]}};
export const MODEL_TESTER_JOBS_RESPONSE = {"meta": {"code": 200, "type": "application/json", "detail": "Get process jobs successful.", "route": "/processes/model-tester/jobs", "uri": "http://ml:3000/processes/model-tester/jobs", "method": "GET", "process_uuid": "model-tester"}, "data": {"jobs": [{"uuid": "model-tester-job-id", "process": "41117450-70f7-473d-90a9-77be5b177566"}]}};

export const SPECIFIC_BATCH_CREATION_JOB_RESPONSE_1 = {"meta": {"code": 200, "type": "application/json", "detail": "Get process successful.", "route": "/processes/batch-creation/jobs/job_1", "uri": "http://10.30.90.114/processes/batch-creation/jobs/job_1", "method": "GET", "process_uuid": "batch-creation", "job_uuid": "job_1"}, "data": {"job": {"uuid": "job_1", "created": "2019-08-02T14:56:49.139000+00:00", "user": 1, "finished": "2019-08-02T14:56:54.846000+00:00", "visibility": "private", "task": "6d3a18e3-c90c-4f65-8cc1-758a4882a7f5", "service": null, "process": "56d94f27-de54-43b4-a76c-1fb1b0e14549", "inputs": [{"id": "name", "value": 1564757808788}, {"id": "geojson_urls", "value": "https://10.30.90.114/api/v1/batches/annotations"}], "status": "failed", "status_message": "Job <job_1> done.", "status_location": "https://10.30.90.114/ml/processes/batch-creation/jobs/job_1", "execute_async": true, "is_workflow": false, "started": "2019-08-02T14:56:54.675000+00:00", "duration": "0:00:00", "progress": 3, "tags": ["ml"]}}};
export const SPECIFIC_BATCH_CREATION_JOB_RESPONSE_2 = {"meta": {"code": 200, "type": "application/json", "detail": "Get process successful.", "route": "/processes/batch-creation/jobs/job_2", "uri": "http://10.30.90.114/processes/batch-creation/jobs/job_2", "method": "GET", "process_uuid": "batch-creation", "job_uuid": "job_2"}, "data": {"job": {"uuid": "job_2", "created": "2019-06-05T20:16:32.459000+00:00", "user": 1, "finished": "2019-06-05T20:16:33.354000+00:00", "visibility": "private", "task": "1ac096b0-66cd-4ed9-8979-fd15e3cc97da", "service": null, "process": "56d94f27-de54-43b4-a76c-1fb1b0e14549", "inputs": [{"id": "name", "value": 1559765792437}, {"id": "geojson_urls", "value": "http://10.30.90.114/api/v1/batches/annotations"}], "status": "failed", "status_message": "Job <job_2> done.", "status_location": "https://10.30.90.114/ml/processes/batch-creation/jobs/job_2", "execute_async": true, "is_workflow": false, "started": "2019-06-05T20:16:32.997000+00:00", "duration": "0:00:00", "progress": 7, "tags": ["ml"]}}};
export const SPECIFIC_BATCH_CREATION_JOB_RESPONSE_3 = {"meta": {"code": 200, "type": "application/json", "detail": "Get process successful.", "route": "/processes/batch-creation/jobs/job_3", "uri": "http://10.30.90.114/processes/batch-creation/jobs/job_3", "method": "GET", "process_uuid": "batch-creation", "job_uuid": "job_3"}, "data": {"job": {"uuid": "job_3", "created": "2019-06-05T20:16:32.459000+00:00", "user": 1, "finished": "2019-06-05T20:16:33.354000+00:00", "visibility": "private", "task": "1ac096b0-66cd-4ed9-8979-fd15e3cc97da", "service": null, "process": "56d94f27-de54-43b4-a76c-1fb1b0e14549", "inputs": [{"id": "name", "value": 1559765792437}, {"id": "geojson_urls", "value": "http://10.30.90.114/api/v1/batches/annotations"}], "status": "succeeded", "status_message": "Job <job_3> done.", "status_location": "https://10.30.90.114/ml/processes/batch-creation/jobs/job_3", "execute_async": true, "is_workflow": false, "started": "2019-06-05T20:16:32.997000+00:00", "duration": "0:00:00", "progress": 7, "tags": ["ml"]}}};

export const SPECIFIC_MODEL_TESTER_JOB_RESPONSE_1 = {"meta": {"code": 200, "type": "application/json", "detail": "Get process successful.", "route": "/processes/model-tester/jobs/model-tester-job-id", "uri": "http://ml:3000/processes/model-tester/jobs/model-tester-job-id", "method": "GET", "process_uuid": "model-tester", "job_uuid": "model-tester-job-id"}, "data": {"job": {"uuid": "model-tester-job-id", "created": "2019-08-06T21:21:08.340000+00:00", "user": 1, "finished": "2019-08-06T21:21:10.049000+00:00", "visibility": "public", "task": "453146d9-87bf-408d-a23e-c02f238d1f6a", "service": null, "process": "41117450-70f7-473d-90a9-77be5b177566", "inputs": [{"id": "dataset", "value": "f6389c90-4eb8-4710-b1a1-ec6ffd01274f"}, {"id": "model", "value": "3af6b4f2-78d0-4d6b-be95-c63b4014e09b"}], "status": "succeeded", "status_message": "Job <model-tester-job-id> done.", "status_location": "https://geoimagenetdev.crim.ca/ml/processes/model-tester/jobs/model-tester-job-id", "execute_async": true, "is_workflow": false, "started": "2019-08-06T21:21:09.268000+00:00", "duration": "0:00:00", "progress": 4, "tags": ["ml"]}}};

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

test('smoke api responses', () => {
    expect(true).toBe(true);
});


export const MODEL_TESTER_RESULT = {
    "meta": {
        "code": 200,
        "type": "application/json",
        "detail": "Get process job result successful.",
        "route": "/processes/model-tester/jobs/model-tester-job-id/result",
        "uri": "http://localhost:3001/processes/model-tester/jobs/model-tester-job-id/result",
        "method": "GET",
        "process_uuid": "model-tester",
        "job_uuid": "model-tester-job-id"
    },
    "data": {
        "outputs": [
            {
                "id": "summary",
                "value": {
                    "classes_total": 277,
                    "classes_mapped": 10,
                    "classes_dropped": 267,
                    "samples_total": 6,
                    "samples_mapped": 4,
                    "samples_dropped": 2
                }
            },
            {
                "id": "metrics",
                "value": {
                    "top_1_accuracy": 0,
                    "top_5_accuracy": 100
                }
            },
            {
                "id": "samples",
                "value": [
                    {
                        "class_id": 150,
                        "sample_id": "annotation.291"
                    },
                    {
                        "class_id": 3,
                        "sample_id": "annotation.292"
                    },
                    {
                        "class_id": 33,
                        "sample_id": "annotation.293"
                    },
                    {
                        "class_id": 83,
                        "sample_id": "annotation.294"
                    },
                    {
                        "class_id": 96,
                        "sample_id": "annotation.295"
                    },
                    {
                        "class_id": 34,
                        "sample_id": "annotation.296"
                    }
                ]
            },
            {
                "id": "classes",
                "value": [
                    {
                        "model_index": 0,
                        "class_id": 3
                    },
                    {
                        "model_index": 1,
                        "class_id": 33
                    },
                    {
                        "model_index": 2,
                        "class_id": 34
                    },
                    {
                        "model_index": 3,
                        "class_id": 83
                    },
                    {
                        "model_index": 4,
                        "class_id": 10
                    },
                    {
                        "model_index": 5,
                        "class_id": 11
                    },
                    {
                        "model_index": 6,
                        "class_id": 12
                    },
                    {
                        "model_index": 7,
                        "class_id": 13
                    },
                    {
                        "model_index": 8,
                        "class_id": 14
                    },
                    {
                        "model_index": 9,
                        "class_id": 15
                    }
                ]
            },
            {
                "id": "mapping",
                "value": [
                    {
                        "class_id": 3,
                        "model_id": "3"
                    },
                    {
                        "class_id": 10,
                        "model_id": "10"
                    },
                    {
                        "class_id": 11,
                        "model_id": "11"
                    },
                    {
                        "class_id": 12,
                        "model_id": "12"
                    },
                    {
                        "class_id": 13,
                        "model_id": "13"
                    },
                    {
                        "class_id": 14,
                        "model_id": "14"
                    },
                    {
                        "class_id": 15,
                        "model_id": "15"
                    },
                    {
                        "class_id": 33,
                        "model_id": "33"
                    },
                    {
                        "class_id": 34,
                        "model_id": "34"
                    },
                    {
                        "class_id": 83,
                        "model_id": "83"
                    },
                    {
                        "class_id": 1,
                        "model_id": null
                    },
                    {
                        "class_id": 2,
                        "model_id": null
                    },
                    {
                        "class_id": 4,
                        "model_id": null
                    },
                    {
                        "class_id": 5,
                        "model_id": null
                    },
                    {
                        "class_id": 6,
                        "model_id": null
                    },
                    {
                        "class_id": 7,
                        "model_id": null
                    },
                    {
                        "class_id": 8,
                        "model_id": null
                    },
                    {
                        "class_id": 9,
                        "model_id": null
                    },
                    {
                        "class_id": 16,
                        "model_id": null
                    },
                    {
                        "class_id": 17,
                        "model_id": null
                    },
                    {
                        "class_id": 18,
                        "model_id": null
                    },
                    {
                        "class_id": 19,
                        "model_id": null
                    },
                    {
                        "class_id": 20,
                        "model_id": null
                    },
                    {
                        "class_id": 21,
                        "model_id": null
                    },
                    {
                        "class_id": 22,
                        "model_id": null
                    },
                    {
                        "class_id": 23,
                        "model_id": null
                    },
                    {
                        "class_id": 24,
                        "model_id": null
                    },
                    {
                        "class_id": 25,
                        "model_id": null
                    },
                    {
                        "class_id": 26,
                        "model_id": null
                    },
                    {
                        "class_id": 27,
                        "model_id": null
                    },
                    {
                        "class_id": 28,
                        "model_id": null
                    },
                    {
                        "class_id": 29,
                        "model_id": null
                    },
                    {
                        "class_id": 30,
                        "model_id": null
                    },
                    {
                        "class_id": 31,
                        "model_id": null
                    },
                    {
                        "class_id": 32,
                        "model_id": null
                    },
                    {
                        "class_id": 35,
                        "model_id": null
                    },
                    {
                        "class_id": 36,
                        "model_id": null
                    },
                    {
                        "class_id": 37,
                        "model_id": null
                    },
                    {
                        "class_id": 38,
                        "model_id": null
                    },
                    {
                        "class_id": 39,
                        "model_id": null
                    },
                    {
                        "class_id": 40,
                        "model_id": null
                    },
                    {
                        "class_id": 41,
                        "model_id": null
                    },
                    {
                        "class_id": 42,
                        "model_id": null
                    },
                    {
                        "class_id": 43,
                        "model_id": null
                    },
                    {
                        "class_id": 44,
                        "model_id": null
                    },
                    {
                        "class_id": 45,
                        "model_id": null
                    },
                    {
                        "class_id": 46,
                        "model_id": null
                    },
                    {
                        "class_id": 47,
                        "model_id": null
                    },
                    {
                        "class_id": 48,
                        "model_id": null
                    },
                    {
                        "class_id": 49,
                        "model_id": null
                    },
                    {
                        "class_id": 50,
                        "model_id": null
                    },
                    {
                        "class_id": 51,
                        "model_id": null
                    },
                    {
                        "class_id": 52,
                        "model_id": null
                    },
                    {
                        "class_id": 53,
                        "model_id": null
                    },
                    {
                        "class_id": 54,
                        "model_id": null
                    },
                    {
                        "class_id": 55,
                        "model_id": null
                    },
                    {
                        "class_id": 56,
                        "model_id": null
                    },
                    {
                        "class_id": 57,
                        "model_id": null
                    },
                    {
                        "class_id": 58,
                        "model_id": null
                    },
                    {
                        "class_id": 59,
                        "model_id": null
                    },
                    {
                        "class_id": 60,
                        "model_id": null
                    },
                    {
                        "class_id": 61,
                        "model_id": null
                    },
                    {
                        "class_id": 62,
                        "model_id": null
                    },
                    {
                        "class_id": 63,
                        "model_id": null
                    },
                    {
                        "class_id": 64,
                        "model_id": null
                    },
                    {
                        "class_id": 65,
                        "model_id": null
                    },
                    {
                        "class_id": 66,
                        "model_id": null
                    },
                    {
                        "class_id": 67,
                        "model_id": null
                    },
                    {
                        "class_id": 68,
                        "model_id": null
                    },
                    {
                        "class_id": 69,
                        "model_id": null
                    },
                    {
                        "class_id": 70,
                        "model_id": null
                    },
                    {
                        "class_id": 71,
                        "model_id": null
                    },
                    {
                        "class_id": 72,
                        "model_id": null
                    },
                    {
                        "class_id": 73,
                        "model_id": null
                    },
                    {
                        "class_id": 74,
                        "model_id": null
                    },
                    {
                        "class_id": 75,
                        "model_id": null
                    },
                    {
                        "class_id": 76,
                        "model_id": null
                    },
                    {
                        "class_id": 77,
                        "model_id": null
                    },
                    {
                        "class_id": 78,
                        "model_id": null
                    },
                    {
                        "class_id": 79,
                        "model_id": null
                    },
                    {
                        "class_id": 80,
                        "model_id": null
                    },
                    {
                        "class_id": 81,
                        "model_id": null
                    },
                    {
                        "class_id": 82,
                        "model_id": null
                    },
                    {
                        "class_id": 84,
                        "model_id": null
                    },
                    {
                        "class_id": 85,
                        "model_id": null
                    },
                    {
                        "class_id": 86,
                        "model_id": null
                    },
                    {
                        "class_id": 87,
                        "model_id": null
                    },
                    {
                        "class_id": 88,
                        "model_id": null
                    },
                    {
                        "class_id": 89,
                        "model_id": null
                    },
                    {
                        "class_id": 90,
                        "model_id": null
                    },
                    {
                        "class_id": 91,
                        "model_id": null
                    },
                    {
                        "class_id": 92,
                        "model_id": null
                    },
                    {
                        "class_id": 93,
                        "model_id": null
                    },
                    {
                        "class_id": 94,
                        "model_id": null
                    },
                    {
                        "class_id": 95,
                        "model_id": null
                    },
                    {
                        "class_id": 96,
                        "model_id": null
                    },
                    {
                        "class_id": 97,
                        "model_id": null
                    },
                    {
                        "class_id": 98,
                        "model_id": null
                    },
                    {
                        "class_id": 99,
                        "model_id": null
                    },
                    {
                        "class_id": 100,
                        "model_id": null
                    },
                    {
                        "class_id": 101,
                        "model_id": null
                    },
                    {
                        "class_id": 102,
                        "model_id": null
                    },
                    {
                        "class_id": 103,
                        "model_id": null
                    },
                    {
                        "class_id": 104,
                        "model_id": null
                    },
                    {
                        "class_id": 105,
                        "model_id": null
                    },
                    {
                        "class_id": 106,
                        "model_id": null
                    },
                    {
                        "class_id": 107,
                        "model_id": null
                    },
                    {
                        "class_id": 108,
                        "model_id": null
                    },
                    {
                        "class_id": 109,
                        "model_id": null
                    },
                    {
                        "class_id": 110,
                        "model_id": null
                    },
                    {
                        "class_id": 111,
                        "model_id": null
                    },
                    {
                        "class_id": 112,
                        "model_id": null
                    },
                    {
                        "class_id": 113,
                        "model_id": null
                    },
                    {
                        "class_id": 114,
                        "model_id": null
                    },
                    {
                        "class_id": 115,
                        "model_id": null
                    },
                    {
                        "class_id": 116,
                        "model_id": null
                    },
                    {
                        "class_id": 117,
                        "model_id": null
                    },
                    {
                        "class_id": 118,
                        "model_id": null
                    },
                    {
                        "class_id": 119,
                        "model_id": null
                    },
                    {
                        "class_id": 120,
                        "model_id": null
                    },
                    {
                        "class_id": 121,
                        "model_id": null
                    },
                    {
                        "class_id": 122,
                        "model_id": null
                    },
                    {
                        "class_id": 123,
                        "model_id": null
                    },
                    {
                        "class_id": 124,
                        "model_id": null
                    },
                    {
                        "class_id": 125,
                        "model_id": null
                    },
                    {
                        "class_id": 126,
                        "model_id": null
                    },
                    {
                        "class_id": 127,
                        "model_id": null
                    },
                    {
                        "class_id": 128,
                        "model_id": null
                    },
                    {
                        "class_id": 129,
                        "model_id": null
                    },
                    {
                        "class_id": 130,
                        "model_id": null
                    },
                    {
                        "class_id": 131,
                        "model_id": null
                    },
                    {
                        "class_id": 132,
                        "model_id": null
                    },
                    {
                        "class_id": 133,
                        "model_id": null
                    },
                    {
                        "class_id": 134,
                        "model_id": null
                    },
                    {
                        "class_id": 135,
                        "model_id": null
                    },
                    {
                        "class_id": 136,
                        "model_id": null
                    },
                    {
                        "class_id": 137,
                        "model_id": null
                    },
                    {
                        "class_id": 138,
                        "model_id": null
                    },
                    {
                        "class_id": 139,
                        "model_id": null
                    },
                    {
                        "class_id": 140,
                        "model_id": null
                    },
                    {
                        "class_id": 141,
                        "model_id": null
                    },
                    {
                        "class_id": 142,
                        "model_id": null
                    },
                    {
                        "class_id": 143,
                        "model_id": null
                    },
                    {
                        "class_id": 144,
                        "model_id": null
                    },
                    {
                        "class_id": 145,
                        "model_id": null
                    },
                    {
                        "class_id": 146,
                        "model_id": null
                    },
                    {
                        "class_id": 147,
                        "model_id": null
                    },
                    {
                        "class_id": 148,
                        "model_id": null
                    },
                    {
                        "class_id": 149,
                        "model_id": null
                    },
                    {
                        "class_id": 150,
                        "model_id": null
                    },
                    {
                        "class_id": 151,
                        "model_id": null
                    },
                    {
                        "class_id": 152,
                        "model_id": null
                    },
                    {
                        "class_id": 153,
                        "model_id": null
                    },
                    {
                        "class_id": 154,
                        "model_id": null
                    },
                    {
                        "class_id": 155,
                        "model_id": null
                    },
                    {
                        "class_id": 156,
                        "model_id": null
                    },
                    {
                        "class_id": 157,
                        "model_id": null
                    },
                    {
                        "class_id": 158,
                        "model_id": null
                    },
                    {
                        "class_id": 159,
                        "model_id": null
                    },
                    {
                        "class_id": 160,
                        "model_id": null
                    },
                    {
                        "class_id": 161,
                        "model_id": null
                    },
                    {
                        "class_id": 162,
                        "model_id": null
                    },
                    {
                        "class_id": 163,
                        "model_id": null
                    },
                    {
                        "class_id": 164,
                        "model_id": null
                    },
                    {
                        "class_id": 165,
                        "model_id": null
                    },
                    {
                        "class_id": 166,
                        "model_id": null
                    },
                    {
                        "class_id": 167,
                        "model_id": null
                    },
                    {
                        "class_id": 168,
                        "model_id": null
                    },
                    {
                        "class_id": 169,
                        "model_id": null
                    },
                    {
                        "class_id": 170,
                        "model_id": null
                    },
                    {
                        "class_id": 171,
                        "model_id": null
                    },
                    {
                        "class_id": 172,
                        "model_id": null
                    },
                    {
                        "class_id": 173,
                        "model_id": null
                    },
                    {
                        "class_id": 174,
                        "model_id": null
                    },
                    {
                        "class_id": 175,
                        "model_id": null
                    },
                    {
                        "class_id": 176,
                        "model_id": null
                    },
                    {
                        "class_id": 177,
                        "model_id": null
                    },
                    {
                        "class_id": 178,
                        "model_id": null
                    },
                    {
                        "class_id": 179,
                        "model_id": null
                    },
                    {
                        "class_id": 180,
                        "model_id": null
                    },
                    {
                        "class_id": 181,
                        "model_id": null
                    },
                    {
                        "class_id": 182,
                        "model_id": null
                    },
                    {
                        "class_id": 183,
                        "model_id": null
                    },
                    {
                        "class_id": 184,
                        "model_id": null
                    },
                    {
                        "class_id": 185,
                        "model_id": null
                    },
                    {
                        "class_id": 186,
                        "model_id": null
                    },
                    {
                        "class_id": 187,
                        "model_id": null
                    },
                    {
                        "class_id": 188,
                        "model_id": null
                    },
                    {
                        "class_id": 189,
                        "model_id": null
                    },
                    {
                        "class_id": 190,
                        "model_id": null
                    },
                    {
                        "class_id": 191,
                        "model_id": null
                    },
                    {
                        "class_id": 192,
                        "model_id": null
                    },
                    {
                        "class_id": 193,
                        "model_id": null
                    },
                    {
                        "class_id": 194,
                        "model_id": null
                    },
                    {
                        "class_id": 195,
                        "model_id": null
                    },
                    {
                        "class_id": 196,
                        "model_id": null
                    },
                    {
                        "class_id": 197,
                        "model_id": null
                    },
                    {
                        "class_id": 198,
                        "model_id": null
                    },
                    {
                        "class_id": 199,
                        "model_id": null
                    },
                    {
                        "class_id": 200,
                        "model_id": null
                    },
                    {
                        "class_id": 201,
                        "model_id": null
                    },
                    {
                        "class_id": 202,
                        "model_id": null
                    },
                    {
                        "class_id": 203,
                        "model_id": null
                    },
                    {
                        "class_id": 204,
                        "model_id": null
                    },
                    {
                        "class_id": 205,
                        "model_id": null
                    },
                    {
                        "class_id": 206,
                        "model_id": null
                    },
                    {
                        "class_id": 207,
                        "model_id": null
                    },
                    {
                        "class_id": 208,
                        "model_id": null
                    },
                    {
                        "class_id": 209,
                        "model_id": null
                    },
                    {
                        "class_id": 210,
                        "model_id": null
                    },
                    {
                        "class_id": 211,
                        "model_id": null
                    },
                    {
                        "class_id": 212,
                        "model_id": null
                    },
                    {
                        "class_id": 213,
                        "model_id": null
                    },
                    {
                        "class_id": 214,
                        "model_id": null
                    },
                    {
                        "class_id": 215,
                        "model_id": null
                    },
                    {
                        "class_id": 216,
                        "model_id": null
                    },
                    {
                        "class_id": 217,
                        "model_id": null
                    },
                    {
                        "class_id": 218,
                        "model_id": null
                    },
                    {
                        "class_id": 219,
                        "model_id": null
                    },
                    {
                        "class_id": 220,
                        "model_id": null
                    },
                    {
                        "class_id": 221,
                        "model_id": null
                    },
                    {
                        "class_id": 222,
                        "model_id": null
                    },
                    {
                        "class_id": 223,
                        "model_id": null
                    },
                    {
                        "class_id": 224,
                        "model_id": null
                    },
                    {
                        "class_id": 225,
                        "model_id": null
                    },
                    {
                        "class_id": 226,
                        "model_id": null
                    },
                    {
                        "class_id": 227,
                        "model_id": null
                    },
                    {
                        "class_id": 228,
                        "model_id": null
                    },
                    {
                        "class_id": 229,
                        "model_id": null
                    },
                    {
                        "class_id": 230,
                        "model_id": null
                    },
                    {
                        "class_id": 231,
                        "model_id": null
                    },
                    {
                        "class_id": 232,
                        "model_id": null
                    },
                    {
                        "class_id": 233,
                        "model_id": null
                    },
                    {
                        "class_id": 234,
                        "model_id": null
                    },
                    {
                        "class_id": 235,
                        "model_id": null
                    },
                    {
                        "class_id": 236,
                        "model_id": null
                    },
                    {
                        "class_id": 237,
                        "model_id": null
                    },
                    {
                        "class_id": 238,
                        "model_id": null
                    },
                    {
                        "class_id": 239,
                        "model_id": null
                    },
                    {
                        "class_id": 240,
                        "model_id": null
                    },
                    {
                        "class_id": 241,
                        "model_id": null
                    },
                    {
                        "class_id": 242,
                        "model_id": null
                    },
                    {
                        "class_id": 243,
                        "model_id": null
                    },
                    {
                        "class_id": 244,
                        "model_id": null
                    },
                    {
                        "class_id": 245,
                        "model_id": null
                    },
                    {
                        "class_id": 246,
                        "model_id": null
                    },
                    {
                        "class_id": 247,
                        "model_id": null
                    },
                    {
                        "class_id": 248,
                        "model_id": null
                    },
                    {
                        "class_id": 249,
                        "model_id": null
                    },
                    {
                        "class_id": 250,
                        "model_id": null
                    },
                    {
                        "class_id": 251,
                        "model_id": null
                    },
                    {
                        "class_id": 252,
                        "model_id": null
                    },
                    {
                        "class_id": 253,
                        "model_id": null
                    },
                    {
                        "class_id": 254,
                        "model_id": null
                    },
                    {
                        "class_id": 255,
                        "model_id": null
                    },
                    {
                        "class_id": 256,
                        "model_id": null
                    },
                    {
                        "class_id": 257,
                        "model_id": null
                    },
                    {
                        "class_id": 258,
                        "model_id": null
                    },
                    {
                        "class_id": 259,
                        "model_id": null
                    },
                    {
                        "class_id": 260,
                        "model_id": null
                    },
                    {
                        "class_id": 261,
                        "model_id": null
                    },
                    {
                        "class_id": 262,
                        "model_id": null
                    },
                    {
                        "class_id": 263,
                        "model_id": null
                    },
                    {
                        "class_id": 264,
                        "model_id": null
                    },
                    {
                        "class_id": 265,
                        "model_id": null
                    },
                    {
                        "class_id": 266,
                        "model_id": null
                    },
                    {
                        "class_id": 267,
                        "model_id": null
                    },
                    {
                        "class_id": 268,
                        "model_id": null
                    },
                    {
                        "class_id": 269,
                        "model_id": null
                    },
                    {
                        "class_id": 270,
                        "model_id": null
                    },
                    {
                        "class_id": 271,
                        "model_id": null
                    },
                    {
                        "class_id": 272,
                        "model_id": null
                    },
                    {
                        "class_id": 273,
                        "model_id": null
                    },
                    {
                        "class_id": 274,
                        "model_id": null
                    },
                    {
                        "class_id": 275,
                        "model_id": null
                    },
                    {
                        "class_id": 276,
                        "model_id": null
                    },
                    {
                        "class_id": 277,
                        "model_id": null
                    }
                ]
            },
            {
                "id": "predictions",
                "value": [
                    {
                        "class_id": 3,
                        "scores": [
                            -4.382230281829834,
                            -2.868830680847168,
                            0.8482214212417603,
                            2.595614194869995,
                            -1.412729024887085,
                            1.1393808126449585,
                            1.1607961654663086,
                            -2.686911106109619,
                            -2.86285400390625,
                            -3.853127956390381
                        ]
                    },
                    {
                        "class_id": 33,
                        "scores": [
                            -0.5889604091644287,
                            -2.9929895401000977,
                            2.494110584259033,
                            1.3431310653686523,
                            -1.117436170578003,
                            0.10404403507709503,
                            -1.546765685081482,
                            -0.122711680829525,
                            -1.7736139297485352,
                            -4.22725248336792
                        ]
                    },
                    {
                        "class_id": 83,
                        "scores": [
                            -4.618646621704102,
                            -0.7017335295677185,
                            -1.1239078044891357,
                            2.200225830078125,
                            -2.287207841873169,
                            -1.9845439195632935,
                            0.5534430742263794,
                            -4.072113037109375,
                            -2.9986774921417236,
                            1.5838592052459717
                        ]
                    },
                    {
                        "class_id": 34,
                        "scores": [
                            -0.971854031085968,
                            0.8769661784172058,
                            -0.6866899728775024,
                            0.5155593156814575,
                            -2.7973945140838623,
                            -0.0590292289853096,
                            -0.8026765584945679,
                            -3.162019729614258,
                            -4.208273887634277,
                            -0.9585270881652832
                        ]
                    }
                ]
            }
        ]
    }
};
