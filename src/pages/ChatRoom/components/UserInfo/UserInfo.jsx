import { PlusCircleOutlined } from "@ant-design/icons";
import { Avatar, Col, Row, Typography } from "antd";
import React, { useContext } from "react";
import "./UserInfo.scss";
import { AuthContext } from "../../../../Context/AuthProvider";
import { AppContext } from "../../../../Context/AppProvider";

const { Text } = Typography;
UserInfo.propTypes = {};

function UserInfo(props) {
  const { user } = useContext(AuthContext)
  const { setIsShowAddModal } = useContext(AppContext)
  const handleClick = () => {
    setIsShowAddModal(true)
  };
  return (
      <Row className="user">
        <Col lg={6} md={8} sm={16} xs={24}>
          <Avatar size="large" src={user?.photoURL || ''} className="user__avt" />
        </Col>

        <Col lg={14} md={10} sm={0} xs={0}>
          <Text className="user__name">{user.displayName}</Text>
        </Col>

        <Col lg={4} md={6} sm={8} xs={24}>
          <PlusCircleOutlined onClick={handleClick} className="user__add-icon" />
        </Col>
      </Row>
  );
}

export default UserInfo;
