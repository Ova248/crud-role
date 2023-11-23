import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBkf9sxAIZkH-CFBO946MrC8j0pM8Df5vk",
    authDomain: "project-crud-rol.firebaseapp.com",
    projectId: "project-crud-rol",
    storageBucket: "project-crud-rol.appspot.com",
    messagingSenderId: "109076798738",
    appId: "1:109076798738:web:7bd08ab0f80bbebc6267cb"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
