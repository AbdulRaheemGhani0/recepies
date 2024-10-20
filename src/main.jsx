import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './index.css'
import Layout from './App.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx'
import RecepieDetail from './components/RecepieDetail/RecepieDetail.jsx'
import Signin from './components/Auth/Signin.jsx'
import Recepie from './components/Recepie/Recepie.jsx'
import CreateRecepie from './components/Recepie/CreateRecepie.jsx'
import Blog from './components/Blog/Blog.jsx'
import Signup from './components/Auth/signup.jsx'
import AuthContextProvider from './components/context/AuthContext.jsx'
import NotFound from './components/Notfound/NotFoundComponent.jsx'
import BlogDetail from './components/Blog/BlogDetail.jsx'
import ProfileSection from './components/Profile/profie.jsx'









const router  = createBrowserRouter(
createRoutesFromElements (
<Route path='/' element={<Layout/>}>
<Route path='' element={<Home/>}    />
<Route path='about' element={<About/>}    />
<Route path='contact' element={<Contact/>}    />
<Route path='recepie/:id'element ={<RecepieDetail/>} />
<Route path='blog/:id'element ={<BlogDetail/>} />

<Route path='signin' element={<Signin/>}    />
<Route path='signup' element={<Signup />}    />
<Route path='recepie' element={<Recepie />}    />
<Route path='createrecepie' element={<CreateRecepie />}    />
<Route path='blog' element={<Blog />}    />
<Route path='profileSection' element={<ProfileSection/>}    />

<Route path="*" element={<NotFound />} />





</Route>


)




)









createRoot(document.getElementById('root')).render(
  <StrictMode>
   
    <AuthContextProvider>
   <RouterProvider router={router} />
   </AuthContextProvider>
   
    </StrictMode>,
)
