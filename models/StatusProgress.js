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

async function getStatus() {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM StatusProgress`;
    connection.cachedPool().query(sql, (err, results) => {
      //if (err) throw err;
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = {
  StatusProgressValue: StatusProgressValue,
  findAll: findAll,
  getStatus: getStatus,
};
