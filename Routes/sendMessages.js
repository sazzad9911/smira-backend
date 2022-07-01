
const pool = require('../Server/mySql')
const messaging = require('../Server/firebase-admin')

const sendMessages =(req, res)=>{
   
    if(!req.body.title){
        res.send({ message: 'title is needed' });
        return;
    }
    if(!req.body.body){
        res.send({ message: 'body is needed' });
        return;
    }
    if(!Array.isArray(req.body.uid) || req.body.uid.length==0){
        res.send({ message: 'uid is needed' });
        return;
    }
    try{
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                return;
            }
            let injection=''
            req.body.uid.forEach((value, key) => {
                if(!injection){
                    injection=`uid='${value}'`;
                }else{
                    injection=injection+` OR uid='${value}'`
                }
            })
            const sql = `SELECT token from user WHERE ${injection}`
            connection.query(sql, (error, result, field) => {
                if (error) {
                    console.log(error.message)
                    res.send({ message: error.message })
                    res.end();
                    connection.release()
                }
                
                if(Array.isArray(result)){
                    let arr=[]
                    result.forEach(res=>{
                        arr.push(res.token)
                    })
                    const message = {
                        notification:{
                            title:req.body.title,
                            body:req.body.body
                        },
                        tokens:arr,
                      };
                      
                    messaging.sendMulticast(message)
                       .then((response) => {
                         // Response is a message ID string.
                         connection.release()
                         res.send({success: true});
                          console.log('Successfully sent message:', response);
                       })
                       .catch((error) => {
                        connection.release()
                        res.send(error)
                         console.log('Error sending message:', error);
                       });
                }
            })
                
        })
    }catch(e){
        res.send(e)
        res.end()
    }

}

module.exports =sendMessages