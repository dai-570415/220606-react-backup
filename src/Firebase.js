import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCE8_LxkjbI9gs_TJgbGlvyWaDDwu0f1Jc",
    authDomain: "react-image-sample.firebaseapp.com",
    databaseURL: "https://react-image-sample.firebaseio.com",
    projectId: "react-image-sample",
    storageBucket: "react-image-sample.appspot.com",
    messagingSenderId: "65288193828",
    appId: "1:65288193828:web:f6eb59239c87c55b6ed5b1",
    measurementId: "G-M4D0W10MQQ"
};

firebase.initializeApp(firebaseConfig);

export const providerFacebook = new firebase.auth.FacebookAuthProvider();
export const providerGoogle = new firebase.auth.GoogleAuthProvider();
export const providerTwitter = new firebase.auth.TwitterAuthProvider();
export const db = firebase.firestore();
export const storage = firebase.storage();
export default firebase;