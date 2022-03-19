import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Col, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import "./Message.scss"

Message.propTypes = {
    
};

function Message(props) {
    return (
        <Row className="message-item">
            <Col span={1} className="message-item__img">
                <Avatar src="https://pickaface.net/gallery/avatar/unr_test_180612_1021_b05p.png"/>
            </Col>
            <Col span={23} className="message-item__body" >
                <div>
                    <Text className="message-item__name">Tên</Text>
                    <Text className="message-item__time">Today at 8:09 PM</Text>
                </div>
                <Text className="message-item__info">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
            </Col>
        </Row>
    );
}

export default Message;