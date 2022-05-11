var mysql = require('mysql2');
const pool = mysql.createPool({
    host: "localhost",
    user: "smira",
    password: "S1245#%cdfSD@",
    database: "simira",
    connectionLimit : 1000,               // this is the max number of connections before your pool starts waiting for a release
    multipleStatements : true 
})
module.exports = pool