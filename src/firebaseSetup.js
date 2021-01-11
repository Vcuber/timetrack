import 'firebase/auth';
import firebase from 'firebase/app';
import firebaseConfig from './firebaseConfig';
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const db = firebase.firestore();

const providers = {
    googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export {
    providers,
    firebaseAppAuth,
    db
};