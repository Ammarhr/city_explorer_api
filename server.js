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