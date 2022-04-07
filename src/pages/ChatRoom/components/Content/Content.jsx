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
import Picker from "emoji-picker-react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useContext, useState } from "react";
import useResizeObserver from "use-resize-observer";
import InviteMemberModal from "../../../../components/Modal/InviteMemberModal";
import { AppContext } from "../../../../Context/AppProvider";
import { AuthContext } from "../../../../Context/AuthProvider";
import { storage } from "../../../../firebase/config";
import { addDocumentWithAutoId } from "../../../../firebase/service";
import useFirestore from "../../../../hooks/useFirestore";
import Message from "../Message";
import Marquee from "react-fast-marquee";
import "./Content.scss";
Content.propTypes = {};

function Content(props) {
  const [inputHeight, setInputHeight] = useState(0);
  const [form] = Form.useForm();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { ref: inputRef } = useResizeObserver({
    onResize: ({ width, height }) => {
      setInputHeight(height);
    },
  });
  const { Text } = Typography;
  const [inputValue, setInputValue] = useState("123");
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
  const [messageList, isLoading] = useFirestore("messages", condition);
  console.log({membersInSelectedRoom})
  if (Object.keys(selectedRoom).length === 0) {
    return (
      <Alert
        style={{ display: "flex", alignItems: "center" }}
        message="Room chat không khả dụng"
        description={
          <Marquee speed={50} pauseOnHover gradient={false}>
            Room chat không khả dụng, vui lòng chọn một room chat bên trái
          </Marquee>
        }
        type="info"
        showIcon
      />
    );
  }
  const handleSubmit = async () => {
    const imgFileList = form.getFieldValue("picture");
    if (Array.isArray(imgFileList) && imgFileList.length > 0) {
      imgFileList.forEach((imgFile) => {
        console.log(imgFile.originFileObj);
        uploadImgToStorage(imgFile.originFileObj);
      });
      return;
    }

    if (form.getFieldValue("text")) {
      addDocumentWithAutoId("messages", {
        text: form.getFieldValue("text") ?? "",
        roomId: selectedRoom.id,
        displayName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
      });
      form.resetFields();
      return;
    }
  };

  const uploadImgToStorage = (imgFile) => {
    const storageRef = ref(storage, `images/${imgFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imgFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log({ error });
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("done");
          addDocumentWithAutoId("messages", {
            text: form.getFieldValue("text") ?? "",
            pictureURL: downloadURL,
            roomId: selectedRoom.id,
            displayName: user.displayName,
            photoURL: user.photoURL,
            uid: user.uid,
          });
          form.resetFields();
        });
      }
    );
  };

  const onEmojiClick = (event, emojiObject) => {
    form.setFieldsValue({
      text: form.getFieldValue("text")
        ? form.getFieldValue("text") + emojiObject.emoji
        : emojiObject.emoji,
    });
    setShowEmojiPicker(false);
  };

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
        style={{
          height: `calc(100vh - 110px - ${inputHeight ?? "62"}px - 76px)`,
        }}
        className="content-message-list"
      >
        {[...messageList].reverse().map((message, index) => (
          <Message key={index} message={message} isLoading={isLoading} />
        ))}
      </Row>
      <Row className="content__input" ref={inputRef}>
        {/* <div className="input-box"> */}
        <Form form={form} className="form-msg">
          <Form.Item
            name="picture"
            className="form-msg__picture"
            getValueFromEvent={(e) => {
              if (Array.isArray(e.fileList) && e.fileList.length > 0)
                return e.fileList;
            }}
          >
            <Upload
              beforeUpload={() => false}
              listType="picture-card"
              accept="image/*"
              className="upload-img"
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

export default React.memo(Content);
