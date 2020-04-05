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

server.get('/', (request, response) => {
    response.status(200).send('it\'s working');
})

server.get('/location', (request, response) => {
    const geoData = require('./data/geo.json');
    const city = request.query.city;
    const locationCity = new GeoData(city, geoData);
    response.send(locationCity);
});


function GeoData(city, geoData) {
    this.search_query = city;
    this.formatted_query = geoData[0].display_name;
    this.latitude = geoData[0].lat;
    this.longitude = geoData[0].lon;
}