'use strict';
const superagent = require('superagent');

function trailsHandler(request, response) {
    let trailsArray = [];
    let key = process.env.TRAIL_API_KEY;
    let lat = request.query.latitude;
    let log = request.query.longitude;
    let url = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${log}&maxDistance=200&key=${key}`;
    superagent.get(url).then((dataTrails) => {
        dataTrails.body.trails.map((trailsData) => {
            var dataOfTrails = new Trail(trailsData);
            trailsArray.push(dataOfTrails);
        });
        response.send(trailsArray);
    });
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
    this.condition_date = trailsData.conditionDate.substring(0, 11);
    this.condition_time = trailsData.conditionDate.substring(11);
}

module.exports = trailsHandler;