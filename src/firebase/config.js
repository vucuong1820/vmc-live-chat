import { initializeApp } from 'firebase/app'
import * as firebase from 'firebase/app'
import { getAnalytics } from 'firebase/analytics';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { getStorage, connectStorageEmulator } from "firebase/storage";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: "vmc-live-chat.appspot.com",
  messagingSenderId: "128301635748",
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: "G-3JZL70L2ZD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth()
// connectAuthEmulator(auth, "http://localhost:9099")

const db = getFirestore()
// connectFirestoreEmulator(db,"localhost",4001 )

const storage= getStorage()
// connectStorageEmulator(storage, "localhost", 9199);

export { auth, db, storage };