import { Avatar, Form, Modal, Select } from "antd";
import { doc, updateDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { AppContext } from "../../Context/AppProvider";
import { db } from "../../firebase/config";
AddNewRoomModal.propTypes = {};

function AddNewRoomModal(props) {
  const { Option } = Select;
  const {
    isShowAddMemberModal,
    setIsShowAddMemberModal,
    selectedRoomId,
    selectedRoom,
    memberNotInSelectedRoom
  } = useContext(AppContext);
  const [form] = Form.useForm();
  const [value, setValue] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  console.log({memberNotInSelectedRoom})
  const userList = [...memberNotInSelectedRoom]
  const handleOk = async () => {
    try {
      setIsLoading(true)
      const selectedRoomRef = doc(db, "rooms", selectedRoomId)
      await updateDoc(selectedRoomRef,{
        members: [...selectedRoom.members, ...value]
      })
      setIsShowAddMemberModal(false);
      setIsLoading(false)
      setValue([])
    } catch (error) {
      console.log('Failed to add member to selected room:',error)
    }

  };

  const handleCancel = () => {
    setIsShowAddMemberModal(false);
    setValue([])

  };
  function handleChange(memberAddedId) {
    setValue(memberAddedId)
  }

  return (
    <Modal
      title="Thêm thành viên mới"
      visible={isShowAddMemberModal}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={isLoading}
      centered
    >
      <Form layout="vertical" form={form} style={{ width: "100%" }}>
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Chọn thêm mới thành viên"
          onChange={handleChange}
          optionLabelProp="label"
          value={value}
        >
          {userList.map((member) => (
            <Option
              value={member.uid}
              label={member.displayName}
              key={member.uid}
            >
              <div className="demo-option-label-item">
                <Avatar src={member.photoURL} style={{marginRight: '16px'}}></Avatar>
                {member.displayName}
              </div>
            </Option>
          ))}
        </Select>
      </Form>
    </Modal>
  );
}

export default React.memo(AddNewRoomModal);
