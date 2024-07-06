// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCa1TSEbd1lYIdL81xMARmLVDnXt1y9RT4",
  authDomain: "my-app2-58cb9.firebaseapp.com",
  projectId: "my-app2-58cb9",
  storageBucket: "my-app2-58cb9.appspot.com",
  messagingSenderId: "548958807141",
  appId: "1:548958807141:web:a236fd9b2c3ef40688928c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, app, storage };
