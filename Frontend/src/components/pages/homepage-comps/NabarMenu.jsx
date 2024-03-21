/* eslint-disable react-hooks/exhaustive-deps */
import './navar.css';
import { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faBriefcase, faEdit, faBullhorn, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '../../../Autentication/constanst';
import { useAuth } from '../../../Autentication/AutProvider';
import { Link } from "react-router-dom";
import LogoMulti from '../../../../public/images/logoMulti.png';

const NabarMenu = () => {
  const lineContainerRef = useRef(null);
  const menuRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [downloadURL, setDownloadURL] = useState("");
  const auth = useAuth();

  useEffect(() => {
    getImageProfile();
  }, []);

  const handleToggleMenu = () => {
    setIsActive(!isActive);
  };

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
      console.log('repuesta de salir ', response, auth.getUser()?.name);
      if (response.ok) {
        auth.signOut();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getImageProfile() {
    try {
      console.log('este es el token => ', auth.getAccessToken());
      const id = auth.getUser()?.id;

      console.log('ID of user Profile', id);
      const response = await fetch(`${API_URL}/getImage/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
      });
      console.log('GET perfil', response);

      if (!response.ok) {
        throw new Error('Error al obtener la imagen de perfil: ' + response.statusText);
      }

      const data = await response.json();
      console.log('==> este es data de get', data);

      if (!data.imageProfile) {
        throw new Error('Error: La respuesta del servidor no contiene la URL de la imagen de perfil');
      }

      setDownloadURL(data.imageProfile);
      console.log('URL de la imagen de perfil obtenida:', data.imageProfile);
    } catch (error) {
      const defaultImageUrl = 'https://static.vecteezy.com/system/resources/previews/003/337/584/large_2x/default-avatar-photo-placeholder-profile-icon-vector.jpg';
      setDownloadURL(defaultImageUrl)
      console.error('Error al obtener la imagen de perfil:', error);
    }
  }

  return (
    <>
      <div className="header-porfile" style={{ background: 'black', position: 'relative', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="">
          <div className='flex flex-row gap-0 items-center'>
            <img src={LogoMulti} alt="Logo" className="h-20 w-auto scale-x-[-1] filter invert" />
            <h1 className='text-[1.1rem] lg:text-[1.3rem] hover:text-blue-600 hover:scale-125 duration-500 m-0 text-xs'>
              MultiServicios
            </h1>
          </div>
        </div>
        <div className="flex gap-20 items-center">
          <div className="flex gap-4 items-center">
            <FontAwesomeIcon icon={faUser} />
            <h3> {auth.getUser()?.name}</h3>
          </div>
          <div
            className="line-container "
            ref={lineContainerRef}
            onClick={handleToggleMenu}
          >
            <div className={`line line-1 ${isActive ? 'active' : ''}`}></div>
            <div className={`line line-2 ${isActive ? 'active' : ''}`}></div>
            <div className={`line line-3 ${isActive ? 'active' : ''}`}></div>
          </div>
        </div>
      </div>




      <div style={{ width: '100%' }}>
        <div className={`menu ${isActive ? 'active' : ''}`} ref={menuRef}>
          <div className="menu-top"></div>
          <div className="menu-center">
            <div className="menu-bottom">
              <div className="menu-bottom-user">
                <img src={downloadURL} alt="" />
                <span>{auth.getUser()?.name}</span>
              </div>
              <FontAwesomeIcon icon={faQuestionCircle} />
            </div>
            <div className="menu-item hover:bg-blue-600">
              <FontAwesomeIcon icon={faHome} />
              <Link className='p-4' to="/">Inicio</Link>
            </div>
            <div className="menu-item hover:bg-blue-600">
              <FontAwesomeIcon icon={faUser} style={{}} />
              <Link className='p-4' to="/dashboard">Perfil</Link>
            </div>
            <div className="menu-item hover:bg-blue-600">
              {auth.getUser()?.roll === "Cliente" ? (
                <>
                  <FontAwesomeIcon icon={faBriefcase} />
                  <Link className='p-4' to="/citas">Agenda</Link>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faBriefcase} />
                  <Link className='p-4' to="/portafolio">Agenda</Link>
                </>
              )}
            </div>

            <div className="menu-item hover:bg-blue-600">
              <FontAwesomeIcon icon={faEdit} />
              <Link className='p-4' to="/editarPerfil">Editar</Link>
            </div>
            {auth.getUser()?.roll === "Profesional" ? (<> <div className="menu-item hover:bg-blue-600">
              <FontAwesomeIcon icon={faBullhorn} />
              <Link className='p-4' to="/publicaciones">Publicaciones</Link>
            </div></>) : null}

            <button className='p-14 hover:text-blue-500' onClick={handleSignOut}>Salir</button>
          </div>
        </div>
      </div>

    </>
  );
}

export default NabarMenu;
