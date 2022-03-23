const mysql=require('mysql');


const mySql = mysql.createConnection({
    host: "sql6.freemysqlhosting.net",
    user: "sql6474055",
    password: "Xbul467VLT",
    database: "sql6474055"
})

module.exports(mySql)