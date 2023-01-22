const query = require('./mysql.services')

const getReviewById = async (id) => {
    const result = await query('SELECT * FROM review WHERE id = ?', id)
    return result.length == 0 ? false : result[0]
}

const getAllReviewsByUserID = async (user_id) =>
    await query('SELECT * FROM review WHERE user_id = ?', user_id)

const getAllReviewsByMovieID = async (movie_id) =>
    await query(
        `SELECT review.id, review.user_id, review.movie_id, review.content, review.time, user.name AS user_name, user.email, user.role, user.avatar 
        FROM review 
        JOIN user ON user.id = review.user_id
        WHERE movie_id = ?
        ORDER BY review.time ASC`, movie_id)

const addReview = async (comment_id, user_id, movie_id, content) =>
    await query(
        'INSERT INTO review (id, user_id, movie_id, content) VALUES (?, ?, ?, ?)',
        [comment_id, user_id, movie_id, content]
    )

const updateReview = async (id, new_content) =>
    await query('UPDATE review SET content = ? WHERE id = ?', [new_content, id])

const deleteReview = async (id) =>
    await query('DELETE FROM review WHERE id = ?', id)

module.exports = {
    addReview,
    getReviewById,
    getAllReviewsByMovieID,
    getAllReviewsByUserID,
    updateReview,
    deleteReview,
}
