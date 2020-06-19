const mysql = require("mysql");
const StatusProject = require(`./StatusProject`)

const Project = require(`./Project`)


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "trackpath",
});

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     con.query("CREATE DATABASE trackpath1", function(err, result) {
//         if (err) throw err;
//         console.log("Database created");
//     });
// });

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = `CREATE TABLE StatusProject (
//         ID int NOT NULL AUTO_INCREMENT,
//         StatusName VARCHAR(50) NOT NULL,
//         PRIMARY KEY (ID)
//     )`;
//     con.query(sql, function(err, result) {
//         if (err) throw err;
//         console.log("Table StatusProject created");
//     });
// });

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = `CREATE TABLE Projects (
//         ID int NOT NULL AUTO_INCREMENT,
//         NameProject VARCHAR(255) NOT NULL,
//         StartDate DATE NOT NULL,
//         EndDate DATE NOT NULL,
//         DescriptionProject VARCHAR(3000) NOT NULL,
//         StatusID int NOT NULL,
//         PRIMARY KEY (ID),
//         FOREIGN KEY (StatusID) REFERENCES StatusProject(ID)
//     )`;
//     con.query(sql, function(err, result) {
//         if (err) throw err;
//         console.log("Table Projects created");
//     });
// });


// let lista = []

// lista.push({field: "StatusName", value: "Active"})
// lista.push({field: "StatusName", value: "In Progress"})
// lista.push({field: "StatusName", value: "On Track"})
// lista.push({field: "StatusName", value: "Delayed"})
// lista.push({field: "StatusName", value: "In Testing"})
// lista.push({field: "StatusName", value: "On Hold"})
// lista.push({field: "StatusName", value: "Approved"})
// lista.push({field: "StatusName", value: "Cancelled"})
// lista.push({field: "StatusName", value: "Planning"})
// lista.push({field: "StatusName", value: "Completed"})
// lista.push({field: "StatusName", value: "Invoiced"})


// for (let i = 0; i <= 10; i++) {
//     StatusProject.create(lista[i],()=>{})    
// }


Project.remove(3,function(){})
