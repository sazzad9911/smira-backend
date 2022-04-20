module.exports=function(){

    let mysql=require('mysql');

    let mySql = mysql.createConnection({
        host: "localhost",
        user: "smira",
        password: "S1245#%cdfSD@",
        database: "simira"
    })

    mySql.connect(function(err){
        if (err) {
            console.log(`connectionRequest Failed ${err.stack}`)
        } else {
            console.log(`DB connectionRequest Successful ${connection.threadId}`)
        }
    })

    return mySql

}





