const fs = require('fs');
const multer = require('multer')
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline)
const ip = require('ip');
const pool = require('../Server/mySql')

const setDataWithFile = (req, res) => {
    if (!req.body.tableName) {
        res.send({ message: 'Required table name' })
        res.end()
        return
    }
    if (!req.body.columns) {
        res.send({ message: 'Required column names as array' })
        res.end()
        return
    }
    if (!req.body.values) {
        res.send({ message: 'Required values as array' })
        res.end()
        return
    }
    if (!req.file) {
        res.send({ message: 'Required file' })
        res.end()
        return
    }

    try{
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                res.send(400)
                res.end();
                return;
            }
            let newValues = req.body.values.split(',')
            let values = "";
            newValues.forEach((doc, i) => {
                if (i == req.body.values.length - 1) {
                    values = values + "'" + doc + "'";
                } else {
                    values = values + "'" + doc + "'" + ",";
                }
            })
            let fileName= req.file.originalname
            let url='http://'+ip.address()+':4000/'+fileName
            const sql = "INSERT INTO " + req.body.tableName + " (" + req.body.columns+ ",image) VALUES (" + values+"'"+ url+"')";
            console.log(sql);
            connection.query(sql, (error, result, fields) => {
                if (error) {
                    res.send({ message: error.message })
                    res.end()
                    console.log(error.message)
                    connection.release()
                    return
                }
                res.send(result)
                connection.release()
            })
        })
    }catch(err){
        res.send(err.message)
        res.end()
    }
    
    
}
module.exports = setDataWithFile
