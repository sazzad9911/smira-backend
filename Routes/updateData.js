const mysql=require('../Server/mySql')

const updateData=(req, res)=>{
    if(!req.body.tableName || !req.body.key || !req.body.value){
        res.send({message: 'Table name key and value not found'});
        res.end();
        return
    }
    try{
        const tableName = req.body.tableName
        const sql = ""
    }catch(err){
        
    }
}