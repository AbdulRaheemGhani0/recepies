import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase";

function RecepieDetail() {
  const { id } = useParams();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const collectionRef = collection(db, "recepie");

  const fetchRecipeById = async (id) => {
    try {
      const recipeRef = doc(db, "recepie", id);
      const recipeSnap = await getDoc(recipeRef);

      if (recipeSnap.exists()) {
        setSelectedRecipe(recipeSnap.data());
      } else {
        console.log("No such recipe exists!");
      }
    } catch (error) {
      console.error("Error fetching recipe:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchRecipeById(id);
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!selectedRecipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <>
      

      <div>
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                  {selectedRecipe.tittle}
                </h1>
                <div className="flex mb-4">
                  <a className="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">
                    {selectedRecipe.description}
                  </a>
                </div>
                <p className="leading-relaxed mb-4">
                  {selectedRecipe.category}
                </p>

                <div className="flex border-t border-gray-200 py-2"></div>
                <div className="flex"></div>
              </div>
              <img
                alt={selectedRecipe.tittle}
                className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                src={selectedRecipe.imageUrl}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default RecepieDetail;
