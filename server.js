'use strict';

require('dotenv').config();

const express = require('express');

const cors = require('cors');

const client = require('./dataBase.js')

const PORT = process.env.PORT || 3030;

const server = express();

server.use(cors());

client.connect().then(() => {
    server.listen(PORT, () => {
        console.log(`Listening on PORT ${PORT}`);
    });
});

server.get('/', (request, response) => {
    response.status(200).send('it\'s working');
});

const locationHandlerFunction = require('./location.js');
const weatherHandlerFunction = require('./weather.js');
const trailsHandlerFunction = require('./trails.js');
const moviesHandlerFunction = require('./movies.js')
const yelpHandlerFunction = require('./yelp.js');

server.get('/location', locationHandlerFunction);
server.get('/weather', weatherHandlerFunction);
server.get('/trails', trailsHandlerFunction);
server.get('/movies', moviesHandlerFunction);
server.get('/yelp', yelpHandlerFunction);

server.use((request, response) => {
    response.status(500).send('Sorry, something went wrong');
});