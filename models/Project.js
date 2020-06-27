const mysql = require("mysql");
const connection = require("../db/connection");

const create = async function (obj, callback) {
  let sql = `INSERT INTO projects (NameProject,StartDate,EndDate,DescriptionProject,StatusID) 
        VALUES ('${obj.NameProject}',STR_TO_DATE('${obj.StartDate}', '%Y-%m-%d'),STR_TO_DATE('${obj.EndDate}', '%Y-%m-%d'),'${obj.DescriptionProject}',${obj.StatusID})`;

  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(sql);
    return callback();
  });
};

const update = async function (obj, callback) {
  let sql = `update projects
                   set NameProject = '${obj.NameProject}' ,
                   StartDate = STR_TO_DATE('${obj.StartDate}', '%Y-%m-%d'), 
                   EndDate = STR_TO_DATE('${obj.EndDate}', '%Y-%m-%d') ,
                   DescriptionProject = '${obj.DescriptionProject}', StatusID = ${obj.StatusID}
                   where ID  = ${obj.ID}`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(sql);
    return callback();
  });
};

const findAll = async function (callback) {
  let sql = `select p.ID as ID, p.NameProject, DATE_FORMAT(p.StartDate,'%Y-%m-%d') as StartDate , DATE_FORMAT(p.EndDate,'%Y-%m-%d') as EndDate, p.DescriptionProject, sp.ID as StatusID, sp.StatusName 
        from projects as p
        inner join statusproject as sp
        on p.StatusID = sp.ID 
        ORDER BY ID DESC`;
  connection.query(sql, async function (err, result) {
    if (err) throw err;
    console.log(sql);
    return callback(result);
  });
};

const findByPK = async function (id, callback) {
  let sql = `select p.ID as ID, p.NameProject, DATE_FORMAT(p.StartDate,'%Y-%m-%d') as StartDate , DATE_FORMAT(p.EndDate,'%Y-%m-%d') as EndDate, p.DescriptionProject, sp.ID as StatusID, sp.StatusName 
        from projects as p
        inner join statusproject as sp
        on p.StatusID = sp.ID 
        where p.id=${mysql.escape(id)}`;

  connection.query(sql, async function (err, result) {
    if (err) throw err;
    console.log(sql);
    return callback(result[0]);
  });
};

const remove = async function (id, callback) {
  let sql = `delete from projects 
        where id=${mysql.escape(id)}`;

  connection.query(sql, async function (err, result) {
    if (err) throw err;
    console.log(sql);
    return callback(result[0]);
  });
};

module.exports = {
  create: create,
  findAll: findAll,
  findByPK: findByPK,
  update: update,
  remove: remove,
};
