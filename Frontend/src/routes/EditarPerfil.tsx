import { PortalLayout } from '../layout/PortalLayout'; 
import { useAuth } from "../Autentication/AutProvider";
import './EditarPerfil.css';
import { useEffect, useState, ChangeEvent } from 'react';
import React from 'react';
import { API_URL } from '../Autentication/constanst';
import Chat from './ChatButton';

export const EditarPerfil = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
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

  const handleGuardarCambios = async () => {
    try {
      const response = await fetch(`${API_URL}/perfil/${auth.getUser()?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
        body: JSON.stringify({ name, username: email, password: contrasena }),
      });

      if (response.ok) {
        console.log('Perfil actualizado exitosamente');
        setModalMessage("Perfil actualizado exitosamente");
        setShowModal(true);
      } else {
        const responseData = await response.json();
        if (response.status === 500) {
          setModalMessage("Usuario o correo ya existente, intente otros datos");
          setShowModal(true);
        }
         else if (response.status === 400) {
          if (responseData.mensaje.includes("contraseña")) {
            setModalMessage("La contraseña debe tener al menos 6 caracteres");
          } else {
            setModalMessage("Intente ingresar otros datos");
          }
        }
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      setModalMessage("Error al actualizar el perfil: " + error.message);
      setShowModal(true);
    }
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

  const closeModal = () => {
    setShowModal(false);
    setModalMessage("");
  };

  return (
    <PortalLayout >
      <section className='Container-father-PerfilUsuario'>
        <div className="Container-text-PerfilUsuario">
          <div className="Perfil-Editar">
            <div className="profile-header">
              <div className="position-Btn">
                <input
                  type="file"
                  id="profileImageInput"
                  style={{ display: "none" }}
                />
              </div>
              {downloadURL ? (
                <img
                  src={downloadURL}
                  alt="Perfil"
                  className='perfil-editar'
                />
              ) : null}
            </div>
          </div>
          <div className="Card-PerfilUsuario">
            <h2 className='h2-Editar'>Editar Perfil</h2>

            <label htmlFor="name">Nombre:</label>
            <input type="text" id='nombre' value={name} onChange={handleNombreChange} placeholder="Ingrese su nuevo Nombre" />

            <label htmlFor="email">Correo Electrónico:</label>
            <input type="text" id="email" value={email} onChange={handleEmailChange} placeholder="Ingrese su nuevo Correo Electrónico" />

            <label htmlFor="contrasena">Contraseña:</label>
            <input type="password" id="contrasena" value={contrasena} onChange={handleContrasenaChange} placeholder="Ingrese su nueva contraseña" />
            <button className='BtnEditar' onClick={handleGuardarCambios}>Guardar Cambios</button>
          </div>
        </div>
      </section>
      {showModal && (
        <div className="modal2">
          <div className="modal2-content">
            <p>{modalMessage}</p>
            <button className='accept-btn' onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
      <Chat/>
    </PortalLayout>
  );
}

export default EditarPerfil;
