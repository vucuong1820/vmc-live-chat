import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, Drawer, Menu, Row } from "antd";
import { Link } from "react-router-dom";
import {
  FacebookFilled,
  GoogleCircleFilled,
  
  InstagramFilled,
  
  MenuOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import "./Header.less";
import Text from "antd/lib/typography/Text";
Header.propTypes = {};

function Header(props) {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <Row className="header">
      <Col lg={8} md={8} sm={24} xs={24}>
        <Row style={{display: 'flex'}}>
          <Col lg={0} md={0} sm={4} xs={4} className="menu-sidebar">
            <Button style={{border: 'none'}} type="ghost" onClick={() => setShowSidebar(!showSidebar)}>
              <MenuOutlined style={{color: 'white'}}/>
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
                <Menu.Item  key="1" icon={<FacebookFilled style={{fontSize: '20px'}}/>}>Facebook</Menu.Item>
                <Menu.Item  key="2" icon={<GoogleCircleFilled style={{fontSize: '20px'}}/>}>Google</Menu.Item>
                <Menu.Item  key="3" icon={<InstagramFilled style={{fontSize: '20px'}}/>}>Instagram</Menu.Item>

              </Menu>
            </Drawer>
          </Col>

          <Col lg={24} md={24} sm={20} xs={20} className="logo-group">
            <Link to="/home" className="logo">
              <MessageOutlined className="logo__icon" />
              <Text className="logo__title">
                Realtime Chat App
              </Text>
            </Link>
          </Col>
        </Row>
      </Col>

      <Col lg={16} md={16} sm={0} xs={0} className="menu">
        <Menu mode="horizontal" className="menu--default">
          <Menu.Item>Facebook</Menu.Item>
          <Menu.Item>Google</Menu.Item>
          <Menu.Item>Gmail</Menu.Item>
        </Menu>
      </Col>
    </Row>
  );
}

export default Header;
