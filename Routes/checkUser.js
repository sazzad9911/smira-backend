const {auth}= require('../Server/firebase')

const checkUser=(res)=>{
   try{
    auth.onAuthStateChanged(user=>{
        if(user){
            res.send(user)
            res.end();
        }else{
            res.send({message:'No user found!'})
            res.end();
        }
    })
   }catch(err){
       res.send(err.message)
       res.end();
   }
}
module.exports =checkUser