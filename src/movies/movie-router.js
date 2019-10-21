const path = require('path');
const express = require('express');
const MovieService = require('./movie-service');

const movieRouter = express.Router();
const jsonParser = express.json();

const serializeMovie = movie => ({
    title: movie.title,
    release_date: movie.release_date,
    overview: movie.overview
})

movieRouter
    .route('/')
    //List all movies inside of the database
    .get((req, res, net) => {
        MovieService.getAllMovies(req.app.get('db'))
            .then(movies => {
                res.json(movies.map(serializeMovie))
            })
            .catch(next)
    })
    //Create a movie following the movie schema
    .post(json)
    //Update a movie via ID or Title
    // Delete a movie via ID or Title
    //Search a movie via Title