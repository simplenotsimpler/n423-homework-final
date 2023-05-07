import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

//google instructions incorrect on the web 8 version
//https://firebase.google.com/docs/storage/web/start#web-version-8
// use compat version
//https://stackoverflow.com/questions/71860557/firebase-compat-app-webpack-imported-module-0-default-storage-is-not-a-functi
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

//TODO: add try/catch to catch quota, etc. errors
const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const db = app.firestore();
export const storageRef = firebase.storage().ref();

//make sure Google has been added as auth provider in Firebase Authentication

export const googleProvider = new firebase.auth.GoogleAuthProvider();

export default app;
