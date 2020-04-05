'use strict';
require('dotenv').config();

const express = require('express');

const cors = require('cors');


const PORT = process.env.PORT || 3000;

const server = express();

server.use(cors());

server.listen(PORT, () => {
    console.log(`Listening on PORT${PORT}`);
})

// server.get('/', (request, response) => {
//     response.status(200).send('it\'s working');
// })

server.get('/location', (request, response) => {
    const geoData = require('./data/geo.json');
    const city = request.query.city;
    const locationCity = new GeoData(city, geoData);
    response.send(locationCity);
});


function GeoData(city, geoData) {
    this.search_query = city;
    this.display_name = geoData[0].display_name;
    this.lat = geoData[0].lat;
    this.log = geoData[0].lon;
}
let newArr = [];
let datetime;
let description;

server.get('/weather', (request, response) => {
    const weather = require('./data/weather.json');
    const weatherState = request.query.weatherState;

    for (let i = 0; i < weather.data.length; i++) {
        datetime = weather.data[i].datetime;
        description = weather.data[i].weather.description;
        const weatherdata = new WeatherData(datetime, description);
        newArr.push(weatherdata);
    }
    response.send(newArr);
});


function WeatherData(datetime, description) {
    this.datetime = datetime;
    this.description = description;
}