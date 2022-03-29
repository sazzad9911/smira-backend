const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000;
//
const checkUser = require('./Routes/checkUser')
const signUp = require('./Routes/signUp');
const signIn = require('./Routes/signIn');
const SignOut = require('./Routes/SignOut');
const googleAuth = require('./Routes/googleAuth');
const getData = require('./Routes/getData');
const mysql = require('./Server/mySql')
//

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors())
app.use(express.static(__dirname))

app.get('/checkUser', async (req, res) => {
    checkUser(res)
})
app.post('/signup', async (req, res) => {
    signUp(req, res)
})
app.post('/login', async (req, res) => {
    signIn(req, res)
})
app.get('/logout', async (req, res) => {
    SignOut(res)
})
app.post('/googleAuth', async (req, res) => {
    googleAuth(req, res)
})

mysql.connect(error => {
    if (error) {
        return
    }
    console.log("Connected MySQL")
    app.post('/getData', async (req, res) => {
        getData(req, res)
    })
})
app.listen(port)