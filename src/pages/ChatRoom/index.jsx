import { Col, Row } from "antd";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddNewRoomModal from "../../components/Modal/AddNewRoomModal";
import { AuthContext } from "../../Context/AuthProvider";
import "./ChatRoom.scss";
import Content from "./components/Content/Content";
import Sidebar from "./Sidebar";
ChatRoom.propTypes = {};

function ChatRoom(props) {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
      if(!user){
        navigate("/home")
      }
  },[user,navigate])
  return (
    <div className="chat-room">
      <Row>
        <Col
          lg={6}
          md={6}
          sm={6}
          xs={4}
          style={{ borderRight: "solid 1px rgba(229,229,229,1)" }}
        >
          <Sidebar />
        </Col>
        <Col lg={18} md={18} sm={18} xs={20}>
          <Content />
        </Col>
      </Row>

      <AddNewRoomModal/>
    </div>
  );
}

export default ChatRoom;
