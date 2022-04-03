import React, { useContext } from "react";
import PropTypes from "prop-types";
import "./UserProfile.less";
import { Divider, Image, Row, Descriptions, Typography } from "antd";
import {ManOutlined} from "@ant-design/icons";
import { AuthContext } from "../../Context/AuthProvider";
UserProfile.propTypes = {};

function UserProfile(props) {
const { user } = useContext(AuthContext)
const { displayName, email, uid, photoURL} = user
  const labelStyle = {
     backgroundColor: '#ccc',
     fontWeight: 'bold'
  }
  const contentStyle = {
      color: '#fff'
  }
  return (
    <div className="user-profile">
      <Divider className="user-divider" orientation="center">
        Trang cá nhân
      </Divider>
      <Row span={20} offset={2} justify="center">
        <div className="user-main">
          <Image
            className="user-img"
            width={200}
            src={photoURL}
            alt={displayName}
          />
          <Typography.Title className="user-title" level={3}>
            Vũ Mạnh Cường
            <ManOutlined style={{marginLeft: '8px'}} />
          </Typography.Title>

        <Descriptions bordered >
          <Descriptions.Item labelStyle={labelStyle} contentStyle={contentStyle} span={3} label="Tên tài khoản">{displayName}</Descriptions.Item>
          <Descriptions.Item labelStyle={labelStyle} contentStyle={contentStyle} span={3} label="Địa chỉ email">{email}</Descriptions.Item>
          <Descriptions.Item labelStyle={labelStyle} contentStyle={contentStyle} span={3} label="Loại tài khoản">Google</Descriptions.Item>
          <Descriptions.Item labelStyle={labelStyle} contentStyle={contentStyle} span={3} label="UID">{uid}</Descriptions.Item>
        </Descriptions>

        </div>
      </Row>
    </div>
  );
}

export default UserProfile;
