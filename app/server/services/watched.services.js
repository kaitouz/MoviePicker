const query = require('./mysql.services')

const addWatched = async (user_id, movie_id) =>
    await query('INSERT INTO watched (user_id, movie_id) VALUES (?, ?)', [
        user_id,
        movie_id,
    ])

const getAllWatchedsByUserId = async (user_id) =>
    await query('SELECT movie_id FROM watched WHERE user_id = ?', user_id)

const getAllWatchedsByMovieId = async (movie_id) =>
    await query('SELECT user_id FROM watched WHERE movie_id = ?', movie_id)

const getWatchedByUserIdAndMovieId = async (user_id, movie_id) => {
    const results = await query(
        'SELECT * FROM watched WHERE user_id = ? AND movie_id = ?',
        [user_id, movie_id]
    )
    return results.length != 0
}

const deleteWatched = async (user_id, movie_id) =>
    await query('DELETE FROM watched WHERE user_id = ? AND movie_id = ?', [
        user_id,
        movie_id,
    ])

module.exports = {
    addWatched,
    getAllWatchedsByUserId,
    getAllWatchedsByMovieId,
    getWatchedByUserIdAndMovieId,
    deleteWatched,
}
