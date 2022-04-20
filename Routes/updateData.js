const mySql = require('../Server/mySql')

const updateData = (req, res) => {
    if (!req.body.tableName) {
        res.send({ message: 'Table name not found' });
        res.end();
        return
    }
    if (!req.body.columns && !Array.isArray(req.body.columns)) {
        res.send({ message: 'Not found columns as array. Ex: ["name"]' })
        res.end();
        return
    }
    if (!req.body.values && !Array.isArray(req.body.values)) {
        res.send({ message: 'Not found values as array.' })
        res.end();
        return
    }
    if (!req.body.condition) {
        res.send({ message: 'Condition is not set for update' })
        res.end();
        return
    }
    try {
            connection= mySql()
            let columns = "";
            req.body.columns.forEach((column, i) => {
                if (req.body.columns.length - 1 != i) {
                    columns = columns + column + " = " + "'" + req.body.values[i] + "'" + ",";
                } else {
                    columns = columns + column + " = " + "'" + req.body.values[i] + "'";
                }
            })
            const sql = "UPDATE " + req.body.tableName + " SET " + columns + " WHERE " + req.body.condition;
            connection.query(sql, (error, result, fields) => {
                if (error) {
                    res.send({ message: error.code });
                    res.end();
                    connection.destroy();
                    return;
                }
                res.send(result)
                res.end();
                connection.destroy();
            })
            //mysql.end()
        }catch (err) {
            res.send({ message: err.code });
            res.end();
        }
    }

module.exports = updateData