
const pool = require('../Server/mySql')
const messaging = require('../Server/firebase-admin')

const sendMessage =(req, res)=>{
   
    if(!req.body.title){
        res.send({ message: 'title is needed' });
        return;
    }
    if(!req.body.body){
        res.send({ message: 'body is needed' });
        return;
    }
    if(!req.body.uid){
        res.send({ message: 'uid is needed' });
        return;
    }
    try{
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                return;
            }
            const sql = `SELECT token from user WHERE uid = '${req.body.uid}'`
            connection.query(sql, (error, result, field) => {
                if (error) {
                    console.log(error.message)
                    res.send({ message: error.message })
                    res.end();
                    connection.release()
                }
                const message = {
                    notification:{
                        title:req.body.title,
                        body:req.body.body
                    },
                    token:result[0].token,
                  };
                  //res.send(message); 
                //console.log(message)
                messaging.send(message)
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
            })
                
        })
    }catch(e){
        res.send(e)
        res.end()
    }

}

module.exports =sendMessage