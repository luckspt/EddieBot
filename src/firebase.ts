import * as firebase from 'firebase-admin';
import {log} from "./logger";

const config = require('./config');

console.log("console1", config.isDevelopment());
console.log("console1", process.env.NODE_ENV);

// Providing a path to a service account key JSON file
firebase.initializeApp({
    credential: firebase.credential.cert({
        "privateKey": process.env.FIREBASE_PRIVATE_KEY,
        "projectId": process.env.FIREBASE_PROJECT_ID,
        "clientEmail": process.env.FIREBASE_CLIENT_EMAIL,
    }),

    "databaseURL": process.env.FIREBASE_DATABASE_URL,
});

// Use local Firestore Emulator database instead
if (config.isDevelopment()) {
    firebase.firestore().settings({
        host: "localhost:8080",
        ssl: false
    });
}

// Log useful information if in development mode.
config.isDevelopment() ? log.info('Using Local DB') : log.warn(`Using Production Database`);

export const db = firebase.firestore();