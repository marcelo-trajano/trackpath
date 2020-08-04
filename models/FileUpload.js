const connection = require("../db/connection");
const mysql = require("mysql");

const create = (file) => {
  return new Promise((resolve, reject) => {
    sql = `insert into file_upload (name, file_path, feature_id ) values ('${file.name}', '${file.file}', ${file.feature_id})`;

    connection.query(sql, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};

module.exports = { create: create };
