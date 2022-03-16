import React from 'react';
import PropTypes from 'prop-types';
import "./Home.scss"
import { Button, Modal } from 'antd';
import { FacebookFilled } from '@ant-design/icons';
Home.propTypes = {
    
};

function Home(props) {
    return (
        <div className="home">
            <Modal
            className="modal"
            title="Đăng nhập vào ứng dụng"
            centered
            visible
            >
                
                <Button type='primary'  shape='round' icon={<i class=" fa-brands fa-facebook"></i>}> Đăng nhập với Facebook</Button>
                <Button type='primary'  shape='round' icon={<i class="fa-brands fa-google"></i>}> Đăng nhập với Gmail</Button>
                <Button type='primary'  shape='round' icon={<i class="fa-brands fa-instagram"></i>}> Đăng nhập với Instagram</Button>
                <Button type='primary'  shape='round' icon={<i class="fa-brands fa-github"></i>}> Đăng nhập với Github</Button>

            </Modal>
        </div>
    );
}

export default Home;