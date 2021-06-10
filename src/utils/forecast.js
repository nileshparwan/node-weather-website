
const request = require('postman-request');

const weatherCode = (address, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=6a42304f458dad67d589e0a1ff968264&query=${encodeURIComponent(address)}&units=f`;
    request({ url, json: true }, (error, response, body) => {
        if (error) {
            console.log('Unable to connect to weather service', undefined);
        } else if (body.error) {
            console.log('Unable to find Location', undefined);
        } else {
            callback(undefined, JSON.stringify(body));
        }
    });
};


module.exports = {
    weatherCode
};