// The numToConvert param is passed to this function by the client
function createSoapReqEnvelope(numToConvert) {
    return new Promise(async (resolve, reject) => {
        try {
            let newSoapReq =
               `<?xml version="1.0" encoding="utf-8"?>
                <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                <soap:Body>
                    <NumberToWords xmlns="http://www.dataaccess.com/webservicesserver/">
                    <ubiNum>${numToConvert}</ubiNum>
                    </NumberToWords>
                </soap:Body>
                </soap:Envelope>`
            ;
            resolve(newSoapReq);
        } catch(err) {
            console.log("ERROR in createSoapReqSoapEnv: " + err.message);
            reject(err);
        }
    });
}

module.exports = {
    createSoapReqEnvelope
};