const nodemailer = require('nodemailer');
const smtp = require('./smtp.json')


const sendEmail =(req, res)=>{
    try{
        var transporter = nodemailer.createTransport({
          host: "smtp.elasticemail.com",
          port: 2525,
          secure: false, // true for 465, false for other ports
          auth: {
            user:smtp.user, // generated ethereal user
            pass: smtp.password, // generated ethereal password
          },
          });
          if(!req.body.to ||!req.body.subject || !req.body.text){
            res.send({message: 'Field from,to,subject and text are required.'})
            res.end()
            return
          }
          var mailOptions = {
            from: 'support@smira.club',
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