var mysql = require('mysql');
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "simira",
    connectionLimit : 1000,               // this is the max number of connections before your pool starts waiting for a release
    multipleStatements : true 
})
module.exports = pool