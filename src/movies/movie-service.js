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
    },
    getById(knex, id) {
        return knex.from('movies')
            .select('*')
            .where('id', id).first()
    },
    deleteMovie(knex, id) {
        return knex('movies')
            .where({ id })
            .delete()
    },
    updateMovie(knex, id, newMovieFields) {
        return knex('movies')
            .where({ id })
            .update(newMovieFields)
            .returning('*')
    }
}
module.exports = MovieService