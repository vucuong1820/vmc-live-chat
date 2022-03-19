import "./App.css";
import "antd/dist/antd.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ChatRoom from "./pages/ChatRoom";
import Header from "./components/Header";
import AuthProvider from "./Context/AuthProvider";
import { useRef } from "react";


function App() {

  return (
    <div className="app">
      
      <Header/>
      <Routes>
        <Route path="/home" element={<Home />}  />
        <Route path="/chat-room" element={<ChatRoom />}  />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default App;
