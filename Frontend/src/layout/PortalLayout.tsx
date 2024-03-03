import React from "react";
import { useAuth } from "../Autentication/AutProvider";
import { Link } from "react-router-dom";
import { API_URL } from "../Autentication/constanst";
import './nav.css'
import user from '../../public/img/user.svg'

export  function PortalLayout({children}: {children:React.ReactNode}){
 const auth = useAuth();

    async function handleSignOut(e:React.MouseEvent<HTMLAnchorElement>){
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/signout`,{
                method: "DELETE",
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.getRefreshToken()}`
                }
            })

            if(response.ok){
                auth.signOut();
            }
        } catch (error) {
          console.error( error);
        }
    }

    return (
        <>
        <header className="header-dashboard">
          <nav className="box">
            <ul className="componet">
              <li className="li-dashboard">
                <Link style={{color:'White',fontSize:'18px', textDecoration:'none'}} to="/dashboard"> <img className="user" src={user} alt="" /> Bienvenido:  {auth.getUser()?.name ?? ""}</Link>
              </li>
              {auth.getUser()?.roll == 'Cliente'?(
              <li className="li-dashboard">
                <Link style={{color:'White',fontSize:'18px', textDecoration:'none'}} to="/EditarPerfil">Perfil {auth.getUser()?.roll ?? ""}</Link>
              </li>
              ):null}
              {auth.getUser()?.roll == 'Profesional'?(
              <li className="li-dashboard">
                <Link style={{color:'White',fontSize:'18px', textDecoration:'none'}} to="/EditarPerfil">Perfil {auth.getUser()?.roll ?? ""}</Link>
              </li>
              ):null}

              {/* <li className="li-dashboard">
              <Link style={{color:'White',fontSize:'18px', textDecoration:'none'}}  to="/chat"  >Chat</Link>
              </li> */}

              {auth.getUser()?.roll ==='Cliente'? (
              <li >
                <Link style={{color:'White',fontSize:'18px', textDecoration:'none'}} to="/consultar-citas">Mis Citas </Link>
              </li>):null}
              {auth.getUser()?.roll ==='Profesional'? (
              <li >
                <Link style={{color:'White',fontSize:'18px', textDecoration:'none'}} to="/Agenda">Mi Agenda</Link>
              </li>):null}
              <li >
                <a style={{color:'White',fontSize:'18px',textDecoration:'none'}} href="#" onClick={handleSignOut}>
                  Salir
                </a>
              </li>
            </ul>
          </nav>
        </header>
  
        <main>{children}</main>
      </>
    )
}