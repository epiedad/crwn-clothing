import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyCozoavCNdVdwaOmp8ZD5Wu3ohEgzRGbAU",
    authDomain: "crwn-db-6d2b2.firebaseapp.com",
    projectId: "crwn-db-6d2b2",
    storageBucket: "crwn-db-6d2b2.appspot.com",
    messagingSenderId: "955121078575",
    appId: "1:955121078575:web:ea339d1ba44c5c5fdbd1da",
    measurementId: "G-S9EEZ9WTNT"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;