let express = require('express');
let router1 = require('./routers/IncomingRequestRouter');
let router2 = require('./routers/RestRequestRouter');
let router3 = require('./routers/SoapRequestRouter');

const app = express();
const path = require('path');
const contextRoot = '/node-starter-project';
const serverLevel = process.env.SERVER_LEVEL;
const versionNumber = process.env.DOCKER_VER;

app.use(contextRoot, router1, router2, router3);

// AWS health check
app.get(contextRoot + '/check', (req, res) => {
    console.log(`${contextRoot} Health Check Request - Server level : ${serverLevel}, Version : ${versionNumber}`);
    res.send(`Server level : ${serverLevel}<br/>Version : ${versionNumber}`);
});

let port = 8080;
app.listen(port);
console.log(`Application started on port ${port}`);