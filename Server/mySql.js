const mysql=require('mysql');


const mySql = mysql.createConnection({
    host: "sql3.freemysqlhosting.net",
    user: "sql3482205",
    password: "JQIzSu8TRX",
    database: "sql3482205"
})

module.exports=mySql