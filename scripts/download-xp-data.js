const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./firebase-key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://unsw-balloon-xp-default-rtdb.asia-southeast1.firebasedatabase.app"
});
const db = getFirestore();

async function getAttendants(alias) {
    const attendantsRef = db.collection("attendant");
    const attendantsSnapshot = await attendantsRef.where('xp_alias', '==', alias).get();
    const attendants = []
    attendantsSnapshot.forEach(doc => attendants.push(Object.assign({ id: doc.id }, doc.data())));
    console.log(attendants);
}

getAttendants('test')
