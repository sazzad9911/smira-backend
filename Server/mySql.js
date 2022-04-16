const mysql=require('mysql');


const mySql = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "simira"
})

module.exports=mySql