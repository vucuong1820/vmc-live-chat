import {
  AntDesignOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Col, Row, Tooltip, Typography, Alert } from "antd";
import React, { useContext } from "react";
import { AppContext } from "../../../../Context/AppProvider";
import InputBox from "../Input";
import Message from "../Message";
import "./Content.scss";
import InviteMemberModal from "../../../../components/Modal/InviteMemberModal";
Content.propTypes = {};

function Content(props) {
  const { Text } = Typography;
  const { selectedRoom, membersInSelectedRoom, setIsShowAddMemberModal } =
    useContext(AppContext);
  if (Object.keys(selectedRoom).length === 0) {
    return (
      <Alert
        message="Room chat không khả dụng"
        description="Vui lòng chọn room chat bên trái"
        type="info"
        showIcon
      />
    );
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
        {[1, 2, 3].map((item, index) => (
          <Message key={index} />
        ))}
      </Row>
      <Row className="content__input">
        <InputBox />
      </Row>
    </div>
  );
}

export default Content;
