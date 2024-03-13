/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import './perfil.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../Autentication/AutProvider';
import { API_URL } from '../../../Autentication/constanst';



const UserProfile = () => {
  const [downloadURL, setDownloadURL] = useState("");
  const [, setEditingProfileImage] = useState(false);
  const [downloadURLPortada, setDownloadURLPortada] = useState("");





  const auth = useAuth();
  useEffect(() => {
    getImageProfile()// Llama a la función para obtener la imagen de perfil cuando el componente se monta
    // eslint-disable-next-line react-hooks/exhaustive-deps
    getImagePortda()
  }, []);


  async function handleProfileImageChange(files) {
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
  async function handlePortdaImageChange(files) {
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
      const responsePost = await fetch(`${API_URL}/portada`, {
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
      console.log("Respuesta del servidor POST:", data.downloadURLPortada);

      // Después de cargar la nueva imagen, actualizar la imagen de perfil
      setDownloadURLPortada(data.downloadURLPortada);
      getImagePortda()
    } catch (error) {
      console.error("Error al cambiar la imagen de perfil:", error);
    }
  }
  async function getImagePortda() {
    try {
      console.log('este es el token => ', auth.getAccessToken());
      const id = auth.getUser()?.id

      console.log('ID of user Profile', id);
      const response = await fetch(`${API_URL}/portadaGet/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
      });
      console.log('GET perfil', response);

      if (!response.ok) {
        throw new Error('Error al obtener la imagen de portdad: ' + response.statusText);
      }

      const data = await response.json();
      console.log('==> este es data de get portada', data);
      console.log('imagen de portada', data.portada);
      if (!data.portada) { // Cambio aquí de data.downloadURL a data.imageProfile
        throw new Error('Error: La respuesta del servidor no contiene la URL de la imagen de perfil');
      }

      setDownloadURLPortada(data.portada); // Cambio aquí de data.downloadURL a data.imageProfile
      console.log('URL de la imagen de portad obtenida:', data.portada); // Cambio aquí de data.downloadURL a data.imageProfile
    } catch (error) {
      console.error('Error al obtener la imagen de portada:', error);
    }
    //
  }
  return (
    <div className='profile-container relative  '><section className="seccion-perfil-usuario ">
      <div className="perfil-usuario-header">
        <div className="perfil-usuario-portada " style={{ margin: 30 }} >
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={(e) => handleProfileImageChange(e.target.files)}
          />
          <div className="perfil-usuario-avatar relative z-10" onClick={() => setEditingProfileImage(true)}>
            <img src={downloadURL} alt="img-avatar" className="avatar-img " />
            <label htmlFor="fileInput" style={{ background: 'black' }}
              className="boton-avatar flex items-center justify-center"
              onClick={(e) => handleProfileImageChange(e.target.files)}>
              <FontAwesomeIcon icon={faImage} />
            </label>
          </div>

          <input
            type="file"
            id="PortadaInput"
            style={{ display: 'none' }}
            onChange={(e) => handlePortdaImageChange(e.target.files)}
          />

          <img src={downloadURLPortada} alt="img-portada" className="portada " />
          <label htmlFor="PortadaInput" className="boton-portada" >
            <FontAwesomeIcon icon={faImage} /> Cambiar fondo
          </label>
        </div>
      </div>
      <div className="perfil-usuario-body" style={{ width: '50%' }}>
        <div className="perfil-usuario-bio" style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <h2 className='info' style={{ color: 'black', marginBottom: '1rem' }}>Información Personal:</h2>
          </div>
          <div>
            <h2 className="Name" style={{ color: 'black' }}>Nombre: {auth.getUser()?.name}</h2>
          </div>
          <div>
            <p className="Phone" style={{ color: 'black' }}>Numero de celular: 3147109361</p>
          </div>
          <div>
            <p className="Email" style={{ color: 'black' }}>Correo Electronico: Torresgarciajuandavid7@gmail.com</p>
          </div>
        </div>
        <div className="Post-potfile">
          <h1 className="texto">Publicaciones {auth.getUser()?.publication.filter(pub => pub.estado === true).length}</h1>
        </div>
      </div>
      <div className="area-comentar">
        <div className="avatar">
          <img src="https://firebasestorage.googleapis.com/v0/b/react-firebase-upload-480ee.appspot.com/o/Avatar%2FC__Data_Users_DefApps_AppData_INTERNETEXPLORER_Temp_Saved%20Images_Cortes-de-cabello-para-hombre-4.jpg_1710158906965?alt=media&token=42f22ef9-e239-432b-b935-d293589e03b4" alt="img" />
        </div>
        <form action="#" method="post" className="inputs-comentarios">
          <textarea name="" className="area-comentario text-black " 
          placeholder="¿Que estas pensando?" style={{textAlign:'center',padding:2}} ></textarea>
          <div className="botones-comentar">
            <div className="boton-subir-archivo">
              <label className="boton-file" htmlFor="adjuntar">
                <i className="far fa-image"></i>
                Adjuntar archivo
              </label>
              <input type="file" name="" value="" placeholder="" id="adjuntar" />
            </div>
            <button className="boton-enviar" type="submit">
              <i className="fas fa-paper-plane"></i>
              Enviar
            </button>
          </div>
        </form>
      </div>
      <div style={{height:100}}></div>

    </section>

    </div>

  );
}

export default UserProfile;