import { Avatar, Col, Image, Row, Spin } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { formatDate } from "../../../../utils";
import "./Message.scss";

Message.propTypes = {};

function Message({ message, isLoading }) {
  const { displayName, photoURL, text, createdAt, pictureURL } = message;
  console.log({message})
  
  if(isLoading) return <Spin size="default"/>
  return (
    <Row className="message-item">
      <Col lg={1} md={2} sm={3} xs={3} className="message-item__img">
        <Avatar src={photoURL}>
          {photoURL ? "" : displayName?.[0]?.toUpperCase()}
        </Avatar>
      </Col>
      <Col  className="message-item__body">
        <div>
          <Text className="message-item__name">{displayName}</Text>
          <Text className="message-item__time">
            {formatDate(createdAt?.seconds)}
          </Text>
        </div>
        <div className="message-item__info">
        {
           text?.length > 0 && (<Text className="message-item__text">{text}</Text>)
        }
        
        {pictureURL && pictureURL?.length > 0 && (<Image width={300} src={pictureURL}/>)  
        }
        </div>
      </Col>
    </Row>
  );
}

export default Message;
