'use strict';
const superagent = require('superagent');
// const pg = require('pg');
// const client = new pg.Client(process.env.DATABASE_URL);

const client = require('./dataBase.js')

function locationHandler(request, response) {
    const city = request.query.city;
    console.log('this is qeeqeqe', request.query);
    let sql = 'SELECT * FROM locationInfo WHERE search_query = $1';
    const safeValue = [city];
    client.query(sql, safeValue).then((dataResult) => {
        if (dataResult.rowCount > 0) {
            //to check if the search_query is exist in the databaseor not
            response.send(dataResult.rows[0]);
        } else {
            let key = process.env.GEOCODE_API_KEY;
            const url = `https://eu1.locationiq.com/v1/search.php?key=${key}&q=${city}&format=json`;
            superagent.get(url).then((geoData) => {
                const locationData = new Location(city, geoData.body);
                let sql = 'INSERT INTO locationInfo (search_query, formatted_query,latitude,longitude) VALUES ($1 ,$2,$3,$4)';
                let safeValue = [
                    locationData.search_query,
                    locationData.formatted_query,
                    locationData.latitude,
                    locationData.longitude,
                ];
                response.status(200).json(locationData);
                client.query(sql, safeValue);
            });
        }
    });
}

function Location(city, geoData) {
    this.search_query = city;
    this.formatted_query = geoData[0].display_name;
    this.latitude = geoData[0].lat;
    this.longitude = geoData[0].lon;
}

module.exports = locationHandler;