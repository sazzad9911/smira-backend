const { auth } = require('../Server/firebase')
const pool = require('../Server/mySql')

const setData = (req, res) => {
    if (!req.body.auth) {
        res.send({ message: 'Auth is required to setData' })
        res.end()
        return
    }
    if (!req.body.auth.uid) {
        res.send({ message: 'Auth is required to setData' })
        res.end()
        return
    }
    if (!Array.isArray(req.body.columns) || !Array.isArray(req.body.values)) {
        res.send({ message: 'Parameter are not set, set params to : {columns: arrayType, values: arrayType}' })
        res.end()
        return
    }
    if (!req.body.tableName) {
        res.send({ message: 'tableName cannot be empty' })
        res.end()
        return
    }
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                res.send(400)
                res.end();
                return;
            }
            let values = "";
            req.body.values.forEach((doc, i) => {
                if (i == req.body.values.length - 1) {
                    values = values + "'" + doc + "'";
                } else {
                    values = values + "'" + doc + "'" + ",";
                }
            })
            let columns = "";
            req.body.columns.forEach((doc, i) => {
                if (i == req.body.columns.length - 1) {
                    columns = columns + doc
                } else {
                    columns = columns + doc + ",";
                }
            })
            const sql = "INSERT INTO " + req.body.tableName + " (" + columns + ") VALUES (" + values + ")";
            connection.query(sql, (error, result, fields) => {
                if (error) {
                    res.send({ message: error.message })
                    res.end()
                    connection.release()
                    return
                }
                res.send(result)
                connection.release()
            })
        })
    } catch (err) {
        res.send({ message: err.code })
        res.end()
    }
}

module.exports = setData