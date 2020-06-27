const mysql = require("mysql");
const connection = require("../db/connection");

const create = async function (obj, callback) {
  let sql = `INSERT INTO StatusProject (${obj.field}) VALUES ('${obj.value}')`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(sql);
    findByPK(result.insertId, function (result) {
      return callback(result);
    });
  });
};

const findAll = async function (callback) {
  let sql = `SELECT * FROM statusproject`;
  connection.query(sql, async function (err, result) {
    if (err) throw err;
    console.log(sql);
    return callback(result);
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

module.exports = { create: create, findByPK: findByPK, findAll: findAll };
