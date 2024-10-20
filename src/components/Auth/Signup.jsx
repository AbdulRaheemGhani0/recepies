import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Flex, Alert } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AuthErrorCodes, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/Firebase";

function Signup() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  const handleSignup = async (email, password) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/signin");
    } catch (error) {
      setLoading(false);
      
      if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
        console.error("Email already in use");
        alert("Email already in use");
      } else {
        console.error("Error creating account: ", error.message);
        alert(error.message);
      }
    }
  };

 
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    handleSignup(values.email, values.password); 
  };

  return (
    <div className="md:w-2/3 mx-auto w-full pb-16 sm:max-w-screen-sm md:max-w-screen-md lg:w-1/3 lg:max-w-screen-lg xl:max-w-screen-xl">
      <Form
        name="signup"
        initialValues={{ remember: true }}
        style={{ maxWidth: 360 }}
        onFinish={onFinish}  
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please input your Email!" },
            { type: "email", message: "Please enter a valid email address!" }
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>
        
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please input your Password!" }
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
            <Button
            block
            type="primary"
            htmlType="submit"
            className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            loading={loading} 
          >
            {loading ? "Creating Account..." : "Register now"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Signup;
























