const connection = require("../db/connection");
const mysql = require("mysql");

const create = (user) => {
  return new Promise((resolve, reject) => {
    sql = `insert into users (name, email, isAdmin, password ) values ('${user.name}', '${user.email}', ${user.isAdmin}, '${user.password}')`;

    connection.query(sql, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};

const findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    sql = `select * from users where email = ${mysql.escape(email)}`;

    connection.query(sql, (err, result) => {
      err ? reject(err) : resolve(result[0]);
    });
  });
};

const findByPk = (id) => {
  return new Promise((resolve, reject) => {
    sql = `select * from users where id = ${mysql.escape(id)}`;

    connection.query(sql, (err, result) => {
      err ? reject(err) : resolve(result[0]);
    });
  });
};

module.exports = {
  create: create,
  findByEmail: findByEmail,
  findByPk: findByPk,
};
