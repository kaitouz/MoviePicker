const query = require('./mysql.services')

const getRatingById = async (rating_id) => {
    const results = await query('SELECT * FROM rating where id = ?', rating_id)
    return results.length == 0 ? false : results[0]
}

const getRatingByUserAndMovie = async (user_id, movie_id) => {
    const results = await query(
        'SELECT * FROM rating WHERE user_id = ? AND movie_id = ?',
        [user_id, movie_id]
    )
    return results.length == 0 ? false : results[0]
}

const addRating = async (user_id, movie_id, score) =>
    await query(
        'INSERT INTO rating (user_id, movie_id, score) VALUES (?, ?, ?)',
        [user_id, movie_id, score]
    )

const updateRating = async (rating_id, score) =>
    await query('UPDATE rating SET score = ? WHERE id = ?', [score, rating_id])

const getAllRatingsByMovieId = async (movie_id) =>
    await query(
        'SELECT id, user_id, score FROM rating WHERE movie_id = ?',
        movie_id
    )

const getAllRatingsByUserID = async (user_id) =>
    await query(
        'SELECT id, movie_id, score FROM rating WHERE user_id = ?',
        user_id
    )

module.exports = {
    getRatingById, //checked
    getRatingByUserAndMovie, //checked
    getAllRatingsByMovieId, //checked
    getAllRatingsByUserID, //checked
    addRating, //checked
    updateRating, //checked
}
