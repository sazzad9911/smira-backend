const {auth} =require('../Server/firebase')
const {signOut}=require('firebase/auth')

const SignOut =(res) => {
    try {
        signOut(auth).then(() =>{
            res.send('Successful')
            res.end();
        }).catch(err =>{
            res.send(err.message)
            res.end();
        })
    }catch(err) {
        res.send(err.message)
        res.end();
    }
}

module.exports =SignOut