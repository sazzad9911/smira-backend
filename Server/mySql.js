const mysql=require('mysql');


const mySql = mysql.createConnection({
    host: "localhost",
    user: "smira",
    password: "S1245#%cdfSD@",
    database: "simira"
})

module.exports=mySql