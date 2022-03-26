import {
  PictureFilled,
  SmileFilled,
  UsergroupAddOutlined
} from "@ant-design/icons";
import { Alert, Avatar, Col, Input, Row, Tooltip, Typography } from "antd";
import React, { useContext, useState, useMemo } from "react";
import InviteMemberModal from "../../../../components/Modal/InviteMemberModal";
import { AppContext } from "../../../../Context/AppProvider";
import { AuthContext } from "../../../../Context/AuthProvider"
import { addDocumentWithAutoId } from "../../../../firebase/service";
import Message from "../Message";
import useFirestore from "../../../../hooks/useFirestore"
import "./Content.scss";
Content.propTypes = {};

function Content(props) {
  const { Text } = Typography;
  const [inputValue, setInputValue] = useState('');
  const { user } = useContext(AuthContext)
  const { selectedRoom, membersInSelectedRoom, setIsShowAddMemberModal } =
    useContext(AppContext);
    const condition = React.useMemo(
      () => ({
        fieldName: 'roomId',
        operator: '==',
        compareValue: selectedRoom.id,
      }),
      [selectedRoom.id]
    );
  
    const messageList = useFirestore('messages', condition);
  if (Object.keys(selectedRoom).length === 0) {
    return (
      <Alert
        style={{display: 'flex',alignItems: 'center'}}
        message="Room chat không khả dụng"
        description="Vui lòng chọn room chat bên trái"
        type="info"
        showIcon
      />
    );
  }
  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  } 
  const handleSubmit = () => {
    addDocumentWithAutoId('messages', {
      text: inputValue,
      roomId: selectedRoom.id,
      displayName: user.displayName,
      photoURL: user.photoURL,
      uid: user.uid
    })
    setInputValue('')
  }
  

  return (
    <div className="content">
      <Row className="content-header">
        <Col lg={2} md={3} sm={6} xs={6} className="content-header__img">
          <Avatar size="large" src={selectedRoom?.photoURL}>
            {selectedRoom?.photoURL
              ? ""
              : selectedRoom?.name?.[0].toUpperCase()}
          </Avatar>
        </Col>
        <Col lg={16} md={15} sm={12} xs={10} className="content-header__title">
          <Text strong>{selectedRoom?.name}</Text>
          <Text>{selectedRoom?.description}</Text>
        </Col>
        <Col lg={6} md={6} sm={6} xs={8} className="content-header__members">
          <UsergroupAddOutlined
            onClick={() => setIsShowAddMemberModal(true)}
            className="content-header__add-members"
          />
          <InviteMemberModal />
          <Avatar.Group maxCount={2} size="large">
            {membersInSelectedRoom.map((member) => (
              <Tooltip title={member.displayName} key={member.uid}>
                <Avatar src={member.photoURL}>
                  {member?.photoURL
                    ? ""
                    : member?.displayName?.[0]?.toUpperCase()}
                </Avatar>
              </Tooltip>
            ))}
          </Avatar.Group>
        </Col>
      </Row>
      <Row className="content-message-list">
        {messageList.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </Row>
      <Row className="content__input">
        <div className="input-box">
          <PictureFilled className="input-box__icon" />
          <SmileFilled
            className="input-box__icon"
            style={{ marginRight: "8px" }}
          />
          <Input value={inputValue} onChange={handleInputChange} onPressEnter={handleSubmit} className="input-box__data" />
          <span onClick={handleSubmit} className="input-box__send">
            <i className="fi fi-ss-paper-plane"></i>
          </span>
        </div>
      </Row>
    </div>
  );
}

export default Content;
