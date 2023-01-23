const reviewService = require('../services/review.services')

exports.addReview = async (req, res) => {
    const user = req.user
    const movie_id = req.body.movie_id
    const content = req.body.content
    const commentId = req.body.comment_id
    if (!movie_id) return res.status(401).send('movie_id not found')
    if (!content) return res.status(401).send('content must not be null')

    const result = await reviewService.addReview(commentId, user.id, movie_id, content)

    res.json({
        message: 'review added',
        result: {
            id: result.insertId,
            user_id: user.id,
            movie_id: movie_id,
            content: content,
        },
    })
}

exports.editReview = async (req, res) => {
    const user = req.user
    const review_id = req.body.review_id
    if (!review_id) return res.status(401).send('review_id not found')
    const review = await reviewService.getReviewById(review_id)
    if (!review) return res.status(401).send('review does not exist')

    if (review.user_id !== user.id)
        return res.status(401).send('You have no right to edit this review')

    await reviewService.updateReview(review_id, req.body.new_content)
    res.json({
        message: 'review edited',
        result: true,
    })
}

exports.deleteReview = async (req, res) => {
    const user = req.user
    const id = req.query.id
    if (!id) return res.status(401).send('id not found')

    const review = await reviewService.getReviewById(id)
    if (!review) return res.status(401).send('review does not exist')

    if (review.user_id !== user.id && user.role !== 'admin')
        return res.status(401).send('You have no right to delete this review')

    await reviewService.deleteReview(review.id)
    res.json({
        message: `review ${id} deleted`,
    })
}

exports.movieReview = async (req, res) => {
    if (!req.query.movie_id) return res.status(401).send('movie_id not found')

    const results = await reviewService.getAllReviewsByMovieID(
        req.query.movie_id
    )
    return res.send(results)
}

exports.userReview = async (req, res) => {
    const user = req.user

    const results = await reviewService.getAllReviewsByUserID(user.id)
    return res.send(results)
}
