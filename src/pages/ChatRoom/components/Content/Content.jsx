import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Col, Row } from 'antd';
import "./Content.scss"
import Message from '../Message';
import InputBox from '../Input'
Content.propTypes = {
    
};

function Content(props) { 
    return (
        <div className="content">
            <Row className="content-header">  
                <Col lg={2} md={2} sm={6} xs={6} className="content-header__img">
                    <Avatar size="large" src="https://cf.shopee.vn/file/02fe6a694c2f1f1c7e1b10da0ab76c18"/>
                </Col>
                <Col lg={22} md={22} sm={18} xs={18}  className="content-header__title">Title</Col>
            </Row>
            <Row className="content-message-list"> 
                {
                    [1,2,3,4,5,6,7,8,9].map((item,index) => (
                        <Message key={index}/>
                    ))
                }
            </Row>
            <Row className="content__input"> 
                <InputBox />
            </Row>


        </div>
    );
}

export default Content;