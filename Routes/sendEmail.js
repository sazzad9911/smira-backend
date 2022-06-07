const nodemailer = require('nodemailer');

const userName="clubsmira313@gmail.com"
const password="sazzad#991"

const sendEmail =(req, res)=>{
    try{
        var transporter = nodemailer.createTransport({
          host: "smtp.elasticemail.com",
          port: 2525,
          secure: false, // true for 465, false for other ports
          auth: {
            user: 'clubsmira313@gmail.com', // generated ethereal user
            pass: '28346C5E2BE1047891F6A330EA25885086AC', // generated ethereal password
          },
          });
          if(!req.body.to ||!req.body.subject || !req.body.text){
            res.send({message: 'Field from,to,subject and text are required.'})
            res.end()
            return
          }
          var mailOptions = {
            from: 'clubsmira313@gmail.com',
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