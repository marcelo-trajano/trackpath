const mysql = require("mysql");
const connection = require("../db/connection");

const findAll = () => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM statusproject`;
    connection.query(sql, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};

module.exports = { findAll: findAll };
