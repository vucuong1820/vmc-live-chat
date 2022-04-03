import { Col, Row } from "antd";
import React from "react";
import RoomList from "./components/RoomList/RoomList";
import UserInfo from "./components/UserInfo/UserInfo";

Sidebar.propTypes = {};

function Sidebar(props) {
  return (
    
      <Row>
        <Col span={24}>
          <UserInfo />
        </Col>
        <Col span={24}>
            <RoomList/>
        </Col>
      </Row>
  );
}

export default Sidebar;
