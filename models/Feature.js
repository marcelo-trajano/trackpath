const connection = require("../db/connection");
const mysql = require("mysql");

const create = (feature) => {
  return new Promise((resolve, reject) => {
    let sql = `insert into Features (TitleFeature, DescriptionFeature, EstimatedTime, DeliveryDate, 
      CreatedAt, ProjectID, FeatureStatusID, StatusProgressID) 
      values 
      ("${feature.TitleFeature}", "${feature.DescriptionFeature}", ${feature.EstimatedTime}, 
      STR_TO_DATE('${feature.DeliveryDate}', '%Y-%m-%d'), STR_TO_DATE('${feature.CreatedAt}', '%Y-%m-%d'),
      ${feature.ProjectID},${feature.FeatureStatusID},${feature.StatusProgressID})`;

    connection.query(sql, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};

const findAll = () => {
  return new Promise((resolve, reject) => {
    let sql = `select * from features as f`;

    connection.query(sql, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};

const findByPK = (id) => {
  return new Promise((resolve, reject) => {
    let sql = `select f.ID, f.TitleFeature, f.DescriptionFeature, f.EstimatedTime, DATE_FORMAT(f.DeliveryDate,'%Y-%m-%d') as DeliveryDate,
    DATE_FORMAT( f.CreatedAt,'%Y-%m-%d') as CreatedAt, f.ProjectID, f.FeatureStatusID,
     f.StatusProgressID from features as f where f.ID =${mysql.escape(id)}`;

    connection.query(sql, (err, result) => {
      err ? reject(err) : resolve(result[0]);
    });
  });
};

const findFeaturesByProjects = (id) => {
  return new Promise((resolve, reject) => {
    let sql = `select * from features as f 
        where f.ProjectID = ${mysql.escape(id)} ORDER BY ID DESC`;

    connection.query(sql, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};

const update = (obj) => {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE features as f
    SET  f.TitleFeature = '${obj.StartDate}', f.DescriptionFeature = '${
      obj.StartDate
    }', f.EstimatedTime = '${obj.StartDate}', f.DeliveryDate = STR_TO_DATE('${
      obj.StartDate
    }', '%Y-%m-%d'), f.CreatedAt = STR_TO_DATE('${
      obj.StartDate
    }', '%Y-%m-%d'), f.FeatureStatusID = ${
      obj.StartDate
    }, f.StatusProgressID = ${obj.StartDate}
    WHERE f.ID =${mysql.escape(obj.id)}`;

    connection.query(sql, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};

const updateSolveIssue = (feature) => {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE features as f
    SET  f.DescriptionFeature = '${
      feature.DescriptionFeature
    }', f.FeatureStatusID = ${feature.FeatureStatusID}, 
    f.StatusProgressID = ${feature.StatusProgressID}
    WHERE f.ID =${mysql.escape(feature.ID)}`;

    connection.query(sql, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};

module.exports = {
  create: create,
  findFeaturesByProjects: findFeaturesByProjects,
  findByPK: findByPK,
  updateSolveIssue: updateSolveIssue,
  findAll: findAll,
};
