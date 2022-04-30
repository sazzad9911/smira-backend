const pool = require('../Server/mySql')

const deleteData = (req, res) => {
    if (!req.body.tableName || !req.body.condition) {
        res.send({ message: 'Table name and condition cant not  be empty' })
        res.end();
        return;
    }
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                return;
            }
            const condition = req.body.condition ? " WHERE " + req.body.condition : "";
            const sql = "DELETE FROM " + req.body.tableName + condition;
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
module.exports = deleteData