const {auth} = require('../Server/firebase')
const mySql=require('../Server/mySql')

const setData=(req, res) =>{
    if(!req.body.auth.uid){
        res.send({message:'Auth is required to setData'})
        res.end()
        return
    }
    if(!Array.isArray(req.body.columns) || !Array.isArray(req.body.values)){
        res.send({message:'Parameter are not set, set params to : {columns: arrayType, values: arrayType}'})
        res.end()
        return
    }
    if(!req.body.tableName){
        res.send({message:'tableName cannot be empty'})
        res.end()
        return
    }
    try{
        connection= mySql()
        let values="";
        req.body.values.forEach((doc,i) => {
            if(i==req.body.values.length-1) {
                values=values+"'"+doc+"'";
            }else{
                values=values+"'"+doc+"'"+",";
            }
        })
        let columns="";
        req.body.columns.forEach((doc,i) => {
            if(i==req.body.columns.length-1) {
                columns=columns+doc
            }else{
                columns=columns+doc+",";
            }
        })
        const sql="INSERT INTO "+req.body.tableName+" ("+columns+") VALUES ("+values+")";
        connection.query(sql,(error,result,fields)=>{
            if(error){
                res.send({message:error.message})
                res.end()
                connection.destroy()
                return
            }
            res.send(result, (err) => {
                res.end();
                connection.close();
            });
        })
        //mysql.end()
    }catch(err) {
        res.send({message:err.code})
        res.end()
    }
}

module.exports=setData