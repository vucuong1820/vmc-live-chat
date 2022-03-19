import { Button, Modal } from 'antd';
import * as firebase from 'firebase/app'
import React from 'react';
import { auth } from "../../firebase/config";
import { FacebookAuthProvider, signInWithPopup, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';
import "./Home.scss";

Home.propTypes = {
    
};

const googleProvider = new GoogleAuthProvider()



function Home(props) {
    const handleGoogleLogin =  () => {
        signInWithPopup(auth, googleProvider)
        onAuthStateChanged(auth, (user) => console.log({user}))
    }
    return (
        <div className="home">
            <Modal
            className="modal"
            title="Đăng nhập vào ứng dụng"
            centered
            visible
            >
                
                <Button  type='primary'  shape='round' icon={<i class=" fa-brands fa-facebook"></i>}> Đăng nhập với Facebook</Button>
                <Button onClick={handleGoogleLogin} type='primary'  shape='round' icon={<i class="fa-brands fa-google"></i>}> Đăng nhập với Gmail</Button>
                <Button type='primary'  shape='round' icon={<i class="fa-brands fa-instagram"></i>}> Đăng nhập với Instagram</Button>
                <Button type='primary'  shape='round' icon={<i class="fa-brands fa-github"></i>}> Đăng nhập với Github</Button>
                
            </Modal>
        </div>
    );
}

export default Home;