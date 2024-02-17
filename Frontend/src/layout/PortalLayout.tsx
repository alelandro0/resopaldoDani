import React from "react";
import { useAuth } from "../Autentication/AutProvider";
import { Link } from "react-router-dom";
import { API_URL } from "../Autentication/constanst";
import './nav.css'
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
        <header>
          <nav className="box">
            <ul className="componet" style={{padding:20}}>
              <li>
                <Link style={{color:'black',fontSize:'25px', textDecoration:'none'}} to="/dashboard">Perfil</Link>
              </li>
              <li>
                <Link style={{color:'black',fontSize:'25px', textDecoration:'none'}}  to="/dashboard">Bienvenido {auth.getUser()?.name ?? ""}</Link>
              </li>
              <li>
                <a style={{color:'black',fontSize:'25px',textDecoration:'none'}} href="#" onClick={handleSignOut}>
                  Salir
                </a>
              </li>
              <li>
              <Link style={{color:'black',fontSize:'25px', textDecoration:'none'}}  to="/chat"  >Chat</Link>
              </li>
            </ul>
          </nav>
        </header>
  
        <main>{children}</main>
      </>
    )
}