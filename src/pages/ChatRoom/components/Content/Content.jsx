import {
  PictureFilled,
  SmileFilled,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Avatar,
  Col,
  Form,
  Input,
  Row,
  Tooltip,
  Typography,
  Upload,
} from "antd";
import React, { useContext, useState } from "react";
import useResizeObserver from "use-resize-observer";
import InviteMemberModal from "../../../../components/Modal/InviteMemberModal";
import { AppContext } from "../../../../Context/AppProvider";
import { AuthContext } from "../../../../Context/AuthProvider";
import { addDocumentWithAutoId } from "../../../../firebase/service";
import useFirestore from "../../../../hooks/useFirestore";
import Message from "../Message";
import "./Content.scss";
import Picker from "emoji-picker-react";
Content.propTypes = {};

function Content(props) {
  const [inputHeight, setInputHeight] = useState(0);
  const [form] = Form.useForm();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { ref } = useResizeObserver({
    onResize: ({ width, height }) => {
      setInputHeight(height);
    },
  });
  const { Text } = Typography;
  const [inputValue, setInputValue] = useState("123");
  const [formData, setFormData] = useState({});
  const { user } = useContext(AuthContext);
  const { selectedRoom, membersInSelectedRoom, setIsShowAddMemberModal } =
    useContext(AppContext);
  const condition = React.useMemo(
    () => ({
      fieldName: "roomId",
      operator: "==",
      compareValue: selectedRoom.id,
    }),
    [selectedRoom.id]
  );
  const messageList = useFirestore("messages", condition);
  if (Object.keys(selectedRoom).length === 0) {
    return (
      <Alert
        style={{ display: "flex", alignItems: "center" }}
        message="Room chat không khả dụng"
        description="Vui lòng chọn room chat bên trái"
        type="info"
        showIcon
      />
    );
  }
  const handleSubmit = () => {
    if(form.getFieldValue("text") || (form.getFieldValue("picture") && form.getFieldValue("picture").length > 0)){
      addDocumentWithAutoId("messages", {
        text: form.getFieldValue("text") ?? '' ,
        pictureURL:form.getFieldValue("picture") && form.getFieldValue("picture").length > 0 ? form.getFieldValue("picture")?.[0]?.thumbUrl : '',
        roomId: selectedRoom.id,
        displayName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
      });
      setInputValue("");
      
    }
    
    // console.log({
    //   text: form.getFieldValue("text")?.trim(),
    //   pictureURL: form.getFieldValue("picture")?.[0]?.thumbUrl,
    //   roomId: selectedRoom.id,
    //   displayName: user.displayName,
    //   photoURL: user.photoURL,
    //   uid: user.uid,
    // })
    // console.log(form.getFieldValue("text"))
    // console.log(form.getFieldValue("picture").length > 0)

  };
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const onEmojiClick = (event, emojiObject) => {
    form.setFieldsValue({
        text: form.getFieldValue("text") + emojiObject.emoji
    })
  };
  console.log(form.getFieldValue("picture"))
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
      <Row
        
        className="content-message-list"
      >
        {messageList.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </Row>
      <Row className="content__input" ref={ref}>
        {/* <div className="input-box"> */}
        <Form form={form} className="form-msg">
          <Form.Item
            name="picture"
            className="form-msg__picture"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false}
            >
              <PictureFilled className="form-msg__icon " />
            </Upload>
          </Form.Item>

          <Form.Item className="form-msg__emoji">
            <SmileFilled
              className="form-msg__icon"
              style={{ marginRight: "8px" }}
              onClick={() => setShowEmojiPicker((val) => !val)}
            />
            {showEmojiPicker && (
              <Picker
                disableSearchBar
                disableSkinTonePicker
                onEmojiClick={onEmojiClick}
                pickerStyle={{ position: "absolute", top: "-340px" }}
              />
            )}
          </Form.Item>

          <Form.Item name="text" className="form-msg__input">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onPressEnter={handleSubmit}
              className="input-text"
            />
          </Form.Item>

          <Form.Item>
            <span
              onClick={handleSubmit}
              className="form-msg__send form-msg__icon"
            >
              <i className="fi fi-ss-paper-plane"></i>
            </span>
          </Form.Item>
        </Form>
      </Row>
    </div>
  );
}

export default Content;
