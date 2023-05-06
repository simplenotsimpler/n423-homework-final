import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

//TODO: add try/catch to catch quota, etc. errors
const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const db = app.firestore();

//make sure Google has been added as auth provider in Firebase Authentication

export const googleProvider = new firebase.auth.GoogleAuthProvider();

export default app;
