const admin = require("firebase-admin");
const { getMessaging } =require('firebase-admin/messaging');
const serviceAccount = require('./info-smira-firebase-adminsdk-vo8qu-aeb498816c.json')

const app=admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
const messaging =getMessaging()
module.exports = messaging