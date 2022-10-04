const mysql = require('mysql')
const config = require('../config.json')

const sqlConnection = (sql, values, next) => {
    // It means that the values hasnt been passed
    if (arguments.length === 2) {
        next = values;
        values = null;
    }

    const connection = mysql.createConnection(config.database);
    connection.connect((err) => {
        if (err !== null) {
            console.log("[MYSQL] Error connecting to mysql:" + err + '\n');
        }
    });

    connection.query(sql, values, (err, result) => {
        connection.end();

        // Execute the callback
        next.apply(this, [err, result]);

    });
}

module.exports = sqlConnection;