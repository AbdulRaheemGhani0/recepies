import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Recepie from '../Recepie/Recepie';
import AddBlog from '../Blog/Blog';

export default function Home() {
    return (
        <>   
            <div className="mx-auto w-full max-w-7xl">
                {/* Hero Section */}
                <aside className="relative overflow-hidden text-black rounded-lg sm:mx-16 mx-2 sm:py-16 bg-[#f7fff7]">
                    <div className="relative z-10 max-w-screen-xl px-4  pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8">
                        <div className="max-w-xl sm:mt-1 mt-20 space-y-8 text-center sm:text-right sm:ml-auto">
                            <h2 className="text-4xl font-bold sm:text-5xl text-[#333333]">
                                Your Daily Dish 
                                <span className="block sm:inline-block sm:ml-2 text-4xl text-[#ff6b6b]">A Food Journey</span>
                            </h2>
                            <p className="text-lg text-[#4ecdc4]">
                                Discover the best recipes curated just for you!
                            </p>
                            <Link to="/add-recipe" className="inline-block px-6 py-3 mt-4 text-white bg-[#ff6b6b] rounded-lg hover:bg-[#f06060]">
                                Share Your Recipe
                            </Link>
                        </div>
                    </div>

                    <div className="absolute inset-0 w-full sm:my-20 sm:pt-1 pt-12 h-full">
                        <img className="w-96 sm:w-full object-cover" src="https://img.freepik.com/free-photo/delicious-traditional-tacos-arrangement_23-2150799549.jpg" alt="image1" />
                    </div>
                </aside>

                {/* Featured Image */}
                <div className="grid place-items-center sm:mt-20">
                    <img className="sm:w-96 w-48 rounded-lg shadow-md" src="https://img.freepik.com/free-photo/high-angle-tacos-lime-plate_23-2148629354.jpg" alt="image2" />
                </div>

                {/* Section Title */}
                <h1 className="text-center text-2xl sm:text-5xl py-10 font-medium text-[#333333]">Share Your Recipes</h1>

                {/* Recipes Section */}
                <section className="mx-auto px-4 sm:px-8 mb-16">
                    <h2 className="text-center text-3xl sm:text-4xl font-bold text-[#333333] mb-6">Latest Recipes</h2>
                    <Recepie />
                </section>

                {/* Blogs Section */}
                <section className="mx-auto px-4 sm:px-8 mb-16 bg-[#f0e5d8] py-10 rounded-lg shadow-md">
                    <h2 className="text-center text-3xl sm:text-4xl font-bold text-[#333333] mb-6">Food Blogs</h2>
                    <AddBlog />
                </section>
            </div>
        </>
    );
}





















































// import React, { useContext } from 'react'
// import { Link } from 'react-router-dom';
// import Recepie from '../Recepie/Recepie';
// import AddBlog from '../Blog/Blog';





// export default function Home() {



   







//     return (
//         <>   
        
//          <div className="mx-auto w-full max-w-7xl">
//              <aside className="relative overflow-hidden text-black rounded-lg sm:mx-16 mx-2 sm:py-16">
//                  <div className="relative z-10 max-w-screen-xl px-4  pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8">
//                      <div className="max-w-xl sm:mt-1 mt-80 space-y-8 text-center sm:text-right sm:ml-auto">
//                          <h2 className="text-4xl font-bold sm:text-5xl">
//                              Your Daily Dish 
//                              <span className="hidden sm:block text-4xl">A Food Journy</span>
//                          </h2>

                       
//                     </div>
//                 </div>

//                 <div className="absolute inset-0 w-full sm:my-20 sm:pt-1 pt-12 h-full ">
//                     <img className="w-96" src="https://img.freepik.com/free-photo/delicious-traditional-tacos-arrangement_23-2150799549.jpg?t=st=1729030220~exp=1729033820~hmac=2013ff0674c3c6701a82bbac7aa47a2f561c02633cc5cd685bd36ac4aa1ff326&w=740" alt="image1" />
//                 </div>
//             </aside>

//             <div className="grid  place-items-center sm:mt-20">
//                 <img className="sm:w-96 w-48" src="https://img.freepik.com/free-photo/high-angle-tacos-lime-plate_23-2148629354.jpg?t=st=1729030266~exp=1729033866~hmac=48a8c79b35d4f3361837295de6452113ae93173db35b2f0cb9cd6529abe033ff&w=740" alt="image2" />
//             </div>

//             <h1 className="text-center text-2xl sm:text-5xl py-10 font-medium">Share your Recepies</h1>
//         </div>
//         <Recepie/>
//         <AddBlog />
//         </>
     
//     );
// }























































