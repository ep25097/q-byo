import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBYO70WniJZfqZgZOrOCMWqe79rw5YPxvM",
  authDomain: "test-q-426c0.firebaseapp.com",
  projectId: "test-q-426c0",
  storageBucket: "test-q-426c0.firebasestorage.app",
  messagingSenderId: "953857590205",
  appId: "1:953857590205:web:64ea7b1fd3bf41b38148d4"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);