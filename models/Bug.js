const connection = require("../db/connection");
const mysql = require("mysql");

const create = (bug) => {
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO bugs
    (Title, Summary, EstimatedHours, DeliveryDate, CreatedAt, ProjectID, StatusID, SeverityID, PriorityID)
    VALUES
    ("${bug.Title}", "${bug.Summary}", "${bug.EstimatedTime}", STR_TO_DATE('${bug.DeliveryDate}', '%Y-%m-%d'),
    STR_TO_DATE('${bug.CreatedAt}', '%Y-%m-%d'), "${bug.projectID}", "${bug.StatusID}", "${bug.SeverityID}", "${bug.PriorityID}")`;

    connection.query(sql, (err, result) => {
      err ? reject() : resolve(result);
    });
  });
};

const updateSolveIssue = (bug) => {
  return new Promise((resolve, reject) => {
    let sql = `update bugs as b
             SET  b.Summary = "${bug.Summary}", b.StatusID = "${
      bug.featureStatus
    }" where b.ID=${mysql.escape(bug.bugID)}`;

    connection.query(sql, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};

const findByPK = (id) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT b.ID, b.Title, b.Summary, b.EstimatedHours,DATE_FORMAT(b.DeliveryDate,'%Y-%m-%d') as DeliveryDate, DATE_FORMAT(b.CreatedAt,'%Y-%m-%d') as CreatedAt,b.ProjectID,b.StatusID,b.SeverityID,b.PriorityID
  FROM bugs as b
  where b.ID =${mysql.escape(id)}`;

    connection.query(sql, (err, result) => {
      err ? reject(err) : resolve(result[0]);
    });
  });
};

const findAll = () => {
  return new Promise((resolve, reject) => {
    let sql = `select * from bugs`;

    connection.query(sql, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};

const getBugsByProject = (id) => {
  return new Promise((resolve, reject) => {
    let sql = `select * from bugs where projectid=${mysql.escape(
      id
    )} order by ID desc`;
    connection.query(sql, (err, results) => {
      err ? reject(err) : resolve(results);
    });
  });
};

const remove = (id) => {
  return new Promise((resolve, reject) => {
    let sql = `delete from bugs where ID = ${mysql.escape(id)}`;

    connection.query(sql, (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
};

module.exports = {
  create: create,
  findAll: findAll,
  getBugsByProject: getBugsByProject,
  findByPK: findByPK,
  updateSolveIssue: updateSolveIssue,
  remove: remove,
};
