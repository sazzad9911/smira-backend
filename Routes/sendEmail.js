const nodemailer = require('nodemailer');

const userName="clubsmira313@gmail.com"
const password="sazzad#991"

const sendEmail =(req, res)=>{
    try{
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: userName,
              pass: "sazzad#991"
            }
          });
          if(!req.body.from || !req.body.to ||!req.body.subject || !req.body.text){
            res.send({message: 'Field from,to,subject and text are required.'})
            res.end()
            return
          }
          var mailOptions = {
            from: req.body.from,
            to: req.body.to,
            subject: req.body.subject,
            html: req.body.text
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              res.send({message: error.message})
              res.end()
              return
            }
            res.send({success: "Email is send"})
          });
          //res.send({success: "Email is send"})
    }catch(err){
        res.send({ message: err.message});
        res.end();
    }
}
module.exports =sendEmail