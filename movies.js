'use strict';
const superagent = require('superagent');

function moviesHandler(request, response) {
    let movieArr = [];
    let key = process.env.MOVIE_API_KEY;
    const city = request.query.search_query;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${city}`;
    superagent.get(url).then(movieInfo => {
        movieInfo.body.results.map(movies => {
            let movieResult = new MoveiData(movies, 'https://image.tmdb.org/t/p/w500/');
            movieArr.push(movieResult);
        })
        response.send(movieArr);
    })
}

function MoveiData(movieData, path) {
    this.title = movieData.title;
    this.overview = movieData.overview;
    this.average_votes = movieData.vote_average;
    this.total_votes = movieData.vote_count;
    this.image_url = path + movieData.poster_path;
    this.popularity = movieData.popularity;
    this.released_on = movieData.release_date;
}

module.exports = moviesHandler;