import { Button, Modal } from 'antd';
import * as firebase from 'firebase/app'
import React from 'react';
import { auth, db } from "../../firebase/config";
import { signInWithPopup, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';
import "./Home.scss";
import { collection, doc, setDoc, addDoc, where, query, getDoc  } from 'firebase/firestore'
import { addDocumentWithId } from '../../firebase/service';
Home.propTypes = {
    
};

const googleProvider = new GoogleAuthProvider()



function Home(props) {
    const handleGoogleLogin = async () => {
        try {
            const {user} = await signInWithPopup(auth, googleProvider)
            const userSnap = await getDoc(doc(db, 'users',user?.uid))
            if(userSnap.exists()){
             console.log('user existed')   
            }else {
                addDocumentWithId("users",user?.uid, {
                    ...user?.providerData[0],
                    uid: user?.uid
                })
            }
            
        } catch (error) {
            console.log('error:',error)
        }
        // onAuthStateChanged(auth, (user) => console.log({user}))
    }
    return (
        <div className="home">
            <Modal
            className="modal"
            title="Đăng nhập vào ứng dụng"
            centered
            visible
            >
                
                <Button  type='primary'  shape='round' icon={<i className=" fa-brands fa-facebook"></i>}> Đăng nhập với Facebook</Button>
                <Button onClick={handleGoogleLogin} type='primary'  shape='round' icon={<i className="fa-brands fa-google"></i>}> Đăng nhập với Gmail</Button>
                <Button type='primary'  shape='round' icon={<i className="fa-brands fa-instagram"></i>}> Đăng nhập với Instagram</Button>
                <Button type='primary'  shape='round' icon={<i className="fa-brands fa-github"></i>}> Đăng nhập với Github</Button>
                
            </Modal>
        </div>
    );
}

export default Home;