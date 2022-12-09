const mysql = require('mysql')
const DB_config = require('../config/database.config')

const connection = mysql.createConnection(DB_config)

const query = (sql, params) =>
    new Promise((resolve, reject) => {
        connection.query(sql, params, (err, result) => {
            //connection.end()
            return err ? reject(err) : resolve(result)
        })
    })

module.exports = query
