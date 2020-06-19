const mysql = require("mysql");
const HOST = "localhost"
const USER = "root"
const PASSWORD = "123456"
const DATABASE = "trackpath"


const create = async function(obj, callback) {
    const con = await mysql.createConnection({
        host: HOST,
        user: USER,
        password:PASSWORD ,
        database: DATABASE,        
    });

    con.connect(async function(err) {
        if (err) throw err;
        console.log("Connected!");
        let sql = `INSERT INTO StatusProject (${obj.field}) VALUES ('${obj.value}')`;
        con.query(sql, function(err, result) {
            if (err) throw err;
            con.destroy();
            console.log(sql);
            findByPK(result.insertId, function(result) {
                return callback(result);
            });
        });
    });
};

const findAll = async function(callback) {
    const con = await mysql.createConnection({
        host: HOST,
        user: USER,
        password:PASSWORD ,
        database: DATABASE,   
    });

    con.connect(async function(err) {
        if (err) throw err;
        console.log("Connected!");

        let sql = `SELECT * FROM statusproject`;

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
        password:PASSWORD ,
        database: DATABASE,   
    });

    con.connect(async function(err) {
        if (err) throw err;
        console.log("Connected!");

        let sql = `SELECT * FROM statusproject 
        where id=${mysql.escape(id)}`;

        con.query(sql, async function(err, result) {
            if (err) throw err;
            console.log(sql);
            con.destroy();
            return callback(result[0]);
        });
    });
};

module.exports = { create: create, findByPK: findByPK, findAll: findAll };