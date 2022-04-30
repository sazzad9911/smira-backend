const pool = require('../Server/mySql')

const getData = (req, res) => {
    if (!req.body.tableName) {
        res.send({ message: 'Table name cant not  be empty' })
        res.end();
        return;
    }
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                return;
            }
            const orderColumn = req.body.orderColumn ? " ORDER BY " + req.body.orderColumn + " DESC" : "";
            const limit = req.body.limit ? " LIMIT " + req.body.limit : "";
            const condition = req.body.condition ? " WHERE " + req.body.condition : "";
            const sql = "SELECT * FROM " + req.body.tableName + condition + orderColumn + limit;
            connection.query(sql, (error, result, field) => {
                if (error) {
                    console.log(error.message)
                    res.send({ message: error.message })
                    res.end();
                    connection.release()
                }
                res.send(result)
                connection.release()
            })
        })
    } catch (err) {
        res.send({ message: err.message })
        console.log(err.message)
        res.end()
    }
}
module.exports = getData