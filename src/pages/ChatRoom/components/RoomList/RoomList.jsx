import React from "react";
import PropTypes from "prop-types";
import { Avatar, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import "./RoomList.scss";

RoomList.propTypes = {};

function RoomList(props) {
  const { Text } = Typography;
  const array = [1, 2, 3, 4];
  return (
    <Menu style={{ border: "none" }} className="mess__list">
      {array.map((item, index) => (
        <Menu.Item key={index} className="mess__item">
          <Avatar
            size="large"
            className="mess__img"
            src="https://cdn.tgdd.vn/Files/2021/12/10/1403714/loimess1_1280x720-800-resize.jpg"
          />
          <Text className="mess__text">Tin nhắn </Text>
        </Menu.Item>
      ))}
    </Menu>
  );
}

export default RoomList;
