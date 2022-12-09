const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.controllers')

const { isAuth } = require('../middlewares/auth.middlewares')

router.get('/profile', isAuth, async (req, res) => {
    res.send(req.user)
})

router.get('/public-info', userController.getUserInfo)
router.get('/delete', isAuth, userController.deleteUser)
router.get('/all', isAuth, userController.getAllUsers)
router.post('/reset-password', isAuth, userController.changePassword)
router.post('/set-name', isAuth, userController.changeName)

module.exports = router
