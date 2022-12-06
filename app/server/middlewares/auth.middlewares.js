const userService = require('../services/user.services')
const authService = require('../services/auth.services')
const { accessTokenSecret } = require('../config/jwt.config')

exports.isAuth = async (req, res, next) => {
    // Lấy access token từ header
    const accessTokenFromHeader = req.headers.x_authorization
    if (!accessTokenFromHeader) {
        return res.status(401).send('Access token not found!')
    }

    const verified = await authService.verifyToken(
        accessTokenFromHeader,
        accessTokenSecret
    )
    if (!verified) {
        return res.status(401).send('You have no right to access this feature.')
    }
    const user = await userService.getUserByEmail(verified.payload.email)
    req.user = user

    return next()
}
