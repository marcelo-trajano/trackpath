const connection = require("../db/connection");
const StatusProgressValue = {
  NOT_STARTED: 6,
  DONE: 10,
};

const findAll = async function (callback) {
  let sql = `SELECT * FROM StatusProgress`;

  connection.query(sql, async function (err, result) {
    if (err) throw err;
    console.log(sql);
    return callback(result);
  });
};

module.exports = { StatusProgressValue: StatusProgressValue, findAll: findAll };
