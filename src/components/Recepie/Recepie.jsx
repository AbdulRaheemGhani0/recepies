import React, { useContext, useState, useEffect } from "react";
import {
  collection,
  setDoc,
  doc,
  serverTimestamp,
  onSnapshot,
  getDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../Firebase/Firebase";
import {
  DeleteOutlined,
  EyeOutlined,
  
  
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import RecepieCard from "./RecepieCard";

function Recepie() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [recepies, setRecepies] = useState([]);
  const [loading, setLoading] = useState(false);
  const collectionRef = collection(db, "recepie");
  const { Meta } = Card;
  

 

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


  


  async function deleteRecepie(recepieId) {
    try {
      const recepieRef = doc(collectionRef, recepieId);
      await deleteDoc(recepieRef);
      console.log("recepie deleted successfully");
    } catch (error) {
      console.log("rercepie deleting error", error);
    }
  }


  return (
    <>
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <div className="mt-8 mb-8 ">
          <h1 className="text-center text-2xl font-bold mb-6">Recipes</h1>
          <div className="flex flex-wrap justify-center gap-6">
          {recepies.map((recipe) => (
  <div key={recipe.id}> {/* Add the key prop here */}
    <Card
      style={{
        width: 300,
      }}
      cover={<img alt="Recepie Image" src={recipe.imageUrl} />}
      actions={[
        <DeleteOutlined
          key="delete"
          onClick={() => {
            deleteRecepie(recipe.id); 
          }}
        />,
        <Link to={`/recepie/${recipe.id}`} key={recipe.id}> <EyeOutlined /></Link>,
      ]}
    >
      <Meta title={recipe.tittle} description={recipe.description} />
    </Card>
  </div>
))}

          </div>
        </div>
      )}
    </>
  );
}
export default Recepie;
