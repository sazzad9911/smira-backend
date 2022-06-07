const { auth } = require('../Server/firebase')
const pool = require('../Server/mySql')
const Razorpay = require('razorpay');
const Pay = require('./rejorPay.json')

const makePayment = async(req, res) => {
    console.log(req.body)
    if (!req.body.amount) {
        res.send({ message: 'please declare amount' })
        res.end()
        return
    }
    try {
        const instance = new Razorpay({
            key_id: Pay.key_id,
            key_secret: Pay.key_secret,
          });
        const options = {
            amount: req.body.amount,
            currency: "INR"
        }
        const order=await instance.orders.create(options)
        if(!order) return res.status(500).send("Problem in creating orders")
        res.send(order) 
    } catch (err) {
        res.send({ message: err.code })
        res.end()
    }
}

module.exports = makePayment