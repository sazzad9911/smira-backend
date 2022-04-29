
var mysql=require('mysql2');

var pool = mysql.createPool({
    host: "localhost",
    user: "smira",
    password: "S1245#%cdfSD@",
    database: "simira"
})

module.exports=function(){

    
    pool.getConnection((err, connection)=>{
        if(err) {
            console.log(err);
            return;
        }

        return connection
    })

}





