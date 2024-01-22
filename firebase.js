import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCoCXPDrcyrkgXIiNXr6L_Q_vZjFllvAFw",
  authDomain: "shoof-ssr.firebaseapp.com",
  projectId: "shoof-ssr",
  storageBucket: "shoof-ssr.appspot.com",
  messagingSenderId: "1014024251125",
  appId: "1:1014024251125:web:b79cb4266043ae2a9747bc",
  measurementId: "G-ZV4TMD0PV7",
};
const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
