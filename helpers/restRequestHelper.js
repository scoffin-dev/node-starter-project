const axios = require('axios');
// TO DO: Get logger working
const logger = require('../log/logger');

function restGetRequest(url) {
  return new Promise((resolve, reject) => {
    axios.get(url)
    .then(response => {
      resolve(response);
    })
    .catch(err => {
      //logger.info(`ERROR in restRequestHelper: ${err}`);
      reject(err);
    });
  });
};

function restPostRequest(url, param1, param2) {
  return new Promise((resolve, reject) => {
    axios.post(url, {
      param1: param1,
      param2: param2
    })
    .then(response => {
      resolve(response);
    })
    .catch(err => {
      //logger.info(`ERROR in restRequestHelper: ${err}`);
      reject(err);
    });
  });

}

module.exports = {
  restGetRequest,
  restPostRequest
};