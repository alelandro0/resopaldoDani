import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './Autentication/AutProvider'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from "./components/pages/homepage-comps/Login"
import {Registro} from "./components/pages/homepage-comps/Registro"
import ParticlesBackground from "./components/ParticlesBackground"
import AboutPage from "./components/pages/AboutPage"
import HomePage from "./components/pages/HomePage"
import SocialLinks from "./components/SocialLinks"
import GeneralFooter from "./components/GeneralFooter"
import AllProjectsPage from "./components/pages/AllProjectsPage"
import AllTechsPage from "./components/pages/AllTechsPage"
import ProtectedRoute from './components/pages/homepage-comps/protectedRoute'
import Chat from './components/pages/homepage-comps/ChatButton'
import Dashboard from './components/pages/homepage-comps/Dashboard'
import Citas from './components/pages/homepage-comps/Citas'
import EditarPerfil from './components/pages/homepage-comps/EditarPerfil'
import PublicaionesT from './components/pages/homepage-comps/PublicacionesT'

// import { BrowserRouter } from 'react-router-dom'


const router= createBrowserRouter(
 
  [
  {
    path: "/",
    element: 
    <>
    <ParticlesBackground />
    <SocialLinks />
    <HomePage />
    <Chat/>
    <GeneralFooter />
  </>
  },
  {
    path:"/about-me",
    element: <AboutPage/>
  },
  {
    path:"/projects",
    element: <AllProjectsPage/>
  },
  {
    path:"/technologies",
    element: <AllTechsPage/>
  },
  {
   path:"/Registrate",
   element:(
    <>
    <Registro/>
    <ParticlesBackground />
    <SocialLinks />
    <Chat/>
    </> )
  },
  {
   path:"/iniciar-sesion",
   element:(
   <>
   <Login/>
   <ParticlesBackground />
   <SocialLinks />
   <Chat/>
   </> )
  },
  {
    path: "/",
    element: <ProtectedRoute/>,
    children:[
      {
        path: "/dashboard",
        element: 
        <>
        <ParticlesBackground />
        <ProtectedRoute />
        <Dashboard />
        <Chat/>
        
      </>
      },
      {
        path: "/citas",
        element:
        <>
        <ParticlesBackground />
        <Citas/>
        <Chat/>
        </>
      },
      {
        path: "/editarPerfil",
        element:
        <>
        <ParticlesBackground />
        <EditarPerfil/>
        <Chat/>
        </>
      },
      {
        path: "/publicaciones",
        element:
        <>
        <ParticlesBackground />
        <PublicaionesT/>
        <Chat/>
        </>
      },
      // {
      //   path: "/chat",
      //   element:<ChatClient/>
      // },
      
      
      // {
      //   path: "/EditarPerfil",
      //   element: <EditarPerfil/>
      // },
      // {
      //   path: "/Agenda",
      //   element:<AgendaProfesional/>
      // },
      // {
      //   path: "/consultar-citas",
      //   element:<CitasCliente/>
      // }
    ],
  },
],
<><GeneralFooter/></> 
)
ReactDOM.createRoot(document.getElementById('root') ).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>,
)
