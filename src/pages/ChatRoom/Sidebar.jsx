import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Space } from "antd";
import UserInfo from "./components/UserInfo/UserInfo";
import RoomList from "./components/RoomList/RoomList";

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
