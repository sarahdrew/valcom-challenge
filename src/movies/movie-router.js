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

// By all movies
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
    .post(jsonParser, (req, res, next) => {
        const { title, overview, release_date } = req.body
        const newMovie = { title, overview, release_date }
        for (const [key, value] of Object.entries(newMovie))
            if (value === null)
                return res.status(400).json({
                    error: { message: `Missing ${key} in request body` }
                })
        MovieService.insertMovie(
            req.app.get('db'),
            newMovie
        )
            .then(movie => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${movie.id}`))
                    .json(serializeMovie(movie))
            })
            .catch(next)

    })
// By movie id
movieRouter
    .route('/:movieId')
    .all((req, res, next) => {
        MovieService.getById(
            req.app.get('db'),
            req.params.movieId
        )
            .then(movie => {
                if (!movie) {
                    return res.status(404).json({
                        error: { message: `Movie doesn't exist` }
                    })
                }
                res.movie = movie
                next()

            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeMovie(res.movie))
    })
    // Delete a movie via ID or Title
    .delete((req, res, next) => {
        MovieService.deleteMovie(
            req.app.get('db'),
            req.params.movie_id
        )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })



    //Update a movie via ID or Title

    //Search a movie via Title