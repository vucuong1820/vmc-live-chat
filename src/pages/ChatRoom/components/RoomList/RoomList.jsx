import { DeleteOutlined } from "@ant-design/icons";
import { Avatar, Menu, Modal, Skeleton, Typography } from "antd";
import React, { useContext, useState } from "react";
import DeleteRoomModal from "../../../../components/Modal/DeleteRoomModal";
import { AppContext } from "../../../../Context/AppProvider";
import "./RoomList.scss";

RoomList.propTypes = {};

function RoomList(props) {
  const { rooms, setSelectedRoomId, setShowDeleteRoomModal } = useContext(AppContext);
  const [roomDelete, setRoomDelete] = useState("")
  const handleDeleteRoom = (id) => {
    console.log('roomlist:',id)
    setRoomDelete(id)
    setShowDeleteRoomModal(true)

  }
  const { Text } = Typography;
  return (
    <>
    <Menu style={{ border: "none" }} className="group__list">
      { rooms.length > 0 ? (
        rooms.map((item, index) => (
          <Menu.Item key={item.id} onClick={() => setSelectedRoomId(item.id)} className="group__item">
            <Avatar
              size="large"
              className="group__img"
              src={item?.photoURL}
            >{item?.photoURL ? "" : item?.name?.[0]?.toUpperCase()}</Avatar>
            <Text className="group__text">{item.name} </Text>
            <DeleteOutlined onClick={() => handleDeleteRoom(item.id)} className="group__delete-icon" />
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
    <DeleteRoomModal roomDelete={roomDelete} />
    </>
    
    
  );
}

export default RoomList;
