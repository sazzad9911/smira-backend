const {auth}= require('../Server/firebase')
const {createUserWithEmailAndPassword} = require('firebase/auth')

const signUp=(req,res) => {
    if(!req.body.email || !req.body.password){
        res.send('Please use email and password!');
        res.end()
        return
    }
    try {
        createUserWithEmailAndPassword(auth,req.body.email, req.body.password)
        .then(userInfo => {
            let user = userInfo.user
            res.send(user)
            res.end()
        }).catch(err => {
            res.send(err.message)
            res.end()
        })
    }catch(err) {
        res.send(err.message)
        res.end()
    }
}

module.exports=signUp