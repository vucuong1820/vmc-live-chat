import { Avatar, Menu, Typography } from "antd";
import React, { useContext } from "react";
import { AppContext } from "../../../../Context/AppProvider";
import "./RoomList.scss";

RoomList.propTypes = {};

function RoomList(props) {
  const { rooms } = useContext(AppContext)
  const { Text } = Typography;

  return (
    <Menu style={{ border: "none" }} className="mess__list">
      {rooms.map((item, index) => (
        <Menu.Item key={index} className="mess__item">
          <Avatar
            size="large"
            className="mess__img"
            src={item?.photoURL || "https://cdn.tgdd.vn/Files/2021/12/10/1403714/loimess1_1280x720-800-resize.jpg"}
          />
          <Text className="mess__text">{item.description} </Text>
        </Menu.Item>
      ))}
    </Menu>
  );
}

export default RoomList;
