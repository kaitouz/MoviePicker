const query = require('./mysql.services')

const addBookmark = async (user_id, movie_id, category) =>
    await query('INSERT INTO bookmark (user_id, movie_id, category) VALUES (?, ?, ?)', [
        user_id,
        movie_id,
        category
    ])

const getAllBookmarksByUserId = async (user_id) =>
    await query('SELECT movie_id, category FROM bookmark WHERE user_id = ?', user_id)

const getBookmarkByUserIdAndMovieId = async (user_id, movie_id) => {
    const results = await query(
        'SELECT * FROM bookmark WHERE user_id = ? AND movie_id = ?',
        [user_id, movie_id]
    )
    return results.length != 0
}

const deleteBookmark = async (user_id, movie_id) =>
    await query('DELETE FROM bookmark WHERE user_id = ? AND movie_id = ?', [
        user_id,
        movie_id,
    ])

module.exports = {
    addBookmark,
    getAllBookmarksByUserId,
    getBookmarkByUserIdAndMovieId,
    deleteBookmark,
}
