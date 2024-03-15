import './navar.css';
import { useRef, useState ,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faHome,faUser,   faBriefcase, faEdit, faBullhorn, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import UserProfile from './UserProfile';
import { API_URL } from '../../../Autentication/constanst';
import { useAuth } from '../../../Autentication/AutProvider';
import { Link } from "react-router-dom";



const NabarMenu = () => {
  const lineContainerRef = useRef(null);
  const menuRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [downloadURL, setDownloadURL] = useState("");
  const auth = useAuth();
  useEffect(()=>{
    getImageProfile()
  })
  const handleToggleMenu = () => {
    setIsActive(!isActive);
  };
  async function handleSignOut(e){
    e.preventDefault();
    try {
        const response = await fetch(`${API_URL}/signout`,{
            method: "DELETE",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.getRefreshToken()}`
            }
        })
       console.log('repuesta de salir ', response, auth.getUser()?.name);
        if(response.ok){
            auth.signOut();
        }
    } catch (error) {
      console.error( error);
    }
}
async function getImageProfile() {
  try {
    console.log('este es el token => ', auth.getAccessToken());
    const id = auth.getUser()?.id

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

    if (!data.imageProfile) { // Cambio aquí de data.downloadURL a data.imageProfile
      throw new Error('Error: La respuesta del servidor no contiene la URL de la imagen de perfil');
    }

    setDownloadURL(data.imageProfile); // Cambio aquí de data.downloadURL a data.imageProfile
    console.log('URL de la imagen de perfil obtenida:', data.imageProfile); // Cambio aquí de data.downloadURL a data.imageProfile
  } catch (error) {
    const defaultImageUrl = 'https://static.vecteezy.com/system/resources/previews/003/337/584/large_2x/default-avatar-photo-placeholder-profile-icon-vector.jpg'; // Reemplaza con la URL de tu imagen por defecto
    setDownloadURL(defaultImageUrl)
    console.error('Error al obtener la imagen de perfil:', error);
  }
  //
}

  return (
    <>
      <div className="  relative w-full  fixed top-0 flex bg-black justify-between h-20 items-center py-4 px-4 md:px-6 text-white mx-auto lg:px-24 md:py-0  z-30  ">
      <div className='flex flex-row gap-4 items-center'>
                <h1 className='text-[1.1rem] lg:text-[1.3rem] hover:text-blue-600 hover:scale-125 duration-500'>
                    <i className='bx bx-code-curly mr-2 text-base'></i>
                    MultiServicios
                </h1>
            </div>
        <div className="topbar-center">
        </div>
        <div className='flex flex-row gap-4 items-center'>
           <FontAwesomeIcon icon={faUser} />
           <h3> {auth.getUser()?.name}</h3>
        </div>
        <div className="topbar-right">
          <div
            className="line-container cursor-pointer "
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
        <UserProfile/>
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
              <Link to="/" >   Inicio</Link>
            </div>
            <div className="menu-item hover:bg-blue-600">
              <FontAwesomeIcon icon={faUser} tyle={{}}/>
              <Link to="/dashboard">   Perfil</Link>
            </div>
            <div className="menu-item hover:bg-blue-600">
              <FontAwesomeIcon icon={faBriefcase} />
              <span>Agenda</span>
            </div>
            <div className="menu-item hover:bg-blue-600">
              <FontAwesomeIcon icon={faEdit} />
              <span>Editar</span>
            </div>
            <div className="menu-item hover:bg-blue-600">
              <FontAwesomeIcon icon={faBullhorn} />
              <span>Publicaciones</span>
            </div>
            <button className='menu-bottom-user m-10 hover:text-blue-600' onClick={handleSignOut}>Salir</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NabarMenu;
