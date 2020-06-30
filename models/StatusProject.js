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

const findByPK = async function (id, callback) {
  let sql = `SELECT * FROM statusproject 
        where id=${mysql.escape(id)}`;

  connection.query(sql, async function (err, result) {
    if (err) throw err;
    console.log(sql);
    return callback(result[0]);
  });
};

module.exports = { findByPK: findByPK, findAll: findAll };
