//This file is to store MovieService object and to put methods on the object that stores transactions

const MovieService = {
    getAllMovies(knex) {
        return knex.select('*').from('movies')
    },
    insertMovie(knex, newMovie) {
        return knex
            .insert(newMovie)
            .into('movies')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    }
}