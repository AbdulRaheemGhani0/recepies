import React, { useContext, useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload, Select, message } from "antd";
import {
  collection,
  setDoc,
  doc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db } from "../Firebase/Firebase";
import { AuthContext } from "../context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

function AddRecepie() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [recepie, setRecepies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const collectionRef = collection(db, "recepie");
  const storage = getStorage();

  const onFinish = (values) => {
    if (imageUrl) {
      addRecepie({ ...values, imageUrl });
    } else {
      message.error("Please upload an image");
    }
  };

  useEffect(() => {
    setLoading(true);

    const unsub = onSnapshot(collectionRef, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setRecepies(items);
      setLoading(false);
     
    });

    return () => {
      unsub();
    };
  }, []);

  
  const addRecepie = async (values) => {
    const newRecepie = {
      tittle: values.Tittle,
      description: values.description,
      category: values.category,
      imageUrl: values.imageUrl,
      id: uuidv4(),
      createdAt: serverTimestamp(),
      lastUpdate: serverTimestamp(),
    };

    try {
      const recepieRef = doc(collectionRef, newRecepie.id);
      await setDoc(recepieRef, newRecepie);
      message.success("Recepie added successfully");
      navigate("/recepie");
    } catch (error) {
      console.error("Error adding recepie:", error);
    }
  };

  const handleImageUpload = (file) => {
    const storageRef = ref(storage, `recepies/${file.uid}-${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        message.error("Image upload failed");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
          message.success("Image uploaded successfully");
        });
      }
    );

    return false;
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div className="md:w-2/3 mx-auto w-full pb-16 sm:max-w-screen-sm md:max-w-screen-md lg:w-1/3 lg:max-w-screen-lg xl:max-w-screen-xl">
      <h1 className="text-center text-2xl font-bold mb-6">
        Create new Recepie
      </h1>
      <Form
        name="create-recepie"
        initialValues={{
          remember: true,
        }}
        style={{
          maxWidth: 360,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="Tittle"
          rules={[
            {
              required: true,
              message: "Please input Recepie Tittle",
            },
          ]}
        >
          <Input placeholder="Tittle" />
        </Form.Item>

        <Form.Item
          label="Recepie Image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            {
              required: true,
              message: "Please upload an image",
            },
          ]}
        >
          <Upload
            listType="picture-card"
            beforeUpload={handleImageUpload}
            maxCount={1}
          >
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </Upload>
        </Form.Item>

        <Form.Item
          name="description"
          rules={[
            {
              required: false,
              message: "Please input your recepie Description!",
            },
          ]}
        >
          <Input type="text" placeholder="Description" />
        </Form.Item>

        <Form.Item name="category" rules={[{ required: true }]}>
          <Select
            placeholder="Which category describes your recepie"
            allowClear
          >
            <Select.Option value="vegetarian">Vegetarian</Select.Option>
            <Select.Option value="non-vegetarian">Non-Vegetarian</Select.Option>
            <Select.Option value="Both vegetarion and Non-vegetarion">
              Both vegetarion and Non-vegetarion
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
          >
            Add recepie
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddRecepie;
