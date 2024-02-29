import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './routes/Login'
import Signup from './routes/Signup'
import Home from './Homepage/Home'
import ServicesPage from './Services Page/ServicesPage'
import Dashboard from './routes/dashboard'
import ProtectedRoute from './routes/protectedRoute'
import { AuthProvider } from './Autentication/AutProvider'
import {ChatClient} from './routes/Chat.io'
import Agendar from './routes/Agendar'
import ServicioAgenda from './routes/servicioAgenda'
import {EditarPerfil}  from './routes/EditarPerfil'
import {Editar} from './routes/Editar'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/ServicesPage",
    element: <ServicesPage/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path: "/",
    element: <ProtectedRoute/>,
    children:[
      {
        path: "/dashboard",
        element: <Dashboard/>
      },
      {
        path: "/chat",
        element:<ChatClient/>
      },
      {
        path: "/agendar",
        element:<Agendar/>
      },
      {
        path: "/agenda",
        element: <ServicioAgenda/>
      },
      {
        path: "/EditarPerfil",
        element: <EditarPerfil/>
      },
      {
        path: "Editar",
        element: <Editar/>
      }
    ]
  },
]
)
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>,
)

