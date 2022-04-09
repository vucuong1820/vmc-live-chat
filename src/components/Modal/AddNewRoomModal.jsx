import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Modal, Upload } from "antd";
import React, { useContext } from "react";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { addDocumentWithAutoId } from "../../firebase/service";
AddNewRoomModal.propTypes = {};

function AddNewRoomModal(props) {
  const { isShowAddGroupModal, setIsShowAddGroupModal } = useContext(AppContext);
  const [form] = Form.useForm();
  const { user } = useContext(AuthContext);
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const formData = {
        ...values,
        photoURL: values?.photoURL?.[0]?.thumbUrl || '',
        members: [user.uid],
      };
      addDocumentWithAutoId("rooms", formData);
      setIsShowAddGroupModal(false);
      form.resetFields();
    } catch (error) {
      console.log("Failed to add new group chat:", error);
    }
  };

  const handleCancel = () => {
    setIsShowAddGroupModal(false);
  };
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Modal
      title="Thêm nhóm chat mới"
      visible={isShowAddGroupModal}
      onOk={handleOk}
      onCancel={handleCancel}
      centered
    >
      <Form layout="vertical" form={form} style={{ width: "100%" }}>
        <Form.Item
          name="name"
          label="Tên nhóm chat"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Nhập tên nhoms chat..." />
        </Form.Item>
        <Form.Item name="description" label="Tiêu đề">
          <Input.TextArea placeholder="Nhập tiêu đề..." />
        </Form.Item>
        <Form.Item
          name="photoURL"
          label="Ảnh đại diện"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload listType="picture-card" beforeUpload={() => false}>
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddNewRoomModal;
