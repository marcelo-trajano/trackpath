const connection = require("../db/connection");

const StatusProgressValue = {
  NOT_STARTED: 6,
  DONE: 10,
};

const findAll = () => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM StatusProgress`;
    connection.query(sql, (err, results) => {
      err ? reject(err) : resolve(results);
    });
  });
};

module.exports = {
  StatusProgressValue: StatusProgressValue,
  findAll: findAll,
};
