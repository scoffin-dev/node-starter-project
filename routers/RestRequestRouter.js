let express = require('express');
let router = express.Router();
const restHelper = require('../helpers/restRequestHelper');
// Pull endpoints from the config file
const reqEndpoint = require('../config/service-endpoints');
const restGetUrl = reqEndpoint.EXAMPLE_ENDPOINT.REST.GET_REQ;
const restPostUrl = reqEndpoint.EXAMPLE_ENDPOINT.REST.POST_REQ;
const nasaApiUrl = reqEndpoint.MISC_ENDPOINT.NASA_API_URL;
const logger = require('../log/logger')(__filename);
router.use(express.json());
router.use(express.urlencoded({extended:true}));

// * * * Acts as a middleman in a GET request to NASA's APOD API * * * //
// localhost:8080/node-starter-project/example-rest-get?api_key=DEMO_KEY
router.get('/example-rest-get', async function (req, res) {
    logger.info('GET request made to /example-rest-get');
    try {
        // Param from the query string in the client's initial request to this service
        let apiKey = req.query.api_key;

        // Make sure the required param is present in the query string and has a value
        if(apiKey && apiKey != undefined) {
            // Create and send REST request
            let apiResponse = await restHelper.restGetRequest(`${restGetUrl}?api_key=${apiKey}`);
            
            // Send back the photo description
            res.send(apiResponse.data.explanation);
        } else {
            res.status(500).send(`Precondition failed: You must provide a value for the api_key parameter. If you do not have an APOD API key, get one at ${nasaApiUrl} or use DEMO_KEY.`);
        }
    } catch(err) {
        res.status(500).send(`Request failed: ${err.message}`);
    }
});

// * * * Acts as a middleman in a POST request to the POSTMAN ECHO API * * * //
// localhost:8080/node-starter-project/example-rest-post params={lastName:archer,codeName:duchess}
router.post('/example-rest-post', async function (req, res) {
    logger.info('POST request made to /example-rest-post');
    try {
        // Param from a client's initial request to this service
        let lastName = req.body.lastName;
        let codeName = req.body.codeName;

        // Create and send REST request
        let apiResponse = await restHelper.restPostRequest(restPostUrl, lastName, codeName);
        
        // Send back "echoed" params
        res.send(apiResponse.data.data);
    } catch(err) {
        res.status(500).send(`Request failed: ${err.message}`);
    }
});

module.exports = router;