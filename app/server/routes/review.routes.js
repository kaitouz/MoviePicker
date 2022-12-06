const express = require('express')
const router = express.Router()

const reviewController = require('../controllers/review.controllers')
const { isAuth } = require('../middlewares/auth.middlewares')

router.post('/add', isAuth, reviewController.addReview)
router.post('/edit', isAuth, reviewController.editReview)
router.get('/delete', isAuth, reviewController.deleteReview)
router.get('/movie-reviews', reviewController.movieReview)
router.get('/all', isAuth, reviewController.userReview)

module.exports = router
