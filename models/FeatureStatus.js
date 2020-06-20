const mysql = require("mysql");
const HOST = "localhost";
const USER = "root";
const PASSWORD = "123456";
const DATABASE = "trackpath";
const STATUS = {
  OPEN: 1,
  IN_PROGRESS: 2,
  TO_BE_TESTED: 3,
  CLOSED: 4,
};

const findAll = async function (callback) {
  const con = await mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
  });

  con.connect(async function (err) {
    if (err) throw err;
    console.log("Connected!");

    let sql = `SELECT * FROM FeatureStatus`;

    con.query(sql, async function (err, result) {
      if (err) throw err;
      console.log(sql);
      con.destroy();
      return callback(result);
    });
  });
};

module.exports = { STATUS: STATUS, findAll: findAll };
