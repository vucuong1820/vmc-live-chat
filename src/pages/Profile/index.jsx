import React, { useContext } from "react";
import PropTypes from "prop-types";
import "./UserProfile.less";
import { Divider, Image, Row, Descriptions, Typography } from "antd";
import {ManOutlined} from "@ant-design/icons";
import { AuthContext } from "../../Context/AuthProvider";
UserProfile.propTypes = {};

function UserProfile(props) {
const { user } = useContext(AuthContext)
const { displayName, email, uid} = user
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
            src="https://scontent.fhan14-1.fna.fbcdn.net/v/t1.6435-9/121830457_1790240987791308_7349338665846521305_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=eNUXEtTID-AAX8y6XKA&tn=Bl3v2Yltc-fjfWhX&_nc_ht=scontent.fhan14-1.fna&oh=00_AT9VjTpzRnJjpSRaVKpsRaEc1yIBvI6lEJgOJB7YryiqhA&oe=626BE7B7"
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
