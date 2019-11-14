// run tests with the "npm test" command
const chai = require('chai'); 
const expect = chai.expect;
const chaiXml = require('chai-xml');

const soapReqHelper = require('../helpers/soapRequestHelper');

// mock request parameter values (would normally come from client)
let orderId = "123-4567";
let storeId = "19909";

chai.use(chaiXml);

// Function creates XML based on config properties and dynamic params passed into a request to /test-post
    describe('createSoapReqSoapEnv(orderId, merchantId)', () => {
    it('should return valid XML', async () => {
    let xmlPayload = await soapReqHelper.createSoapReqEnvelope(orderId, storeId);
        let xmlPayloadString = xmlPayload.toString(); // validator expects a string, not an object
        expect(xmlPayloadString).xml.to.be.valid;
    });

    it('should return XML that includes the orderId param that was passed-in by client', async () => {
    let xmlPayload = await soapReqHelper.createSoapReqEnvelope(orderId, storeId);
        let xmlPayloadString = xmlPayload.toString(); // validator expects a string, not an object
        expect(xmlPayloadString).to.include('<orderID>123-4567</orderID>');
    });

    it('should return XML that includes the store Id param that was passed-in by client', async () => {
        let xmlPayload = await soapReqHelper.createSoapReqEnvelope(orderId, storeId);
        let xmlPayloadString = xmlPayload.toString(); // validator expects a string, not an object
        expect(xmlPayloadString).to.include('<merchantID>19909</merchantID>');
    });

    it('should return XML that includes the reqParams.EXAMPLE.CONNECTION_USERNAME property', async () => {
        let xmlPayload = await soapReqHelper.createSoapReqEnvelope(orderId, storeId);
        let xmlPayloadString = xmlPayload.toString(); // validator expects a string, not an object
        expect(xmlPayloadString).to.include('<connectionUsername>hfarnsworth</connectionUsername>');
    });

    it('should return XML that includes the reqParams.EXAMPLE.CONNECTION_PASSWORD property', async () => {
        let xmlPayload = await soapReqHelper.createSoapReqEnvelope(orderId, storeId);
        let xmlPayloadString = xmlPayload.toString(); // validator expects a string, not an object
        expect(xmlPayloadString).to.include('<connectionPassword>science-mobile</connectionPassword>');
    });
});