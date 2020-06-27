const connection = require("../db/connection");

const create = async function (feature, callback) {
  let sql = `insert into Features (TitleFeature, DescriptionFeature, EstimatedTime, DeliveryDate, 
               CreatedAt, ProjectID, FeatureStatusID, StatusProgressID) 
               values 
               ("${feature.TitleFeature}", "${feature.DescriptionFeature}", ${feature.EstimatedTime}, 
               STR_TO_DATE('${feature.DeliveryDate}', '%Y-%m-%d'), STR_TO_DATE('${feature.CreatedAt}', '%Y-%m-%d'),
               ${feature.ProjectID},${feature.FeatureStatusID},${feature.StatusProgressID})`;

  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(sql);
    return callback();
  });
};

const findFeaturesByProjects = async function (projectID, callback) {
  let sql = `select * from features as f 
        where f.ProjectID = ${projectID} ORDER BY ID DESC`;

  connection.query(sql, async function (err, result) {
    if (err) throw err;
    console.log(sql);
    return callback(result);
  });
};

const findAll = async function (callback) {
  let sql = `select * from features as f`;

  connection.query(sql, async function (err, result) {
    if (err) throw err;
    console.log(sql);
    return callback(result);
  });
};

const findByPK = async function (ID, callback) {
  let sql = `select f.ID, f.TitleFeature, f.DescriptionFeature, f.EstimatedTime, DATE_FORMAT(f.DeliveryDate,'%Y-%m-%d') as DeliveryDate,
    DATE_FORMAT( f.CreatedAt,'%Y-%m-%d') as CreatedAt, f.ProjectID, f.FeatureStatusID,
     f.StatusProgressID from features as f where f.ID =${ID}`;

  connection.query(sql, async function (err, result) {
    if (err) throw err;
    console.log(sql);
    return callback(result[0]);
  });
};

const update = async function (ID, callback) {
  let sql = `UPDATE features as f
    SET  f.TitleFeature = '${obj.StartDate}', f.DescriptionFeature = '${obj.StartDate}', f.EstimatedTime = '${obj.StartDate}', f.DeliveryDate = STR_TO_DATE('${obj.StartDate}', '%Y-%m-%d'), f.CreatedAt = STR_TO_DATE('${obj.StartDate}', '%Y-%m-%d'), f.FeatureStatusID = ${obj.StartDate}, f.StatusProgressID = ${obj.StartDate}
    WHERE f.ID =${obj.StartDate}`;

  connection.query(sql, async function (err, result) {
    if (err) throw err;
    console.log(sql);
    return callback(result[0]);
  });
};

const updateSolveIssue = async function (feature, callback) {
  let sql = `UPDATE features as f
    SET  f.DescriptionFeature = '${feature.DescriptionFeature}', f.FeatureStatusID = ${feature.FeatureStatusID}, f.StatusProgressID = ${feature.StatusProgressID}
    WHERE f.ID =${feature.ID}`;

  connection.query(sql, async function (err, result) {
    if (err) throw err;
    console.log(sql);
    return callback(result[0]);
  });
};

module.exports = {
  create: create,
  findFeaturesByProjects: findFeaturesByProjects,
  findByPK: findByPK,
  updateSolveIssue: updateSolveIssue,
  findAll: findAll,
};
