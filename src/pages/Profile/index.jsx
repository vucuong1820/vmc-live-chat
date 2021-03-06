import React, { useContext } from "react";
import PropTypes from "prop-types";
import "./UserProfile.less";
import { Divider, Image, Row, Descriptions, Typography } from "antd";
import {ManOutlined} from "@ant-design/icons";
import { AuthContext } from "../../Context/AuthProvider";
import { auth } from "../../firebase/config"
UserProfile.propTypes = {};

function UserProfile(props) {
const { user } = useContext(AuthContext)
console.log({user})
const { displayName, email, uid, providerId} = user
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
            src={user?.photoURL || "https://via.placeholder.com/200?text=Image+is+not+available"}
            alt={displayName}
          >
            {user?.photoURL ? '' : user?.displayName?.[0]?.toUpperCase()}
          </Image>
          <Typography.Title className="user-title" level={3}>
            {displayName}
            <ManOutlined style={{marginLeft: '8px'}} />
          </Typography.Title>

        <Descriptions bordered >
          <Descriptions.Item labelStyle={labelStyle} contentStyle={contentStyle} span={3} label="Tên tài khoản">{displayName}</Descriptions.Item>
          <Descriptions.Item labelStyle={labelStyle} contentStyle={contentStyle} span={3} label="Địa chỉ email">{email}</Descriptions.Item>
          <Descriptions.Item labelStyle={labelStyle} contentStyle={contentStyle} span={3} label="Loại tài khoản">
            {
              providerId === 'google.com' && 'Liên kết Google'
            }
            {
              providerId === 'password' && 'Đăng ký bằng email, mật khẩu'
            }
          </Descriptions.Item>
          <Descriptions.Item labelStyle={labelStyle} contentStyle={contentStyle} span={3} label="UID">{uid}</Descriptions.Item>
        </Descriptions>

        </div>
      </Row>
    </div>
  );
}

export default UserProfile;
