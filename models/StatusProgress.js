const mysql = require("mysql");
const HOST = "localhost";
const USER = "root";
const PASSWORD = "123456";
const DATABASE = "trackpath";
const StatusProgressValue = {
  NOT_STARTED: 6,
  DONE: 10,
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

    let sql = `SELECT * FROM StatusProgress`;

    con.query(sql, async function (err, result) {
      if (err) throw err;
      console.log(sql);
      con.destroy();
      return callback(result);
    });
  });
};

module.exports = { StatusProgressValue: StatusProgressValue, findAll: findAll };
