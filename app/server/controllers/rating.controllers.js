const ratingService = require('../services/rating.services')

exports.rateMovie = async (req, res) => {
    const user = req.user
    const score = req.body.score
    const movie_id = req.body.movie_id

    const rating = await ratingService.getRatingByUserAndMovie(
        user.id,
        movie_id
    )
    if (!rating) {
        await ratingService.addRating(user.id, movie_id, score)
        const result = await ratingService.getRatingByUserAndMovie(
            user.id,
            movie_id
        )
        res.json({
            message: 'new rating created',
            result: result,
        })
    } else {
        await ratingService.updateRating(rating.id, score)
        rating.score = score
        res.json({
            message: 'rating updated',
            result: rating,
        })
    }
}

exports.movieRating = async (req, res) => {
    if (!req.query.movie_id) return res.send('movie_id not found')
    const results = await ratingService.getAllRatingsByMovieId(
        req.query.movie_id
    )
    res.send(results)
}

exports.userRating = async (req, res) => {
    const user = req.user
    const results = await ratingService.getAllRatingsByUserID(user.id)
    res.send(results)
}
