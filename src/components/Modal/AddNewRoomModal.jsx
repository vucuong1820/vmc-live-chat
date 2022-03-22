import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Modal, Upload } from "antd";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { Form, Input, Button, Checkbox } from "antd";
import { addDocumentWithAutoId } from "../../firebase/service";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
AddNewRoomModal.propTypes = {};

function AddNewRoomModal(props) {
  const { isShowAddModal, setIsShowAddModal } = useContext(AppContext);
  const [form] = Form.useForm();
  const { user } = useContext(AuthContext);
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const formData = {
        ...values,
        photoURL: values.photoURL[0].thumbUrl,
        members: [user.uid],
      };
      console.log(formData)
      addDocumentWithAutoId("rooms", formData);
      setIsShowAddModal(false);
      form.resetFields();
    } catch (error) {
      console.log("Failed to submit form:", error);
    }
  };

  const handleCancel = () => {
    setIsShowAddModal(false);
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
      visible={isShowAddModal}
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
