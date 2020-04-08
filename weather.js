'use strict';
const superagent = require('superagent');

function weatherHandler(request, response) {
    let weatherSummary = [];
    const city = request.query.search_query;
    let key = process.env.WEATHER_API_KEY;
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${key}`;
    superagent.get(url).then((weatherData) => {
        weatherData.body.data.map((theWeather) => {
            var weatherData = new Weather(theWeather);
            weatherSummary.push(weatherData);
        });
        response.send(weatherSummary);
    });
}

function Weather(dataOfWeather) {
    this.time = dataOfWeather.valid_date;
    this.forecast = dataOfWeather.weather.description;
}

module.exports = weatherHandler;