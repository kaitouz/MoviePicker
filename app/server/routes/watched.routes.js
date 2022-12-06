const express = require('express')
const router = express.Router()

const watchedController = require('../controllers/watched.controllers')
const { isAuth } = require('../middlewares/auth.middlewares')

router.get('/add', isAuth, watchedController.addWatched)
router.get('/remove', isAuth, watchedController.removeWatched)
router.get('/all', isAuth, watchedController.userWatched)
router.get('/views', watchedController.movieWatchedCount)

module.exports = router
