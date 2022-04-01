import { initializeApp } from 'firebase/app'
import * as firebase from 'firebase/app'
import { getAnalytics } from 'firebase/analytics';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { getStorage, connectStorageEmulator } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyB0tPqYd6QlD-qlBgZVvUddY8jtqBuhepg",
  authDomain: "vmc-live-chat.firebaseapp.com",
  projectId: "vmc-live-chat",
  storageBucket: "vmc-live-chat.appspot.com",
  messagingSenderId: "128301635748",
  appId: "1:128301635748:web:17db17f6c58ae46f3b6e31",
  measurementId: "G-3JZL70L2ZD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth()
connectAuthEmulator(auth, "http://localhost:9099")

const db = getFirestore()
connectFirestoreEmulator(db,"localhost",4001 )

const storage= getStorage()
// connectStorageEmulator(storage, "localhost", 9199);

export { auth, db, storage };