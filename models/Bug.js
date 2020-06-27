const connection = require("../db/connection");

const create = async function (bug, callback) {
  let sql = `INSERT INTO bugs
  (Title, Summary, EstimatedHours, DeliveryDate, CreatedAt, ProjectID, StatusID, SeverityID, PriorityID)
  VALUES
  ("${bug.Title}", "${bug.Summary}", "${bug.EstimatedHours}", STR_TO_DATE('${bug.DeliveryDate}', '%Y-%m-%d'),
  STR_TO_DATE('${bug.CreatedAt}', '%Y-%m-%d'), "${bug.ProjectID}", "${bug.StatusID}", "${bug.SeverityID}", "${bug.PriorityID}")`;

  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(sql);
    return callback(result);
  });
};

const findAll = async function (callback) {
  let sql = `select * from bugs`;

  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(sql);
    return callback(result);
  });
};

module.exports = {
  create: create,
  findAll: findAll,
};
