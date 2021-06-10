const request = require('postman-request');

// const weatherStackUrl = "http://api.weatherstack.com/current?access_key=6a42304f458dad67d589e0a1ff968264&query=Mauritius&units=f";
// request({ url:weatherStackUrl, json: true }, (error, response, body) => {
//     if (error) {
//         console.log('Unable to connect to weather service');
//     } else if (body.error) {
//         console.log('Unable to find Location');
//     } else {
//         const weatherAPI = body.current;
//         console.log(`it is currently ${weatherAPI.temperature} degrees out. It feels like ${weatherAPI.feelslike} degrees out.`);
//     }
// });

// const mapboxUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/Mauritius.json?access_token=pk.eyJ1IjoibmlsZXNocGFyd2FuIiwiYSI6ImNqbmhsb2lxejBkd2szcnRsYm1hd2xkazIifQ.X8Gf7CIPCxOH3SGBmXX3Sw&limit=1";
// request({ url: mapboxUrl, json: true }, (error, response, body) => {
//     if (error) {
//         console.log('Unable to connect to weather service');

//     } else if (body.features && body.features.length === 0) {
//         console.log('Unable to find Location');
//     } else {
//         console.log(`
//             lat: ${body.features[0].center[0]}
//             long: ${body.features[0].center[1]}
//         `);
//     }
// });

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibmlsZXNocGFyd2FuIiwiYSI6ImNqbmhsb2lxejBkd2szcnRsYm1hd2xkazIifQ.X8Gf7CIPCxOH3SGBmXX3Sw&limit=1`;
    request({ url, json: true }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find Location', undefined);
        } else {
            callback(undefined, JSON.stringify(body));
        }
    });
};

module.exports = {
    geocode    
};