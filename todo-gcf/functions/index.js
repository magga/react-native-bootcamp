const admin = require('firebase-admin');
const functions = require('firebase-functions');

const requestOtp = require('./routes/request_otp');
const verifyOtp = require('./routes/verify_otp');

const serviceAccount = require("./secret/firebase_admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://one-time-password-8b1c9.firebaseio.com"  
});

exports.requestOtp = functions.https.onRequest(requestOtp);
exports.verifyOtp = functions.https.onRequest(verifyOtp);
