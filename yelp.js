'use strict';

const superagent = require('superagent');

function yelpHandler(request, response) {
    let key = process.env.YELP_API_KEY;
    const city = request.query.search_query;
    const url = `https://api.yelp.com/v3/businesses/search?location=${city}`;
    superagent.get(url)
        .set('Authorization', `Bearer ${key}`)
        .then(request => {
            let restaurants = request.body.businesses;
            const restaurantArr = restaurants.map(restaurant => new YelpData(restaurant));
            response.send(restaurantArr);
        })
}

function YelpData(restaurant) {
    this.name = restaurant.name;
    this.image_url = restaurant.image_url;
    this.price = restaurant.price;
    this.rating = restaurant.rating;
    this.url = restaurant.url;
}

module.exports = yelpHandler;