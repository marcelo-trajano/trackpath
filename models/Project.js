const connection = require("../db/connection");
const mysql = require("mysql");

const create = (project) => {
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO projects (NameProject,StartDate,EndDate,DescriptionProject,StatusID) 
    VALUES ('${project.name}',STR_TO_DATE('${project.startDate}', 
    '%Y-%m-%d'),STR_TO_DATE('${project.endDate}', '%Y-%m-%d'),'${project.description}',${project.status})`;

    connection.query(sql, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};

const update = (project) => {
  return new Promise((resolve, reject) => {
    let sql = `update projects
    set NameProject = '${project.name}' ,
    StartDate = STR_TO_DATE('${project.startDate}', '%Y-%m-%d'), 
    EndDate = STR_TO_DATE('${project.endDate}', '%Y-%m-%d') ,
    DescriptionProject = '${project.description}', StatusID = ${project.status}
    where ID  = ${project.id}`;

    connection.query(sql, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};

const findAll = () => {
  return new Promise((resolve, reject) => {
    let sql = `select p.ID as id, p.NameProject, DATE_FORMAT(p.StartDate,'%Y-%m-%d') as StartDate , DATE_FORMAT(p.EndDate,'%Y-%m-%d') as EndDate, p.DescriptionProject, sp.ID as StatusID, sp.StatusName 
        from projects as p
        inner join statusproject as sp
        on p.StatusID = sp.ID 
        ORDER BY ID DESC`;

    connection.query(sql, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};

const findByPK = (id) => {
  return new Promise((resolve, reject) => {
    let sql = `select p.ID as ID, p.NameProject, DATE_FORMAT(p.StartDate,'%Y-%m-%d') as StartDate , DATE_FORMAT(p.EndDate,'%Y-%m-%d') as EndDate, p.DescriptionProject, sp.ID as StatusID, sp.StatusName 
    from projects as p
    inner join statusproject as sp
    on p.StatusID = sp.ID 
    where p.id=${mysql.escape(id)}`;

    connection.query(sql, (err, result) => {
      err ? reject(err) : resolve(result[0]);
    });
  });
};

const remove = (id) => {
  return new Promise((resolve, reject) => {
    let sql = `delete from projects 
        where id=${mysql.escape(id)}`;

    connection.query(sql, (err, result) => {
      err ? reject(err) : resolve(result[0]);
    });
  });
};

module.exports = {
  create: create,
  findAll: findAll,
  findByPK: findByPK,
  update: update,
  remove: remove,
};
