const mysql = require('mysql')
const DB_config = require('../config/database.config')

let connection

const handleDisconnect = () => {
    connection = mysql.createConnection(DB_config)
    connection.connect(err => {
        if (err) {
            console.log('error when connecting to db:', err)
            setTimeout(handleDisconnect, 2000)
        }
    })

    connection.on('error', err => {
        console.log('db err', err)
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect()
        } else throw err;
    })
}

handleDisconnect()

const query = (sql, params) =>
    new Promise((resolve, reject) => {
        connection.query(sql, params, (err, result) => {
            //connection.end()
            return err ? reject(err) : resolve(result)
        })
    })

module.exports = query
