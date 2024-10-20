import React, { useContext, useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload, Select, message, Card } from "antd";
import {
  collection,
  setDoc,
  doc,
  serverTimestamp,
  onSnapshot,
  deleteDoc,
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

function AddBlog() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [isEdited, setisEdited] = useState(false);
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const collectionRef = collection(db, "Blogs");
  const storage = getStorage();

  const onFinish = (values) => {
    if (imageUrl) {
      addBlogs({ ...values, imageUrl });
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
      setBlog(items);
      setLoading(false);
      
    });

    return () => {
      unsub();
    };
  }, []);

  const addBlogs = async (values) => {
    const newBlogs = {
      tittle: values.Tittle,
      description: values.description,
      category: values.category,
      imageUrl: values.imageUrl,
      id: uuidv4(),
      createdAt: serverTimestamp(),
      lastUpdate: serverTimestamp(),
    };

    try {
      const blogRef = doc(collectionRef, newBlogs.id);
      await setDoc(blogRef, newBlogs);
      message.success("Blog added successfully");
      setisEdited(false);
      navigate("/blog");
    } catch (error) {
      console.error("Error adding Blogs:", error);
    }
  };

  const handleImageUpload = (file) => {
    const storageRef = ref(storage, `blogs/${file.uid}-${file.name}`);
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

  async function deleteRecepie(blogId) {
    try {
      const blogRef = doc(collectionRef, blogId);
      await deleteDoc(blogRef);
      console.log("Blog deleted successfully");
    } catch (error) {
      console.log("Blog deleting error", error);
    }
  }

  const editButton = () => {
    setisEdited(true);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <>
      {isEdited ? (
        <div>
          <div className="md:w-2/3 mx-auto w-full pb-16 sm:max-w-screen-sm md:max-w-screen-md lg:w-1/3 lg:max-w-screen-lg xl:max-w-screen-xl">
            <h1 className="text-center text-2xl font-bold mb-6">
              Create new Blog
            </h1>
            <Form
              name="create-blog"
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
                    message: "Please input Blog Tittle",
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
                    message: "Please input your Blog Description!",
                  },
                ]}
              >
                <Input type="text" placeholder="Description" />
              </Form.Item>

              <Form.Item name="category" rules={[{ required: true }]}>
                <Select
                  placeholder="Which category describes your Blog"
                  allowClear
                >
                  <Select.Option value="food">Food</Select.Option>
                  <Select.Option value="health">Heath</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  className="text-white bg-black focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                >
                  Add Blog
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-8 mb-8 ">
            <h1 className="text-center text-2xl font-bold mb-6">Blogs</h1>

            {blog.map((blogItem) => (
              <div
                key={blogItem.id}
                className="m-10 mx-4 max-w-screen-lg overflow-hidden rounded-xl border shadow-lg md:pl-8"
              >
                <div className="flex flex-row overflow-hidden bg-white sm:flex-row md:h-60">
                  <div className="flex w-full flex-col p-4 sm:w-1/2 sm:p-8 lg:w-3/5">
                    <h2 className="text-xl font-bold text-gray-900 md:text-2xl lg:text-4xl">
                      {blogItem.tittle}
                    </h2>
                    <p className="mt-2 text-lg">{blogItem.category}</p>
                    <p className="mt-4 mb-8 max-w-md text-gray-500">
                      {blogItem.description}
                    </p>
                    <button
                      onClick={() => deleteRecepie(blogItem.id)}
                      className="group mt-auto flex w-44 cursor-pointer select-none items-center justify-center rounded-md bg-black px-6 py-2 text-white transition"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="order-first ml-auto h-48 w-full bg-gray-700 sm:order-none sm:h-auto sm:w-1/2 lg:w-2/5">
                    <img
                      className="h-full w-full object-cover"
                      src={blogItem.imageUrl}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={editButton}
            className="group mt-auto flex w-44 cursor-pointer select-none items-center justify-center rounded-md bg-black px-6 py-2 text-white transition group flex w-full items-center justify-center rounded py-1 text-center font-bold"
          >
            Add Blog
          </button>
        </>
      )}
    </>
  );
}

export default AddBlog;
