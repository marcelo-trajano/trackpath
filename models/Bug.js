const mysql = require("mysql");
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

const updateSolveIssue = async function (bug, callback) {
  let sql = `update bugs as b
             SET  b.Summary = "${bug.Summary}", b.StatusID = "${bug.featureStatus}" where b.ID=${bug.bugID}`;

  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(sql);
    return callback(result);
  });
};

const findByPK = async function (id, callback) {
  let sql = `SELECT b.ID, b.Title, b.Summary, b.EstimatedHours,DATE_FORMAT(b.DeliveryDate,'%Y-%m-%d') as DeliveryDate, DATE_FORMAT(b.CreatedAt,'%Y-%m-%d') as CreatedAt,b.ProjectID,b.StatusID,b.SeverityID,b.PriorityID
  FROM bugs as b
  where b.ID =${id}`;

  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(sql);
    return callback(result[0]);
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

const getBugsByProject = (id) => {
  return new Promise((resolve, reject) => {
    let sql = `select * from bugs where projectid=${mysql.escape(id)}`;
    connection.query(sql, (err, results) => {
      err ? reject(err) : resolve(results);
    });
  });
};

module.exports = {
  create: create,
  findAll: findAll,
  getBugsByProject: getBugsByProject,
  findByPK: findByPK,
  updateSolveIssue: updateSolveIssue,
};
