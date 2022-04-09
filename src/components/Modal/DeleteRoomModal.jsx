import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";
import { AppContext } from "../../Context/AppProvider";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

DeleteRoomModal.propTypes = {};

function DeleteRoomModal({ roomDelete }) {
  const { showDeleteRoomModal, setShowDeleteRoomModal } =
    useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const handleOk = async () => {
    setIsLoading(true);

    await deleteDoc(doc(db, "rooms", roomDelete));
    setShowDeleteRoomModal(false);
    setIsLoading(false);
  };
  return (
    <Modal
      confirmLoading={isLoading}
      title="Xóa room chat"
      visible={showDeleteRoomModal}
      onCancel={() => setShowDeleteRoomModal(false)}
      onOk={handleOk}
    >
      <p>Bạn có chắc chắc muốn xóa phòng này?</p>
    </Modal>
  );
}

export default DeleteRoomModal;
