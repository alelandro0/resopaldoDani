/* eslint-disable react/prop-types */
import { useAuth } from "../../../Autentication/AutProvider";
import { Link } from "react-router-dom";
import { API_URL } from "../../../Autentication/constanst";
// import user from '../../public/img/user.svg';

export function PortalLayout({ children }) {
  const auth = useAuth();

  async function handleSignOut(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/signout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getRefreshToken()}`
        }
      });

      if (response.ok) {
        auth.signOut();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <header className="bg-gray-800">
        <nav className="container mx-auto py-4">
          <ul className="flex items-center justify-between">
            <li>
              <Link className="text-white text-lg" to="/dashboard"> Bienvenido: {auth.getUser()?.name || ""}</Link>
            </li>
            {auth.getUser()?.roll === 'Cliente' || auth.getUser()?.roll === 'Profesional' ? (
              <li>
                <Link className="text-white text-lg ml-4" to="/EditarPerfil">Perfil {auth.getUser()?.roll || ""}</Link>
              </li>
            ) : null}
            {auth.getUser()?.roll === 'Cliente' ? (
              <li>
                <Link className="text-white text-lg ml-4" to="/consultar-citas">Mis Citas</Link>
              </li>
            ) : null}
            {auth.getUser()?.roll === 'Profesional' ? (
              <li>
                <Link className="text-white text-lg ml-4" to="/Agenda">Mi Agenda</Link>
              </li>
            ) : null}
            <li>
              <a className="text-white text-lg ml-4 cursor-pointer" href="#" onClick={handleSignOut}>
                Salir
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>{children}</main>
    </>
  );
}
