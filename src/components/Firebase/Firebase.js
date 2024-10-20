
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCsQTBr7DjH0lIUpINLEX0lGaKPV3ljRDw",
  authDomain: "recepie-app-8ccc3.firebaseapp.com",
  projectId: "recepie-app-8ccc3",
  storageBucket: "recepie-app-8ccc3.appspot.com",
  messagingSenderId: "1031478177167",
  appId: "1:1031478177167:web:a11fa2559d18016289affa",
  measurementId: "G-JGVX42HFNM",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth,db };
