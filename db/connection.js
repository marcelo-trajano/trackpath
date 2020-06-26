const mysql = require("mysql");
const HOST = "localhost";
const USER = "root";
const PASSWORD = "123456";
const DATABASE = "trackpath";

const connection = mysql.createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
});

connection.connect(async function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = connection;
