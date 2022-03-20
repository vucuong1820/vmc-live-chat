import React from "react";
import PropTypes from "prop-types";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Typography, Space, Row, Col, Button } from "antd";
import { UsergroupAddOutlined } from "@ant-design/icons";
import "./UserInfo.scss";
import { collection, onSnapshot, getFirestore } from "firebase/firestore";
import { db } from "../../../../firebase/config";

const { Text } = Typography;
UserInfo.propTypes = {};

function UserInfo(props) {
  React.useEffect(() => {

    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))

    });

    
    
  }, [])
  return (
      <Row className="user">
        <Col lg={6} md={8} sm={16} xs={24}>
          <Avatar size="large" icon={<UserOutlined />} className="user__avt" />
        </Col>

        <Col lg={14} md={10} sm={0} xs={0}>
          <Text className="user__name">Username</Text>
        </Col>

        <Col lg={4} md={6} sm={8} xs={24}>
          <UsergroupAddOutlined className="user__add-icon" />
        </Col>
      </Row>
  );
}

export default UserInfo;
