const mysql = require("mysql");
const HOST = "localhost";
const USER = "root";
const PASSWORD = "123456";
const DATABASE = "trackpath";
const POOL_LIMIT = 1;
let cachedDbPool;

// const connection = mysql.createConnection({
//   host: HOST,
//   user: USER,
//   password: PASSWORD,
//   database: DATABASE,
// });

// connection.connect(async function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

function cachedPool() {
  if (!cachedDbPool) {
    cachedDbPool = mysql.createPool({
      connectionLimit: POOL_LIMIT,
      host: HOST,
      user: USER,
      password: PASSWORD,
      database: DATABASE,
    });
  }
  return cachedDbPool;
}

module.exports = cachedPool();
