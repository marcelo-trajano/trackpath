const connection = require("../db/connection");
const STATUS = {
  OPEN: 1,
  IN_PROGRESS: 2,
  TO_BE_TESTED: 3,
  CLOSED: 4,
};

const findAll = async function (callback) {
  let sql = `SELECT * FROM FeatureStatus`;

  connection.query(sql, async function (err, result) {
    if (err) throw err;
    console.log(sql);
    return callback(result);
  });
};

module.exports = { STATUS: STATUS, findAll: findAll };
