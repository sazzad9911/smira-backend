const { auth } = require('../Server/firebase')
const { signInWithPopup, GoogleAuthProvider } = require('firebase/auth')

const googleAuth = (req, res) => {

    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            res.send(user);
            res.end();
            // ...
        }).catch((error) => {
            // Handle Errors here.
            if(error.email){
                res.send({message: 'Email has already used'});
                res.end();
            }
            res.send({message: 'Please try again later.'});
            res.end();
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
}
module.exports = googleAuth
