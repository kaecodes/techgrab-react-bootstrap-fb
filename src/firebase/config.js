import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: "techgrab-react-bootstrap.firebaseapp.com",
  projectId: "techgrab-react-bootstrap",
  storageBucket: "techgrab-react-bootstrap.appspot.com",
  messagingSenderId: "841490679149",
  appId: "1:841490679149:web:efcaa54327f89bd06e4664",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
