const mysql=require('../Server/mySql')

const searchData=(req, res) =>{
    if(!req.body.tableName || !req.body.searchData || !req.body.searchColumn){
        res.send({message: 'searchColumn, tableName and searchData fields are required'});
        res.end();
        return;
    }
    try {
        const sql="SELECT * FROM "+req.body.tableName+" WHERE "
        +req.body.searchColumn+" LIKE "+"'%"+req.body.searchData+"%'";
        mysql.query(sql,(error,result,fields)=>{
            if(error) {
                res.send({message:error.message})
                res.end();
                return
            }
            res.send(result);
            res.end();
        })
    }catch(err) {
        res.send({message:err.message});
        res.end()
    }
}
module.exports =searchData