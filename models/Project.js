const mysql = require("mysql");
const HOST = "localhost"
const USER = "root"
const PASSWORD = "123456"
const DATABASE = "trackpath"

const create = async function(obj, callback) {
    const con = await mysql.createConnection({
        host: HOST,
        user: USER,
        password: PASSWORD,
        database: DATABASE,
    });

    con.connect(async function(err) {
        if (err) throw err;
        console.log("Connected!");
        let sql = `INSERT INTO projects (NameProject,StartDate,EndDate,DescriptionProject,StatusID) 
        VALUES ('${obj.NameProject}',STR_TO_DATE('${obj.StartDate}', '%Y-%m-%d'),STR_TO_DATE('${obj.EndDate}', '%Y-%m-%d'),'${obj.DescriptionProject}',${obj.StatusID})`;
        con.query(sql, function(err, result) {
            if (err) throw err;
            con.destroy();
            console.log(sql);
            console.log(result);
            return callback();
        });
    });
};

const update = async function(obj, callback) {
    const con = await mysql.createConnection({
        host: HOST,
        user: USER,
        password: PASSWORD,
        database: DATABASE,
    });

    con.connect(async function(err) {
        if (err) throw err;
        console.log("Connected!");
        let sql = `update projects
                   set NameProject = '${obj.NameProject}' ,
                   StartDate = STR_TO_DATE('${obj.StartDate}', '%Y-%m-%d'), 
                   EndDate = STR_TO_DATE('${obj.EndDate}', '%Y-%m-%d') ,
                   DescriptionProject = '${obj.DescriptionProject}', StatusID = ${obj.StatusID}
                   where ID  = ${obj.ID}`;
        con.query(sql, function(err, result) {
            if (err) throw err;
            con.destroy();
            console.log(sql);
            console.log(result);
            return callback();
        });
    });
};

const findAll = async function(callback) {
    const con = await mysql.createConnection({
        host: HOST,
        user: USER,
        password: PASSWORD,
        database: DATABASE,
    });

    con.connect(async function(err) {
        if (err) throw err;
        console.log("Connected!");

        let sql = `select p.ID as ID, p.NameProject, DATE_FORMAT(p.StartDate,'%Y-%m-%d') as StartDate , DATE_FORMAT(p.EndDate,'%Y-%m-%d') as EndDate, p.DescriptionProject, sp.ID as StatusID, sp.StatusName 
        from projects as p
        inner join statusproject as sp
        on p.StatusID = sp.ID`;

        con.query(sql, async function(err, result) {
            if (err) throw err;
            console.log(sql);
            con.destroy();
            return callback(result);
        });
    });
};

const findByPK = async function(id, callback) {
    const con = await mysql.createConnection({
        host: HOST,
        user: USER,
        password: PASSWORD,
        database: DATABASE,
    });

    con.connect(async function(err) {
        if (err) throw err;
        console.log("Connected!");

        let sql = `select p.ID as ID, p.NameProject, DATE_FORMAT(p.StartDate,'%Y-%m-%d') as StartDate , DATE_FORMAT(p.EndDate,'%Y-%m-%d') as EndDate, p.DescriptionProject, sp.ID as StatusID, sp.StatusName 
        from projects as p
        inner join statusproject as sp
        on p.StatusID = sp.ID 
        where p.id=${mysql.escape(id)}`;

        con.query(sql, async function(err, result) {
            if (err) throw err;
            console.log(sql);
            con.destroy();
            return callback(result[0]);
        });
    });
};

const remove = async function(id, callback) {
    const con = await mysql.createConnection({
        host: HOST,
        user: USER,
        password: PASSWORD,
        database: DATABASE,
    });

    con.connect(async function(err) {
        if (err) throw err;
        console.log("Connected!");

        let sql = `delete from projects 
        where id=${mysql.escape(id)}`;

        con.query(sql, async function(err, result) {
            if (err) throw err;
            console.log(sql);
            con.destroy();
            return callback(result[0]);
        });
    });
};

module.exports = {
    create: create,
    findAll: findAll,
    findByPK: findByPK,
    update: update,
    remove: remove
};