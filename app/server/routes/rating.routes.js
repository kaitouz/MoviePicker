const express = require('express')
const router = express.Router()

const ratingController = require('../controllers/rating.controllers')
const { isAuth } = require('../middlewares/auth.middlewares')

router.post('/rate-movie', isAuth, ratingController.rateMovie)
router.get('/movie-ratings', ratingController.movieRating)
router.get('/user-ratings', isAuth, ratingController.userRating)

module.exports = router
