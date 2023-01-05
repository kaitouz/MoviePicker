const query = require('./mysql.services')
const fs = require('fs')
const { root } = require('../config/image.config')

const getUserByEmail = async (email) => {
    const result = await query('SELECT * FROM user WHERE email = ?', email)
    return result.length == 0 ? false : result[0]
}

const getUserById = async (id) => {
    const result = await query('SELECT * FROM user WHERE id = ?', id)
    return result.length == 0 ? false : result
}

const createUser = async (user) =>
    await query('INSERT INTO user (name, email, password) VALUES (?, ?, ?)', [
        user.name,
        user.email,
        user.password,
    ])

const getAllUsers = async () =>
    await query('SELECT id, name, email, role, avatar FROM user')

const setName = async (id, name) =>
    await query('UPDATE user SET name = ?  WHERE id = ?', [name, id])

const setPassword = async (id, password) =>
    await query('UPDATE user SET password = ?  WHERE id = ?', [password, id])

const updateRefreshToken = async (ID, refreshToken) =>
    await query('UPDATE user SET refresh_token = ? WHERE id = ?', [
        refreshToken,
        ID,
    ])

const deleteById = async (userId) =>
    await query('DELETE FROM user WHERE id = ?', userId)

const updateAvatar = async (id, avatar) => {
    const res = await query('SELECT avatar FROM user WHERE id = ?', [id])
    if (res[0] && res[0].avatar !== 'default.png') {
        fs.unlink(root + '/' + res[0].avatar, err => {
            if (err) {
                console.error('there was an error:', err);
            } else {
                console.log('successfully deleted file');
            }
        });
    }

    await query('UPDATE user SET avatar = ? WHERE id = ?', [avatar, id])
}

module.exports = {
    getUserByEmail,
    getAllUsers,
    getUserById,
    createUser,
    setName,
    setPassword,
    deleteById,
    updateRefreshToken,
    updateAvatar
}
