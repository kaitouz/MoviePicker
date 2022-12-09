const express = require('express')
const router = express.Router()

const bookmarkController = require('../controllers/bookmark.controllers')
const { isAuth } = require('../middlewares/auth.middlewares')

router.get('/add', isAuth, bookmarkController.addBookmark)
router.get('/remove', isAuth, bookmarkController.removeBookmark)
router.get('/all', isAuth, bookmarkController.userBookmark)

module.exports = router
