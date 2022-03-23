const {auth} = require('../Server/firebase')
const {signInWithEmailAndPassword} = require('firebase/auth')

const signIn=(req,res) => {
    if(!req.body.email || !req.body.password){
        res.send({message:'Email and Password cannot be empty'})
        res.end()
        return
    }
    try {
        signInWithEmailAndPassword(auth,req.body.email, req.body.password)
    .then(userCredentials => {
        let user=userCredentials.user
        res.send(user)
        res.end()
    }).catch(err => {
        res.send({message:"Opps! we didn't find your identification"})
        res.end()
    })
    }catch(err) {
        res.send({message:err.message})
        res.end()
    }
}
module.exports =signIn