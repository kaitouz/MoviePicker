const randToken = require('rand-token')
const bcrypt = require('bcrypt')

const userService = require('../services/user.services')
const authService = require('../services/auth.services')

const { SALT_ROUNDS } = require('../config/auth.config')
const {
    accessTokenSecret,
    accessTokenLife,
    refreshTokenSize,
} = require('../config/jwt.config')

exports.register = async (req, res) => {
    const email = req.body.email
    const user = await userService.getUserByEmail(email)
    if (user) res.status(409).send('Email has already existed.')
    else {
        const hashPassword = bcrypt.hashSync(req.body.password, SALT_ROUNDS)
        const newUser = {
            name: req.body.name,
            email: email,
            password: hashPassword,
        }
        const createUser = await userService.createUser(newUser)
        if (!createUser) {
            return res
                .status(400)
                .send(
                    'There was an error during account creation, please try again.'
                )
        }
        const result = await userService.getUserByEmail(email)
        return res.send(result)
    }
}

exports.login = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const user = await userService.getUserByEmail(email)

    if (!user) {
        return res.status(401).send('Email does not exist')
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password)
    if (!isPasswordValid) {
        return res.status(401).send('Wrong password.')
    }

    const dataForAccessToken = {
        email: email,
    }
    const accessToken = await authService.generateToken(
        dataForAccessToken,
        accessTokenSecret,
        accessTokenLife
    )
    if (!accessToken) {
        return res.status(401).send('Login failed, please try again.')
    }

    let refreshToken = randToken.generate(refreshTokenSize) // tạo 1 refresh token ngẫu nhiên
    if (!user.refreshToken) {
        // Nếu user này chưa có refresh token thì lưu refresh token đó vào database
        await userService.updateRefreshToken(user.id, refreshToken)
    } else {
        // Nếu user này đã có refresh token thì lấy refresh token đó từ database
        refreshToken = user.refreshToken
    }

    return res.json({
        msg: 'Login successfully',
        accessToken,
        refreshToken,
        user,
    })
}

exports.refreshToken = async (req, res) => {
    // Lấy access token từ header
    const accessTokenFromHeader = req.headers.x_authorization
    if (!accessTokenFromHeader) {
        return res.status(400).send('Access token not found.')
    }

    // Lấy refresh token từ body
    const refreshTokenFromBody = req.body.refreshToken
    if (!refreshTokenFromBody) {
        return res.status(400).send('Refresh token not found.')
    }

    // Decode access token đó
    const decoded = await authService.decodeToken(
        accessTokenFromHeader,
        accessTokenSecret
    )

    if (!decoded) {
        return res.status(400).send('Invalid access token')
    }

    const email = decoded.payload.email

    const user = await userService.getUserByEmail(email)
    if (!user) {
        return res.status(401).send('User does not exist.')
    }

    if (refreshTokenFromBody !== user.refresh_token) {
        return res.status(400).send('Refresh token is not valid.')
    }

    // Tạo access token mới
    const dataForAccessToken = {
        email: email,
    }

    const accessToken = await authService.generateToken(
        dataForAccessToken,
        accessTokenSecret,
        accessTokenLife
    )
    if (!accessToken) {
        return res
            .status(400)
            .send('Access token generation failed, please try again.')
    }
    return res.json({
        accessToken,
    })
}
