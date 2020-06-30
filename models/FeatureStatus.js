const connection = require("../db/connection");
const STATUS = {
  OPEN: 1,
  IN_PROGRESS: 2,
  TO_BE_TESTED: 3,
  CLOSED: 4,
};

const findAll = () => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM FeatureStatus`;
    connection.query(sql, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};

module.exports = { STATUS: STATUS, findAll: findAll };
