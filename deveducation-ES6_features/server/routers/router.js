const URL = require('url');
const { STATUS_CODE, METHOD, ENDPOINTS } = require('../config/constants');
const { getApiData } = require('../controllers/api.controllers');

const router = async ({ req, res, body }) => {
    try {
        const { pathname } = URL.parse(req.url, true);

        switch (true) {
            case (req.method === METHOD.GET && pathname === ENDPOINTS.DATA):
                ({ error, data } = await getApiData());
                break;
        }
        if (error) {
            res.statusCode = STATUS_CODE.NOT_FOUND;
            return res.end(JSON.stringify({ message: error.message }));
        }
        res.statusCode = STATUS_CODE.OK;
        return res.end(JSON.stringify({ message: data }));
    } catch (err) {
        console.error('router: ', err);
    }
};

module.exports = { router };