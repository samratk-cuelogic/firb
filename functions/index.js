
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });



// admin.initializeApp();
// admin.initializeApp(functions.config().firebase);
let serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://test-855555.firebaseio.com"
  });


let db = admin.firestore();

let docRef = db.collection('cmsdb').doc('2');

let setAda = docRef.set({
  first: '2Ada',
  last: '2Lovelace',
  born: 1815
});

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.app = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const original = "HELLO"; //req.query.text || "HELLO";
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    const snapshot = await admin.database().ref('/cmsdb').push({original: original});
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    res.send(original);
   // res.redirect(303, snapshot.ref.toString());
  }); 
