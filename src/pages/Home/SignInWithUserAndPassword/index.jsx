import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Form, Input, message, Typography } from "antd";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail 
} from "firebase/auth";
import { auth, db } from "../../../firebase/config";
import { addDocumentWithId } from "../../../firebase/service";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
SingInWithUserAndPassword.propTypes = {};

function SingInWithUserAndPassword(props) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [isResetLoading, setIsResetLoading] = useState(false)
  const [form] = Form.useForm();
  const [mode, setMode] = useState("sign-in");
  const { Link } = Typography;
  const onFinish = async (values) => {
    if (mode === "sign-up") {
      setIsLoading(true)
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        await updateProfile(auth.currentUser, { 
          displayName: values.displayName,
        })
        
        const userSnap = await getDoc(doc(db, "users", user?.uid));
        if (userSnap.exists()) {
          // do something..
        } else {
          addDocumentWithId("users", user?.uid, {
            ...user?.providerData[0],
            uid: user?.uid,
          });
        }
        setIsLoading(false)
        message.success({
          content: 'Tạo tài khoản thành công!',
          style: {
            marginTop: '20vh'
          }
        }, 2.5)
      } catch (error) {
        setIsLoading(false)
        if(error.code === "auth/email-already-in-use"){
          message.error({
            content: 'Địa chỉ email đã tồn tại!',
            style: {
              marginTop: '20vh'
            }
          }, 2.5)
        }
      }
    }

    if (mode === "sign-in") {
      setIsLoading(true)
      try {
        const { user } = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        setIsLoading(false)
        navigate("/chat-room")
      } catch (error) {
        console.log({error})
        setIsLoading(false)
        switch (error.code) {
          case "auth/user-not-found":
            message.error({
              content: 'Tài khoản không tồn tại!',
              style: {
                marginTop: '20vh'
              }
            }, 2.5)
            break;
          case "auth/wrong-password":
            message.error({
              content: 'Mật khẩu không chính xác!',
              style: {
                marginTop: '20vh'
              }
            }, 2.5)
            break;
          case "auth/too-many-requests":
            message.error({
              content: 'Tài khoản tạm thời vị hiệu hóa vì nhập sai quá nhiều lần. Vui lòng thử lại sau!',
              style: {
                marginTop: '20vh'
              }
            }, 2.5)
            break;
          default:
            break;
        }
      }
    }

    if(mode === "reset") {
      setIsResetLoading(true)
      try {
        await sendPasswordResetEmail(auth, values.reset)
        setIsResetLoading(false)
        message.success({
          content: 'Vui lòng kiểm tra email để đặt lại mật khẩu',
          style: {
            marginTop: '20vh'
          }
        }, 2.5)
      } catch (error) {
        console.log({error})
        setIsResetLoading(false)
        switch (error.code) {
          case "auth/user-not-found":
            message.error({
              content: 'Tài khoản không tồn tại!',
              style: {
                marginTop: '20vh'
              }
            }, 2.5)
            break;
          default:
            break;
        }
      }
    }
  };
  return (
    <Form
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 14 }}
      form={form}
      name="register"
      onFinish={onFinish}
      autoComplete="off"
    >
      {mode === "sign-in" && (
        <>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "Yêu cầu nhập email hợp lệ !",
              },
              {
                required: true,
                message: "Vui lòng nhập email !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu !",
              },
              {
                min: 6,
                message: "Mật khẩu cần tối thiểu 6 ký tự !",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
            <Button loading={isLoading} type="primary" htmlType="submit" size="large" shape="round">
              Đăng nhập
            </Button>
            <p style={{ margin: '4px 0',}}>
              <Link onClick={() => setMode("reset")} style={{display: 'inline'}}>Quên mật khẩu?</Link>
            </p>
            <Typography style={{ marginTop: "4px" }}>
              Bạn chưa có tài khoản?{" "}
            </Typography>
            <Link onClick={() => setMode("sign-up")}>Đăng ký ngay</Link>
          </Form.Item>
        </>
      )}
      {
        mode === "sign-up" &&  (
          <>
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "Yêu cầu nhập email hợp lệ !",
                },
                {
                  required: true,
                  message: "Vui lòng nhập email !",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="displayName"
              label="Tên hiển thị"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên hiển thị !",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu !",
                },
                {
                  min: 6,
                  message: "Mật khẩu cần tối thiểu 6 ký tự !",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="Xác nhận mật khẩu"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập xác nhận mật khẩu !",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Mật khẩu xác nhận không trùng khớp !")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
              <Button loading={isLoading} type="primary" htmlType="submit" size="large" shape="round">
                Đăng ký
              </Button>
              <Typography style={{ marginTop: "8px" }}>
                Bạn đã có tài khoản?{" "}
              </Typography>
              <Link onClick={() => setMode("sign-in")}>Đăng nhập ngay</Link>
            </Form.Item>
          </>
        )
      }

      {
        mode === "reset" && (
          <>
          <Form.Item
          name="reset"
          label="Email"
          rules={[
            {
              type: "email",
              message: "Yêu cầu nhập email hợp lệ !",
            },
            {
              required: true,
              message: "Vui lòng nhập email !",
            },
          ]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 9, span: 14 }}>
              <Button loading={isResetLoading}  type="primary" htmlType="submit" size="large" shape="round">
                Đặt lại mật khẩu
              </Button>
              <Typography style={{ marginTop: "8px" }}>
                Bạn đã có tài khoản?{" "}
              </Typography>
              <Link onClick={() => setMode("sign-in")}>Đăng nhập ngay</Link>
            </Form.Item>
          </>
        )
      }
      
    </Form>
  );
}

export default React.memo(SingInWithUserAndPassword);
