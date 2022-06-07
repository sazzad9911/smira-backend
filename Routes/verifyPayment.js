const { auth } = require('../Server/firebase')
const pool = require('../Server/mySql')
const Pay= require('./rejorPay.json')
var { validatePaymentVerification } = require('razorpay');

const verifyPayment = async(req, res) => {
    if (!req.body.razorpay_payment_id || !req.body.razorpay_order_id || !req.body.razorpay_signature) {
        res.send({ message: 'Invalid payment information' })
        res.end()
        return
    }
    if (!req.body.uid || !req.body.amount) {
        res.send({ message: 'amount and user id must be provided' })
        res.end()
        return
    }
    
    try {
        const razorpayPaymentId=req.body.razorpay_payment_id;
        const razorpayOrderId=req.body.razorpay_order_id;
        const signature=req.body.razorpay_signature;
        const uid=req.body.uid;
        const amount=req.body.amount;
        
        const isValid = await validatePaymentVerification({"order_id": razorpayOrderId, "payment_id": razorpayPaymentId }, signature, Pay.key_secret);
        console.log(isValid)
      if(!isValid) {
        res.send({ message:"Error in payment verification"})
        res.end()
        return
      }
      res.send('successful')
     // console.log(isValid)
      return
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                res.send(400)
                res.end();
                return;
            }
            const all="'"+amount+"'"+","+"'"+uid+"'"+","+"'"+razorpayPaymentId+"'"+","+"'"+razorpayOrderId+"'"
            
            const sql = "INSERT INTO payements (ammount,uid,payment_id,order_id) VALUES ("+all+")";
            //console.log(sql);
            connection.query(sql, (error, result, fields) => {
                if (error) {
                    res.send({ message: error.message })
                    res.end()
                    connection.release()
                    return
                }
                res.send(result)
                connection.release()
            })
        })
    } catch (err) {
        res.send({ message: err.code })
        res.end()
    }
}

module.exports = verifyPayment