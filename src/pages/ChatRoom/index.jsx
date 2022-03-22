import React from "react";
import PropTypes from "prop-types";
import "./ChatRoom.scss";
import { Col, Layout, Row, Space } from "antd";
import Sidebar from "./Sidebar";
import Content from "./components/Content/Content";
import AddNewRoomModal from "../../components/Modal/AddNewRoomModal";

ChatRoom.propTypes = {};

function ChatRoom(props) {
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
