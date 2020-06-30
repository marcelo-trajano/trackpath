const connection = require("../db/connection");

const findAll = () => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM Severity`;
    connection.query(sql, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};

module.exports = { findAll: findAll };
