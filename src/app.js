const express = require('express');
const path = require('path');
const hbs = require('hbs');

const { weatherCode } = require('./utils/forecast');
const { geocode } = require('./utils/geocode');

const app = express();
const PORT = process.env.PORT || 3000;

// define path for express config
const publicDirectory = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// console.log(__dirname); 
// console.log(path.join(__dirname, "../public")); 
// setup handlebars engine and views
app.set('view engine', 'hbs'); // it tells express which template engine to use
app.set('views', viewPath); // custom directory
hbs.registerPartials(partialsPath); // custom directory

// Setup expres directory to use
app.use(express.static(publicDirectory));

app.get('/', (req, res) => {
    // res.send("<h1>Weather</h1>");
    res.render("index", {
        title: "Weather App",
        name: "koshal"
    });
});

app.get('/help', (req, res) => {
    res.render("help", {
        helpText: "This is some helpful text",
        title: "help",
        name: "Koshal"
    });
});

app.get('/about', (req, res) => {
    res.render("about", {
        title: "About",
        name: "Koshal"
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        });
    }
    geocode(req.query.address, (error, geoData) => {
        if (error) {
            res.send(error);
        }

        const { query = [] } = JSON.parse(geoData);
        weatherCode(query.join(" "), (error, forecastData) => {
            if (error) {
                return res.send({ error: error });
            }

            const { current: { weather_descriptions = [] } = {} } = JSON.parse(forecastData);
            res.send({
                forecast: weather_descriptions.join(" "),
                locations: query.join(" "),
                address: req.query.address.charAt(0).toUpperCase() + req.query.address.slice(1)
            });

        });
    });

});

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        });
    }

    res.send({
        products: []
    });
});

app.get("/help/*", (req, res) => {
    res.status(404).render("404", {
        errorMessage: "Help article not found",
        name: "koshal"
    });
});

app.get("*", (req, res) => {
    res.status(404).render("404", {
        errorMessage: "Error 404",
        name: "koshal"
    });
});

app.listen(PORT, () => {
    console.log("Server is up on port " + PORT);
});
