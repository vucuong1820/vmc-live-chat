import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Col, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import "./Message.scss"
import { formatRelative } from 'date-fns/esm';

Message.propTypes = {
    
};

function Message({ message }) {
    const { displayName, photoURL, text, createdAt } = message
    function formatDate(seconds) {
        let formattedDate = '';
      
        if (seconds) {
          formattedDate = formatRelative(new Date(seconds * 1000), new Date());
      
          formattedDate =
            formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
        }
      
        return formattedDate;
      }
    return (
        <Row className="message-item">
            <Col lg={1} md={2} sm={3} xs={3} className="message-item__img">
                <Avatar src={photoURL}>{photoURL ? '' : displayName?.[0]?.toUpperCase()}</Avatar>
            </Col>
            <Col lg={23} md={22} sm={21} xs={21} className="message-item__body" >
                <div>
                    <Text className="message-item__name">{displayName}</Text>
                    <Text className="message-item__time">{formatDate(createdAt?.seconds)}</Text>
                </div>
                <Text className="message-item__info">{text}</Text>
            </Col>
        </Row>
    );
}

export default Message;