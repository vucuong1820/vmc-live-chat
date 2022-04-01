import { Avatar, Menu, Skeleton, Typography } from "antd";
import React, { useContext } from "react";
import { AppContext } from "../../../../Context/AppProvider";
import "./RoomList.scss";

RoomList.propTypes = {};

function RoomList(props) {
  const { rooms, setSelectedRoomId } = useContext(AppContext)
  const { Text } = Typography;
  return (
    <Menu style={{ border: "none" }} className="mess__list">
      { rooms.length > 0 ? (
        rooms.map((item, index) => (
          <Menu.Item key={item.id} onClick={() => setSelectedRoomId(item.id)} className="mess__item">
            <Avatar
              size="large"
              className="mess__img"
              src={item?.photoURL}
            >{item?.photoURL ? "" : item?.name?.[0]?.toUpperCase()}</Avatar>
            <Text className="mess__text">{item.description} </Text>
          </Menu.Item>         
        ))
      ) : (
        Array.from({length: 5}).map((item, index) =>(
          <div className="skeleton" key={index}>
            <Skeleton active="checked" avatar paragraph={{ rows: 0 }} />
          </div>
        ) )
      )}
    </Menu>
  );
}

export default RoomList;
