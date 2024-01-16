import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_CRUD_API_KEY,
    authDomain: process.env.REACT_APP_CRUD_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_CRUD_PROJECT_ID,
    storageBucket: process.env.REACT_APP_CRUD_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_CRUD_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_CRUD_APP_ID
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
