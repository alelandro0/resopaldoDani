import { Link } from "react-router-dom";
import React from "react";
import '../layout/DefaultLayout.css'
import logo from '../../public/img/logo.png';

interface DefaultLayoutProps{
    children: React.ReactNode,
}
export default function DefaultLayout({children}:DefaultLayoutProps){
    return(
        <>
        <header className="header-layout">
            <div className="logo">
                <img src={logo} alt="logo"/>
            </div>
            <nav className="nav-layout">
                <ul className="ul-layout">
                    <li className="li--layout">
                        <Link to="/">Inicio</Link>
                    </li>
                    <li className="li--layout">
                        <Link to="/login">Iniciar Sesion</Link>
                    </li>   
                    <li className="li--layout">
                        <Link to="/Signup">Registrarse</Link>
                    </li>
                    <li className="li--layout">
                        <Link to="/ServicesPage">Servicios</Link>
                    </li>
                </ul>
            </nav>
        </header>
        <main>
            {children}
        </main>
    </>
    )
    
}