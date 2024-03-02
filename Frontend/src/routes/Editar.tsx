
// Editar.js

import { PortalLayout } from '../layout/PortalLayout'; 
import { useAuth } from "../Autentication/AutProvider";
import './EditarPerfil.css';
import  { useEffect, useState ,ChangeEvent} from 'react';


export const Editar = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [imagenPerfil, ] = useState('');
  const [, setEditingProfileImage] = useState(false);
  const [downloadURL, setDownloadURL] = useState("");
  const auth = useAuth();

  const handleNombreChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleContrasenaChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContrasena(event.target.value);
  };

  const handleGuardarCambios = () => {
    console.log('Guardando cambios:', { email, contrasena, imagenPerfil });
  };

  useEffect(() => {
    getImageProfile();
  }, []);

  async function getImageProfile() {
    try {
      const id = auth.getUser()?.id;
      const response = await fetch(`http://localhost:5000/api/getImage/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener la imagen de perfil: ' + response.statusText);
      }

      const data = await response.json();

      if (!data.imageProfile) {
        throw new Error('Error: La respuesta del servidor no contiene la URL de la imagen de perfil');
      }

      setDownloadURL(data.imageProfile);
    } catch (error) {
      const defaultImageUrl = 'https://static.vecteezy.com/system/resources/previews/003/337/584/large_2x/default-avatar-photo-placeholder-profile-icon-vector.jpg';
      setDownloadURL(defaultImageUrl);
      console.error('Error al obtener la imagen de perfil:', error);
    }
  }

  async function handleProfileImageChange(files: FileList | null) {
    try {
      if (!files || files.length === 0) {
        console.error("No se seleccionó ningún archivo");
        return;
      }

      const file = files[0];
      const formData = new FormData();
      formData.append("file", file);

      const responsePost = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
        body: formData,
      });

      if (!responsePost.ok) {
        console.error(
          "Error al cambiar la imagen de perfil:",
          responsePost.statusText
        );
        return;
      }

      const data = await responsePost.json();
      setDownloadURL(data.downloadURL);
      getImageProfile();
    } catch (error) {
      console.error("Error al cambiar la imagen de perfil:", error);
    }
  }

  return (
    <>
      <PortalLayout >
      <section className='Container-father-PerfilUsuario'>
        <div className="Container-text-PerfilUsuario">
          <div className={`Perfil-Editar ${auth.getUser()?.roll === 'Profesional' ? 'Shared-Styles' : 'Cliente-Styles'}`}>
            <div className="profile-header" onClick={() => setEditingProfileImage(true)}>
              <div className="position-Btn">
                <input
                  type="file"
                  id="profileImageInput"
                  style={{ display: "none" }}
                  onChange={(e) => handleProfileImageChange(e.target.files)}
                />
                <label className={auth.getUser()?.roll === "Profesional" ? "button" : "button-cliente"} style={{ color: "black" }} htmlFor="profileImageInput">+</label>
              </div>
              {downloadURL ? (
                <img
                  src={downloadURL}
                  alt="Perfil"
                  className={` ${auth.getUser()?.roll === 'Profesional' ? 'profile-image' : 'profile-cliente'}`}
                />
              ) : null}
            </div>
          </div>
          <div className={`Card-PerfilUsuario ${auth.getUser()?.roll === 'Profesional' ? 'Shared-Styles' : 'Cliente-Styles'}`}>
            <h2 className='h2-Editar'>Editar Perfil</h2>
            <label htmlFor="name">Nombre:</label>
            <input type="text" id='nombre' value={name} onChange={handleNombreChange} placeholder="Ingrese su nuevo Nombre" />
            <label htmlFor="email">Correo Electronico:</label>
            <input type="text" id="email" value={email} onChange={handleEmailChange} placeholder="Ingrese su nuevo Correo Electrónico" />
            <label htmlFor="contrasena">Contraseña:</label>
            <input type="password" id="contrasena" value={contrasena} onChange={handleContrasenaChange} placeholder="Ingrese su nueva contraseña" />
            <button className='BtnEditar' onClick={handleGuardarCambios}>Guardar Cambios</button>
          </div>
        </div>
      </section>
      </PortalLayout>
    </>
  );
}
export default Editar;
