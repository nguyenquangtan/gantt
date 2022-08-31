// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2x1b5l4yytm4fGPpMA9f36MawStHdYkE",
  authDomain: "callen-dar-ccvq.firebaseapp.com",
  projectId: "callen-dar-ccvq",
  storageBucket: "callen-dar-ccvq.appspot.com",
  messagingSenderId: "840225438585",
  appId: "1:840225438585:web:8809d2e10e3d7f15910da8",
  measurementId: "G-LGPZ1B7KFP",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const auth = firebase.auth();

export { auth, db };