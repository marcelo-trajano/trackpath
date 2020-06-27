const connection = require("../db/connection");

const findAll = async function (callback) {
  let sql = `SELECT * FROM Priority`;

  connection.query(sql, async function (err, result) {
    if (err) throw err;
    console.log(sql);
    return callback(result);
  });
};

module.exports = { findAll: findAll };
