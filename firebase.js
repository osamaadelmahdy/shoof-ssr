import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAS3KYoOstjAeKv4qdsSYehRI7eezJDVpQ",
  authDomain: "shoof-doctor-staging.firebaseapp.com",
  databaseURL: "https://shoof-doctor-staging-default-rtdb.firebaseio.com",
  projectId: "shoof-doctor-staging",
  storageBucket: "shoof-doctor-staging.appspot.com",
  messagingSenderId: "325831426037",
  appId: "1:325831426037:web:f74cb6cf7243a862732abc",
  measurementId: "G-PLR3Z1RRN1",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
