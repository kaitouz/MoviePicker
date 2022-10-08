const mysql_query = require('../models/mysql_query.js')

const get_user = (userID, callback) => {
   mysql_query(
    "SELECT * FROM user WHERE id = ?",
    [userID],
    callback
   )
}

const get_all_users = (callback) => {
    mysql_query(
        "SELECT * FROM user", callback
    )
}

const create_user = (user, callback) => {
    mysql_query(
        "INSERT INTO user (name, username, password) VALUES (?, ?, ?)",
        [user.name, user.username, user.password],
        callback      
    )

}

const update_user = (user, callback) => {
    mysql_query(
        "UPDATE user SET name = ?, username = ?, password = ? WHERE id = ?",
        [user.name, user.username, user.password, user.id],
        callback
    )
 }

const delete_user = (userID, callback) => {
    mysql_query(
        "DELETE FROM user WHERE id = ?",
        userID,
        callback
    )
}

//code sau
const change_password = () => {}

module.exports = {create_user, get_user, get_all_users, update_user, delete_user}
