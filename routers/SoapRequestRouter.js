let express = require('express');
let router = express.Router();
const soapRequestHelper = require('../helpers/soapRequestHelper');
const easySoapUtil = require('../helpers/easySoapUtil');
// Pull endpoints from the config file
const reqEndpoint = require('../config/service-endpoints');
const soapPostUrl = reqEndpoint.EXAMPLE_ENDPOINT.SOAP.POST_REQ;
const headers = {'Content-Type': 'text/xml;charset=UTF-8','Host': 'www.dataaccess.com'};
const logger = require('../log/logger')(__filename);
router.use(express.json());
router.use(express.urlencoded({extended:true}));

// * * * SOAP can technically (sort of) support GET requests, but it is impractical, so I'm not including an example * * *

// * * * Acts as a middleman in a POST request to a number conversion service * * * //
// localhost:8080/node-starter-project/example-soap-post {"number":"12345"}
router.post('/example-soap-post', async function (req, res) {
    try {
        // Params from a client's initial request to this service
        let numToConvert = await req.body.number;

        // Create auth reversal SOAP envelope populated with properties and client values
        let soapRequest = await soapRequestHelper.createSoapReqEnvelope(numToConvert);

        // Use the easySoapUtil util to send the SOAP request to an API
        let apiResponse = await easySoapUtil.soapRequest(soapPostUrl, headers, soapRequest, 30000);
        
        // Grab the conversion from the response JSON
        let convertedNum = apiResponse["response"]["body"]["soap:Envelope"]["soap:Body"]["m:NumberToWordsResponse"]["m:NumberToWordsResult"]["_text"];

        let responseMsg = `The number ${numToConvert} was converted to '${convertedNum}'`;
        
        // Log the result
        logger.info(responseMsg);

        // Send the response
        res.send(responseMsg);

    } catch(err) {
        res.status(500).send(`Request failed: ${err}`);
    }
});

module.exports = router;