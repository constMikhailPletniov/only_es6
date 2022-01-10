const axios = require('axios');

const getApiData = async () => {
    try {
        const { data: { results } } = await axios.get(`https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${process.env.ADZUNA_API_ID || 'ccc38448'}&app_key=${process.env.API_KEY_ADZUNA || '6e970519eb8e74ec75c0376db45da6ae'}`);
        results;
        if (!results) return { error: "Invalid request" };
        return { data: results };
    } catch (err) {
        console.error('apiData', err);
    }
};

module.exports = {
    getApiData
}