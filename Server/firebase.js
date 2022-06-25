const { initializeApp }= require("firebase/app");
const { getAnalytics }= require("firebase/analytics");
const {getAuth}= require("firebase/auth")

const firebaseConfig = {
  apiKey: "AIzaSyBvuf1GNToP4vZgVZz-kkUTpqcJhtgS-ec",
  authDomain: "info-smira.firebaseapp.com",
  projectId: "info-smira",
  storageBucket: "info-smira.appspot.com",
  messagingSenderId: "686443341701",
  appId: "1:686443341701:web:5a45d19a2c70dce6ed46ec",
  measurementId: "G-H009KB00RS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);



module.exports = {
  firebaseApp: app,
  auth: auth,
}
