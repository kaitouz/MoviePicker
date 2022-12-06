const bcrypt = require('bcrypt')

const userService = require('../services/user.services')

const { SALT_ROUNDS } = require('../config/auth.config')

exports.deleteUser = async (req, res) => {
    const user = req.user
    if (user.role !== 'admin')
        return res.send('You have no access to this feature.')
    const id = req.query.id

    //console.log(req)
    const result = await userService.getUserById(id)
    if (!result) {
        return res.json({
            message: 'user not found',
            result: false,
        })
    } else {
        await userService.deleteById(id)
        return res.json({
            message: `User with id ${id} has been deleted`,
            result: true,
        })
    }
}

exports.getAllUsers = async (req, res) => {
    const user = req.user
    if (user.role !== 'admin')
        return res.send('You have no right to access this feature.')

    const result = await userService.getAllUsers()

    return res.send(result)
}

exports.changePassword = async (req, res) => {
    const user = req.user
    const newPassword = req.body.new_password

    if (!newPassword) return res.status(401).send('new_password not found')

    const hashPassword = bcrypt.hashSync(newPassword, SALT_ROUNDS)

    await userService.setPassword(user.id, hashPassword)

    res.json({
        message: 'Password changed successfully',
        result: true,
    })
}

exports.changeName = async (req, res) => {
    const user = req.user
    const newName = req.body.new_name

    if (!newName) return res.status(401).send('new_name not found')
    await userService.setName(user.id, newName)

    res.json({
        message: 'Name changed successfully',
        result: true,
    })
}
