import "./App.css";
import "antd/dist/antd.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ChatRoom from "./pages/ChatRoom";
import Header from "./components/Header";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from './firebase/config'
import { useEffect } from "react";
import UserProfile from "./pages/Profile";

function App() {
  useEffect(() => {
    (async () => {
        try {
        const usersRef = collection(db,'users')
        const q = query(usersRef, where("email","==","mountain..300@example.com"));
        const qSnap = await getDocs(q)
        qSnap.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.data());
          console.log(Boolean(doc.data()))
        });
        } catch (error) {
          console.log(error)
        }
    })()
  },[])

  return (
    <div className="app">
      
      <Header/>
      <Routes>
        <Route path="/home" element={<Home />}  />
        <Route path="/chat-room" element={<ChatRoom />}  />
        <Route path="/profile" element={<UserProfile />}  />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default App;
