const admin = require('firebase-admin');
const dotenv = require('dotenv');
dotenv.config();

const serviceAccount = require('../config/workshop-management-faa1e-firebase-adminsdk-fbsvc-177ce492d3.json'); // Add your Firebase service account JSON file

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DB_URL,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

module.exports = admin;
