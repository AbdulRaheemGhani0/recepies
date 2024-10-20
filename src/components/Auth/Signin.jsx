import React, { useState } from 'react'; 
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from '../Firebase/Firebase';

function Signin()  {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 
  const handleSignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Result: ", result);
        navigate("/");
      })
      .catch((error) => {
        console.error("Google Sign-In Error: ", error.message);
      });
  };

  
  const handleSignin = async (values) => {
    const { Email, password } = values;
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, Email, password);
      navigate("/");
    } catch (error) {
      console.error("Sign-In Error: ", error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    handleSignin(values);  
  };

  return (
    <div className="md:w-2/3 mx-auto w-full pb-16 sm:max-w-screen-sm md:max-w-screen-md lg:w-1/3 lg:max-w-screen-lg xl:max-w-screen-xl">
      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 360 }}
        onFinish={onFinish}  
      >
        <Form.Item
          name="Email"
          rules={[
            { required: true, message: 'Please input your Email!' },
            { type: 'email', message: 'Please enter a valid email address!' }
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>
        
        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Please input your Password!' }
          ]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button 
            block 
            type="primary" 
            htmlType="submit" 
            className="text-white bg-orange-700 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            loading={loading}  
          >
            { loading ? "Loading" : "Log In" }
          </Button>
        </Form.Item>

        <Form.Item>
          OR
          <Button 
            block 
            type="primary" 
            onClick={handleSignInWithGoogle} 
            className="text-white bg-orange-700 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
          >
            Login with Google
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Signin;








// import React from "react";
// import { LockOutlined, UserOutlined } from "@ant-design/icons";
// import { Button, Checkbox, Form, Input, Flex } from "antd";
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import {
//   GoogleAuthProvider,
//   signInWithEmailAndPassword,
//   signInWithPopup,
// } from "firebase/auth";
// import { auth } from "../Firebase/Firebase";

// function Signin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [Loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleSignInWithGoogle = () => {
//     const provider = new GoogleAuthProvider();
//     provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
//     signInWithPopup(auth, provider)
//       .then((result) => {
//         console.log("Result ", result);
//         // This gives you a Google Access Token. You can use it to access the Google API.
//         const credential = GoogleAuthProvider.credentialFromResult(result);
//         const token = credential.accessToken;
//         // The signed-in user info.
//         const user = result.user;
//         console.log("user", user);
//         navigate("/");
//         // IdP data available using getAdditionalUserInfo(result)
//         // ...
//       })
//       .catch((error) => {
//         // Handle Errors here.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // The email of the user's account used.
//         const email = error.customData.email;
//         // The AuthCredential type that was used.
//         const credential = GoogleAuthProvider.credentialFromError(error);
//         console.log("error", errorCode, errorMessage);
//       });
//   };
//   const handleSignin = async () => {
//     try {
//       setLoading(true);
//       signInWithEmailAndPassword(auth, email, password).then(() => {
//         navigate("/");
//         setLoading(false);
//       });
//     } catch {
//       setLoading(false);
//       console.log("catch in signin", errorMessage, errorCode);
//     }
//   };

//   const onFinish = (values) => {
//     console.log("Received values of form: ", values);
//     console.log("value,Email ==>", values.Email);
//     console.log("value,password ==>", values.password);
//     setEmail(values.Email);
//     setPassword(values.password);

//     handleSignin();
//   };
//   console.log("email==> ", email);
//   console.log("password==> ", password);
//   return (
//     <div className="md:w-2/3 mx-auto w-full pb-16 sm:max-w-screen-sm md:max-w-screen-md lg:w-1/3 lg:max-w-screen-lg xl:max-w-screen-xl">
//       <Form
//         name="login"
//         initialValues={{
//           remember: true,
//         }}
//         style={{
//           maxWidth: 360,
//         }}
//         onFinish={onFinish}
//       >
//         <Form.Item
//           name="Email"
//           rules={[
//             {
//               required: true,
//               message: "Please input your Email!",
//             },
//           ]}
//         >
//           <Input prefix={<UserOutlined />} placeholder="Email" />
//         </Form.Item>
//         <Form.Item
//           name="password"
//           rules={[
//             {
//               required: true,
//               message: "Please input your Password!",
//             },
//           ]}
//         >
//           <Input
//             prefix={<LockOutlined />}
//             type="password"
//             placeholder="Password"
//           />
//         </Form.Item>
//         <Form.Item>
//           <Flex justify="space-between" align="center">
//             <Form.Item name="remember" valuePropName="checked" noStyle>
//               <Checkbox>Remember me</Checkbox>
//             </Form.Item>
//           </Flex>
//         </Form.Item>
//         <Form.Item>
//           <Button
//             block
//             type="primary"
//             htmlType="submit"
//             className="text-white bg-orange-700  focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
//           >
//             {Loading ? "Loading" : "Log In"}
//           </Button>
//         </Form.Item>
//         OR
//         <Form.Item>
//           <Button
//             block
//             type="primary"
//             htmlType="submit"
//             onClick={handleSignInWithGoogle}
//             className="text-white bg-orange-700  focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
//           >
//             Login with Google
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// }
// export default Signin;

// or <Link
//                           to="signup"
//                           className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
//                       >
//                           Sign up
//                       </Link>

// import React from 'react'
// import { Button, Checkbox, Form, Input } from 'antd';
// function Signin() {

//     const onFinish = (values) => {
//   console.log('Success:', values);
// };
// const onFinishFailed = (errorInfo) => {
//   console.log('Failed:', errorInfo);
// };
//   return (
//     <>

// <h1 className="mb-4 text-3xl font-black leading-4 sm:text-5xl xl:text-6xl">Sign in</h1>
// <div  className="md:w-2/3 mx-auto w-full pb-16 sm:max-w-screen-sm md:max-w-screen-md lg:w-1/3 lg:max-w-screen-lg xl:max-w-screen-xl">
//   <Form className="shadow-lg mb-4 rounded-lg border border-gray-100 py-10 px-8  w-screen "
//     name="basic"
//     labelCol={{
//       span: 8,
//     }}
//     wrapperCol={{
//       span: 16,
//     }}
//     style={{
//       maxWidth: 600,
//     }}
//     initialValues={{
//       remember: true,
//     }}
//     onFinish={onFinish}
//     onFinishFailed={onFinishFailed}
//     autoComplete="off"
//   >
//     <Form.Item className="shadow-sm w-full cursor-text appearance-none  py-2 px-3 leading-tight outline-none ring-blue-500 focus:ring"
//       label="Username"
//       name="username"
//       rules={[
//         {
//           required: true,
//           message: 'Please input your username!',
//         },
//       ]}
//     >
//       <Input />
//     </Form.Item>

//     <Form.Item className="shadow-sm w-full cursor-text appearance-none  py-2 px-3 leading-tight outline-none ring-blue-500 focus:ring"
//       label="Password"
//       name="password"
//       rules={[
//         {
//           required: true,
//           message: 'Please input your password!',
//         },
//       ]}
//     >
//       <Input.Password />
//     </Form.Item>

//     <Form.Item
//       name="remember"
//       valuePropName=""
//       wrapperCol={{
//         offset: 8,
//         span: 16,
//       }}
//     >
//       <Checkbox>Remember me</Checkbox>
//     </Form.Item>

//     <Form.Item
//       wrapperCol={{
//         offset: 8,
//         span: 16,
//       }}
//     >
//       <Button type="primary" htmlType="submit" className="cursor-pointer rounded bg-blue-600 py-2 px-8 text-center text-lg font-bold  text-white">
//         Submit
//       </Button>
//     </Form.Item>
//   </Form>
//   </div>

//     </>
//   )
// }

// export default Signin ;

// <div className="bg-white w-screen font-sans text-gray-900">
//   <div className=" ">
//     <div className="mx-auto w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
//       <div className="mx-2 py-12 text-center md:mx-auto md:w-2/3 md:py-20">
//         <h1 className="mb-4 text-3xl font-black leading-4 sm:text-5xl xl:text-6xl">
//           Sign in
//         </h1>

//       </div>
//     </div>
//   </div>
//   <div className="md:w-2/3 mx-auto w-full pb-16 sm:max-w-screen-sm md:max-w-screen-md lg:w-1/3 lg:max-w-screen-lg xl:max-w-screen-xl">
//     <form className="shadow-lg mb-4 rounded-lg border border-gray-100 py-10 px-8">
//       <div className="mb-4">
//         <label className="mb-2 block text-sm font-bold" htmlFor="email">
//           E-mail
//         </label>
//         <input
//           className="shadow-sm w-full cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-blue-500 focus:ring"
//           id="email"
//           type="email"
//           placeholder="email"
//           required=""
//         />
//         <span className="my-2 block" />
//       </div>

//       <div className="mb-4">
//         <label className="mb-2 block text-sm font-bold" htmlFor="password">
//           Password
//         </label>
//         <input
//           className="shadow-sm w-full cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-blue-500 focus:ring"
//           id="password"
//           type="password"
//           placeholder="******************"
//           required="true"
//         />
//       </div>

//       <div className="flex items-center">
//         <div className="flex-1" />
//         <button
//           className="cursor-pointer rounded bg-blue-600 py-2 px-8 text-center text-lg font-bold  text-white"
//           type="submit"
//         >
//           Signin
//         </button>
//       </div>
//     </form>
//   </div>
// </div>
