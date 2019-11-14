const axios = require('axios');
let convert = require('xml-js');

function soapRequest(url, headers, xml, timeout) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url,
      headers,
      data: xml,
      timeout,
    }).then((response) => {
      let options = {
        compact: true,
        ignoreComment: false,
        spaces: 4
      };
      resolve({
        response: {
          body: convert.xml2js(response.data, options),
          statusCode: response.status,
        },
      });
    }).catch((error) => {
      if (error.response) {
        console.log(`ERROR in soapRequest: ${error}`);
        reject({
          error: error.response.data,
          statusCode: error.response.statusCode
        });
      } else {
        console.log(`ERROR in soapRequest: ${error}`);
        reject(error);
      }
    });
  });
};

//function soapRequest(url, headers, xml, timeout) {
function soapGetRequest(url) {
  return new Promise((resolve, reject) => {
    axios.get(url, { proxy: { host: 'localhost', port: '8080' } })
    .then(function (response) {
      resolve(response);
    })
    .catch(function (error) {
      reject(error);
    });
  });
};

module.exports = {
  soapRequest,
  soapGetRequest
};