const http = require('http');
const { router } = require('./routers/router');
require('dotenv').config();

const { PORT, STATUS_CODE } = require('./config/constants');

http.createServer(async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Content-Type', 'application/json, text/plain; charset=utf-8;');
    res.setHeader('Access-Control-Max-Age', '-1');

    req.on('error', (err) => {
        console.error('Server error: ', err);
        res.statusCode = STATUS_CODE.INTERNAL_ERROR;
        res.end(JSON.stringify({ message: error }));
    });

    const buffer = [];

    req.on('data', chunk => {
        buffer.push(chunk);
    });

    req.on('end', async () => {
        const body = buffer.length ?
            JSON.parse(buffer) : JSON.stringify({ message: "body empty" });
        await router({ req, res, body });
    });

})
    .listen(PORT, () => {
        console.log(`App Work on ${PORT}`);
    });