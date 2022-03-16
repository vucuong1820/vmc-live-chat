import "./App.css";
import "antd/dist/antd.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ChatRoom from "./pages/ChatRoom";
import Header from "./components/Header";

function App() {
  
  return (
    <>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />}  />
        <Route path="/chat-room" element={<ChatRoom />}  />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </>
  );
}

export default App;
