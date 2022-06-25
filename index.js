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
const setDataWithFile = require('./Routes/setDataWithFile')
const uploadWithData = require('./Routes/uploadWithData')
const sendEmail = require('./Routes/sendEmail')
const makePayment = require('./Routes/makePayment')
const verifyPayment = require('./Routes/verifyPayment')
const sendMessage = require('./Routes/sendMessage')
//

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors())
app.use(express.static('uploads'))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname;
        cb(null, fileName)
    }
});
const upload =multer({storage: storage})

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
app.post('/setDataWithFile',upload.single('file'),async (req, res)=>{
    setDataWithFile(req, res)
})
app.post('/uploadWithData',upload.single('file'),async (req, res)=>{
    uploadWithData(req, res)
})
app.post('/sendEmail', async (req, res)=>{
    sendEmail(req, res)
})
app.post('/makePayment',async(req,res)=>{
    makePayment(req, res)
})
app.post('/verifyPayment',async(req,res)=>{
    verifyPayment(req, res)
})
app.post('/sendMessage',async(req,res)=>{
    sendMessage(req, res)
})
console.log(port)
app.listen(port)