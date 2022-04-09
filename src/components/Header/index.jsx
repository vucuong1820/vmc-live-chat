import {
  CommentOutlined, LogoutOutlined,
  MenuOutlined,
  MessageOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Button, Col, Drawer, Menu, Row } from "antd";
import Text from "antd/lib/typography/Text";
import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import "./Header.less";
Header.propTypes = {};

function Header(props) {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/home");
      setShowSidebar(false);
    } catch (error) {
      console.log("Failed to logout:", error);
    }
  };
  return (
    <Row className="header">
      <Col lg={8} md={8} sm={24} xs={24}>
        <Row style={{ display: "flex" }}>
          <Col lg={0} md={0} sm={4} xs={4} className="menu-sidebar">
            <Button
              style={{ border: "none" }}
              type="ghost"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <MenuOutlined style={{ color: "white" }} />
            </Button>

            <Drawer
              title="Đăng nhập"
              placement="left"
              closable={false}
              onClose={() => setShowSidebar(false)}
              visible={showSidebar}
              key="left"
              width="75%"
            >
              <Menu mode="inline" className="menu-sidebar__list">
                <Menu.Item
                  onClick={() => setShowSidebar(false)}
                  key="1"
                  icon={<UserOutlined style={{ fontSize: "20px" }} />}
                >
                  <NavLink to="/profile">Profile</NavLink>
                </Menu.Item>
                <Menu.Item
                  onClick={() => setShowSidebar(false)}
                  key="2"
                  icon={<CommentOutlined style={{ fontSize: "20px" }} />}
                >
                  <NavLink to="/chat-room">Chat Room</NavLink>
                </Menu.Item>
                <Menu.Item
                  onClick={handleSignOut}
                  key="4"
                  icon={<LogoutOutlined style={{ fontSize: "20px" }} />}
                >
                  Đăng xuất
                </Menu.Item>
              </Menu>
            </Drawer>
          </Col>

          <Col lg={24} md={24} sm={20} xs={20} className="logo-group">
            <Link to="/chat-room" className="logo">
              <MessageOutlined className="logo__icon" />
              <Text className="logo__title">Realtime Chat App</Text>
            </Link>
          </Col>
        </Row>
      </Col>

      <Col lg={16} md={16} sm={0} xs={0} className="menu">
        <Menu selectable={false} mode="horizontal" className="menu--default">
          <Menu.Item key="1">
            <Link to="/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/chat-room">Chat Room</Link>
          </Menu.Item>
          <Menu.Item key="4" onClick={handleSignOut}>
            Đăng xuất
          </Menu.Item>
        </Menu>
      </Col>
    </Row>
  );
}

export default Header;
