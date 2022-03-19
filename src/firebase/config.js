import { initializeApp } from 'firebase/app'
import * as firebase from 'firebase/app'
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore/lite'
import { getAuth } from 'firebase/auth'


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
const db = getFirestore()

export {auth, db};