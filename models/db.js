const mysql = require("mysql");


const con = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "trackpath",
});

module.exports = con;