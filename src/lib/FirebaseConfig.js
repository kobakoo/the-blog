// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.STORAGE_ACCESS_KEY,
  authDomain: "blog-kobako.firebaseapp.com",
  projectId: "blog-kobako",
  storageBucket: "blog-kobako.appspot.com",
  messagingSenderId: "973060070267",
  appId: "1:973060070267:web:5b5c28ceb2e658ee503bde",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
