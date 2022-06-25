const pool = require('../Server/mySql')

const query = (req, res) => {
    if (!req.body.query) {
        res.send({ message: 'SQL query must be added' })
        res.end();
        return;
    }
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                return;
            }
            connection.query(req.body.query, (error, result, field) => {
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
module.exports = query