'use strict';
require('dotenv').config();

const express = require('express');

const cors = require('cors');

const superagent = require('superagent');

const PORT = process.env.PORT;


const server = express();

server.use(cors());

server.listen(PORT, () => {
    console.log(`Listening on PORT${PORT}`);
})

server.get('/', (request, response) => {
    response.status(200).send('it\'s working');
})

server.get('/location', locationHandler);
server.get('/weather', weatherHandler);
server.get('/trails', trailsHandler);

function locationHandler(request, response) {
    const city = request.query.city;
    let key = process.env.GEOCODE_API_KEY;
    const url = `https://eu1.locationiq.com/v1/search.php?key=${key}&q=${city}&format=json`
    superagent.get(url)
        .then(geoData => {
            const locationData = new Location(city, geoData.body)
            response.status(200).json(locationData)
        })
}



function Location(city, geoData) {
    this.search_query = city;
    this.formatted_query = geoData[0].display_name;
    this.latitude = geoData[0].lat;
    this.longitude = geoData[0].lon;
}

let weatherSummary = [];

function weatherHandler(request, response) {
    const city = request.query.search_query;
    let key = process.env.WEATHER_API_KEY;
    console.log('ddddddddddddddddddddd', key);
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${key}`;
    superagent.get(url)
        .then(weatherData => {
            weatherData.body.data.map(theWeather => {
                var weatherData = new Weather(theWeather);
                weatherSummary.push(weatherData);
            })
            response.send(weatherSummary);
        })
}

function Weather(dataOfWeather) {
    this.time = dataOfWeather.valid_date;
    this.forecast = dataOfWeather.weather.description;
}

let trailsArray = [];

function trailsHandler(request, response) {
    let key = process.env.TRAIL_API_KEY;
    let lat = request.query.latitude;
    let log = request.query.longitude;
    let url = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${log}&maxDistance=200&key=${key}`
    superagent.get(url)
        .then(dataTrails => {
            dataTrails.body.trails.map(trailsData => {
                var dataOfTrails = new Trail(trailsData);
                trailsArray.push(dataOfTrails);
            })
            response.send(trailsArray);
        })
}

function Trail(trailsData) {
    this.name = trailsData.name;
    this.location = trailsData.location;
    this.length = trailsData.length;
    this.stars = trailsData.stars;
    this.starvote = trailsData.starvote;
    this.summary = trailsData.summary;
    this.trail_url = trailsData.url;
    this.conditions = trailsData.conditions;
    this.condition_date = trailsData.conditionDate;
    this.condition_time = trailsData.conditionDate;
}


server.use((request, response) => {
    response.status(500).send('Sorry, something went wrong')
})