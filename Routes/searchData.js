const pool = require('../Server/mySql')

const searchData = (req, res) => {
    if (!req.body.tableName || !req.body.searchData || !req.body.searchColumn) {
        res.send({ message: 'searchColumn, tableName and searchData fields are required' });
        res.end();
        return;
    }
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                res.send(400)
                res.end();
                return;
            }
            const orderColumn = req.body.orderColumn ? " ORDER BY " + req.body.orderColumn + " DESC" : "";
            const filterColumn = req.body.filterColumn && req.body.filterValue ? " AND " + req.body.filterColumn + " = '" + req.body.filterValue + "'" : "";
            const between = req.body.betweenColumn && req.body.betweenA && req.body.betweenB ? " AND " + req.body.betweenColumn + " BETWEEN " +
                req.body.betweenA + " AND " + req.body.betweenB : "";
            const sql = "SELECT * FROM " + req.body.tableName + " WHERE "
                + req.body.searchColumn + " LIKE " + "'%" + req.body.searchData + "%'" + filterColumn + between + orderColumn;
            connection.query(sql, (error, result, fields) => {
                if (error) {
                    res.send({ message: error.code })
                    res.end();
                    connection.release()
                    return
                }
                res.send(result)
                connection.release()
            })
        })
    } catch (err) {
        res.send({ message: err.message });
        res.end()
    }
}
module.exports = searchData