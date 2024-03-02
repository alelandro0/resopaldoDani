
import { PortalLayout } from '../layout/PortalLayout'; 
import { useAuth } from "../Autentication/AutProvider";
import './EditarPerfil.css';
import  { useEffect, useState, ChangeEvent } from 'react';

export const EditarPerfil = () => {
  // Estado local para gestionar los valores de los campos
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [imagenPerfil, ] = useState('');
  const [, setEditingProfileImage] = useState(false);
  const [downloadURL, setDownloadURL] = useState("");
  const auth = useAuth();

  // Función para manejar el evento de cambio en el campo de nombre
  const handleNombreChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  // Funcion para manejar el evento de cambio en el campo de email.
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  // Función para manejar el evento de cambio en el campo de contraseña
  const handleContrasenaChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContrasena(event.target.value);
  };

  // Función para manejar el evento de cambio en la imagen de perfil

  // Función para manejar el evento de clic en el botón de guardar cambios
  const handleGuardarCambios = () => {
    // Aquí puedes implementar la lógica para guardar los cambios en la base de datos o realizar otras acciones necesarias
    console.log('Guardando cambios:', { email, contrasena, imagenPerfil });
  };

  useEffect(() => {
    getImageProfile()// Llama a la función para obtener la imagen de perfil cuando el componente se monta
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // El arreglo de dependencias vacío garantiza que el efecto se ejecute 

  async function getImageProfile() {
    try {
      console.log('este es el token => ', auth.getAccessToken());
      const id = auth.getUser()?.id

      console.log('ID of user Profile', id);
      const response = await fetch(`http://localhost:5000/api/getImage/${id}`, {
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
      console.log('Editar perfil', data);

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
  async function handleProfileImageChange(files: FileList | null) {
    try {
      if (!files || files.length === 0) {
        console.error("No se seleccionó ningún archivo");
        return;
      }

      const file = files[0];
      const formData = new FormData();
      formData.append("file", file);
      console.log('post TOKEN ', auth.getAccessToken());


      // Subir la nueva imagen
      const responsePost = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
        body: formData,
      });
      console.log('POST perfil ', responsePost);

      if (!responsePost.ok) {
        console.error(
          "Error al cambiar la imagen de perfil:",
          responsePost.statusText
        );
        return;
      }

      const data = await responsePost.json();
      console.log("Respuesta del servidor POST:", data.downloadURL);

      // Después de cargar la nueva imagen, actualizar la imagen de perfil
      setDownloadURL(data.downloadURL);
      getImageProfile()
    } catch (error) {
      console.error("Error al cambiar la imagen de perfil:", error);
    }
  }

  return (
    <>
      <PortalLayout >
      <section className='Container-father-PerfilUsuario'>
        <div className="Container-text-PerfilUsuario">
          <div className="Perfil-Editar">
            <div className="profile-header" onClick={() => setEditingProfileImage(true)}>
              <div className="position-Btn">
                <input
                  type="file"
                  id="profileImageInput"
                  style={{ display: "none" }}
                  onChange={(e) => handleProfileImageChange(e.target.files)}
                />
               
              </div>
              {downloadURL ? (
                <img
                  src={downloadURL}
                  alt="Perfil"
                  className={auth.getUser()?.roll === 'Profesional' ? "profile-image" : "profile-cliente"}
                />
              ) : null}
            </div>
          </div>
          <div className="Card-PerfilUsuario">
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

export default EditarPerfil;
