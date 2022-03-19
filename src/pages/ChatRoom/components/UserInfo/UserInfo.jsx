import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Typography, Space } from 'antd';
import {UsergroupAddOutlined } from "@ant-design/icons"
import "./UserInfo.scss"
const { Text } = Typography;
UserInfo.propTypes = {
    
};

function UserInfo(props) {
    return (
        <div className="user">
            <Avatar size="large" icon={<UserOutlined/>} className="user__avt"/>
            <Text className="user__name">Username</Text>
            <UsergroupAddOutlined className="user__icon"/>
        </div>
    );
}

export default UserInfo;