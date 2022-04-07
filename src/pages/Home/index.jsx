import { Button, message, Modal } from 'antd';
import { GoogleAuthProvider, signInWithPopup, GithubAuthProvider  } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from "../../firebase/config";
import { addDocumentWithId } from '../../firebase/service';
import "./Home.scss";
import SingInWithUserAndPassword from './SignInWithUserAndPassword';
Home.propTypes = {
    
};

const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()


function Home(props) {
    const [signInWithUser, setSignInWithUser] = useState(false)
    const [isGoogleLoading, setIsGoogleLoading] = useState(false)
    const [isGithubLoading, setIsGithubLoading] = useState(false)
    const navigate = useNavigate()
    const handleGoogleLogin = async () => {
        setIsGoogleLoading(true)
        try {
            const {user} = await signInWithPopup(auth, googleProvider)
            const userSnap = await getDoc(doc(db, 'users',user?.uid))
            if(userSnap.exists()){
                // do something..
            }else {
                addDocumentWithId("users",user?.uid, {
                    ...user?.providerData[0],
                    uid: user?.uid
                })
            }
            setIsGoogleLoading(false)
            navigate("/chat-room")
            
        } catch (error) {
            console.log('error:',error)
            setIsGoogleLoading(false)
            message.error({
                content: `Đăng nhập thất bại: ${error.message}`,
                style: {
                    marginTop: '20vh'
                }
            }, 2.5)
        }
        // onAuthStateChanged(auth, (user) => console.log({user}))
    }
    const handleGithubLogin = async () => {
        setIsGithubLoading(true)
        try {
            const {user} = await signInWithPopup(auth, githubProvider)
            const userSnap = await getDoc(doc(db, 'users',user?.uid))
            if(userSnap.exists()){
                // do something..
            }else {
                addDocumentWithId("users",user?.uid, {
                    ...user?.providerData[0],
                    uid: user?.uid
                })
            }
            setIsGithubLoading(false)
            navigate("/chat-room")
            
        } catch (error) {
            console.log('error:',error)
            setIsGithubLoading(false)
            message.error({
                content: `Đăng nhập thất bại: ${error.message}`,
                style: {
                    marginTop: '20vh'
                }
            }, 2.5)
        }
    }
    return (
        <div className="home">
           <Modal
            className="modal"
            title="Đăng nhập vào ứng dụng"
            centered
            visible
            footer={null}
            >
                {
                    signInWithUser ? (<SingInWithUserAndPassword />) : 
                    (<>
                    <Button onClick={() => setSignInWithUser(true)} type='primary'  shape='round' icon={<i className=" fa-brands fa-facebook"></i>}> Đăng nhập với tài khoản</Button>
                    <Button loading={isGoogleLoading} onClick={handleGoogleLogin} type='primary'  shape='round' icon={<i className="fa-brands fa-google"></i>}> Đăng nhập với Gmail</Button>
                    <Button disabled loading={isGithubLoading} onClick={handleGithubLogin} type='primary'  shape='round' icon={<i className="fa-brands fa-github"></i>}> Đăng nhập với Github</Button>
                    <Button disabled type='primary'  shape='round' icon={<i className="fa-brands fa-apple"></i>}> Đăng nhập với Apple</Button>
                    </>
                    )
                }
            </Modal>
        </div>
    );
}

export default Home;