const mysql = require("mysql");
const HOST = "localhost";
const USER = "root";
const PASSWORD = "123456";
const DATABASE = "trackpath";

const create = async function (feature, callback) {
  const con = await mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
  });

  con.connect(async function (err) {
    if (err) throw err;
    console.log("Connected!");

    let sql = `insert into Features (TitleFeature, DescriptionFeature, EstimatedTime, DeliveryDate, CreatedAt, ProjectID, FeatureStatusID) 
        values 
        ("${feature.TitleFeature}", "${feature.DescriptionFeature}", ${feature.EstimatedTime}, STR_TO_DATE('${feature.DeliveryDate}', '%Y-%m-%d'), STR_TO_DATE('${feature.CreatedAt}', '%Y-%m-%d'),${feature.ProjectID},${feature.FeatureStatusID})`;

    console.log(sql);

    con.query(sql, function (err, result) {
      if (err) throw err;
      con.destroy();
      console.log(sql);
      console.log(result);
      return callback();
    });
  });
};

const findFeaturesByProjects = async function (projectID, callback) {
  const con = await mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
  });

  con.connect(async function (err) {
    if (err) throw err;
    console.log("Connected!");

    let sql = `select * from features as f 
        where f.ProjectID = ${projectID}`;

    con.query(sql, async function (err, result) {
      if (err) throw err;
      console.log(sql);
      con.destroy();
      return callback(result);
    });
  });
};

module.exports = {
  create: create,
  findFeaturesByProjects: findFeaturesByProjects,
};
