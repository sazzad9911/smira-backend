const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const multer  = require('multer')
const port = process.env.PORT || 4000;
//
const checkUser = require('./Routes/checkUser')
const signUp = require('./Routes/signUp');
const signIn = require('./Routes/signIn');
const SignOut = require('./Routes/SignOut');
const googleAuth = require('./Routes/googleAuth');
const getData = require('./Routes/getData');
const mysql = require('./Server/mySql');
const searchData = require('./Routes/searchData');
const setData = require('./Routes/setData');
const updateData = require('./Routes/updateData');
const deleteData = require('./Routes/deleteData')
//

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors())
app.use(express.static('uploads'))
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
       cb(null,file.originalname);
    }
 });
var upload = multer({ storage: storage });

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
//sql
app.post('/getData', async (req, res) => {
    getData(req, res)
})
app.post('/searchData',async (req, res)=>{
    searchData(req, res)
})
app.post('/setData',async (req, res)=>{
    setData(req, res)
})
app.post('/updateData',async (req, res)=>{
    updateData(req, res)
})
app.post('/deleteData',async (req, res)=>{
    deleteData(req, res)
})
app.post('/uploadImage',upload.single('image'),(req, res)=>{
    const image = req.image;
    res.send({message: 'Success'})
})

console.log(port)
app.listen(port)