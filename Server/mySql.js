
var mysql = require('mysql2');

module.exports = function () {
    var pool = mysql.createPool({
        host: "localhost",
        user: "smira",
        password: "S1245#%cdfSD@",
        database: "simira"
    })

    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return;
        }

        return connection
    })

}





