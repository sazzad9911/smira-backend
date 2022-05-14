const fs = require('fs');
const multer = require('multer')
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline)
const ip = require('ip');
const pool = require('../Server/mySql')

const setDataWithFile = (req, res) => {
   
    if (!req.file) {
        res.send({ message: 'Required file' })
        res.end()
        return
    }
    
    try{
        let fileName= req.file.originalname
        let url='http://'+ip.address()+':4000/'+fileName
        res.send({url:url})
        res.end()
    }catch(err){
        res.send(err.message)
        res.end()
    }
    
    
}
module.exports = setDataWithFile
