import React, { useEffect, useState } from 'react';
import {PortalLayout} from "../layout/PortalLayout";
import { useAuth } from "../Autentication/AutProvider";
import "./dashboard.css";
import { useRef } from 'react';
type Publicacion = {
  image: string;
  description: string;
  _id:string;
};

export default function Dashboard() {
  const auth = useAuth();
  
  const [, setEditingProfileImage] = useState(false);
  const [downloadURL, setDownloadURL] = useState("");
  const [description, setDescription] = useState("");
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null); // Referencia para el input de tipo file
  const descriptionTextareaRef = useRef<HTMLTextAreaElement>(null);
  


   

  useEffect(() => {
    getImageProfile()// Llama a la función para obtener la imagen de perfil cuando el componente se monta
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // El arreglo de dependencias vacío garantiza que el efecto se ejecute solo una vez
  useEffect(() => {
    obtenerTodasLasPublicaciones()// Llama a la función para obtener la imagen de perfil cuando el componente se monta
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  

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
       console.log('POST perfil ',responsePost);
       
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
      const id=  auth.getUser()?.id
      
      console.log('ID of user Profile',id);
      const response = await fetch(`http://localhost:5000/api/getImage/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
      });
         console.log('GET perfil',response);
         
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
      console.error('Error al obtener la imagen de perfil:', error);
    }
    //
  }

  async function postPublication(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  
    try {
      const formData = new FormData();
  
      // Obtener el archivo seleccionado del input de tipo file
      const files = fileInputRef.current?.files;
  
      // Obtener el valor del textarea
      const description = descriptionTextareaRef.current?.value;
  
      // Agregar la descripción al FormData
      formData.append('description', description || '');
  
      if (!files || files.length === 0) {
        console.error('No se han seleccionado archivos.');
        return;
      }
  
      // Agregar el archivo al FormData
      for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
      }
  
      const accessToken = auth.getAccessToken();
      console.log('Token de publicacion', accessToken);
  
      const response = await fetch("http://localhost:5000/api/publicationpost", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });
  
      console.log('POST publicacion:', response);
  
      if (!response.ok) {
        console.error("Error al cargar la imagen de publicación:", response.statusText);
        return;
      }
  
      const data = await response.json();
      console.log("Respuesta del servidor al subir publicacion POST:", data);
  
      // Actualizar la lista de publicaciones después de la publicación exitosa
      obtenerTodasLasPublicaciones();
  
      // Realizar cualquier acción necesaria después de cargar la nueva publicación
      // setFile(data.file);
      fileInputRef.current.value = ''; // Limpiar el input de tipo file
      setDescription('');
      console.log('url de imagen publicada',);
  
    } catch (error) {
      console.error("Error al cargar la imagen publicada:", error);
    }
  }
  
  const obtenerTodasLasPublicaciones = async () => {
    try {
      const accessToken = auth.getAccessToken();
      console.log('token de obtener la publicada ', accessToken);
     console.log('elemetos de user',auth.getUser());
    
     
     
      const id= auth.getUser()?.id
      console.log('ID of user',id);
      const response = await fetch(`http://localhost:5000/api/publicationget/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('GET publicaciones', response);
  
      if (!response.ok) {
        throw new Error('Error al obtener todas las publicaciones');
      }
      const data = await response.json();
  
      // Ordenar las publicaciones por fecha de forma descendente
      const publicacionesOrdenadas = data.publications.slice().reverse();

      console.log( 'estas son las puplicaiones en el orden que se debe revisar',publicacionesOrdenadas);
      
      setPublicaciones(publicacionesOrdenadas);
      console.log('este es data de la publicacion traida ', publicacionesOrdenadas);
  
    } catch (error) {
      if (typeof error === 'string') {
        setError(error);
      } else {
        console.log("error al treer la publicacion");
      }
    }
  };
  async function handleDeletePublication(publicationId:string) {
    try {
       const idPublicacion= auth.getUser.publicacion
      console.log('ID de la publicación a eliminar:', publicationId);
      

      const accessToken = auth.getAccessToken();
      const response = await fetch(`http://localhost:5000/api/delete/${auth.getUser()?.id}/publications/${publicationId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
       console.log('metodo eliminar',response);
       
      if (!response.ok) {
        throw new Error('Error al eliminar la publicación');
      }
  
      // Actualizar la lista de publicaciones después de eliminar
      obtenerTodasLasPublicaciones();
    } catch (error) {
      console.error('Error al eliminar la publicación:', error);
    }
  }
  
  


  return (
    <PortalLayout>
      <div className="perfil">
        <div className="profile-header" onClick={() => setEditingProfileImage(true)}>
          <div className="position-Btn">
            <input
              type="file"
              id="profileImageInput"
              style={{ display: "none" }}
              onChange={(e) => handleProfileImageChange(e.target.files)}
            />
            <label className="button" style={{ color: "black" }} htmlFor="profileImageInput">
            </label>
          </div>

          {downloadURL ? (
            <img
              src={downloadURL}
              alt="Perfil"
              className="profile-image"
            />
          ) : null}
        </div>

        <form className="publiText" encType="multipart/form-data" onSubmit={postPublication}>
          <input type="file"
            ref={fileInputRef}
            name="file" 
            style={{ display: "none" }}
            id='Publicacion'/>
            <label className='publicacion' htmlFor="Publicacion"></label>

          <textarea
            className="textarea"
            name="description"
            placeholder="Escribe nueva publicacion"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            ref={descriptionTextareaRef} />
          <h2 style={{ color: 'black', marginTop: '60px' }}>Publicaciones </h2>
          {error && <p>Error: {error}</p>}
          <button
            className="btnPublication"
            type="submit"></button>
        </form>
      </div>
      
      <ul className='collageImage'>
     
        {publicaciones.map((publicacion, index) => (
          <li className='card' key={index}>
          <div className='delete'>
            <h2> {auth.getUser()?.name ?? ""}</h2> 
            <button className='recycle' 
            onClick={() => handleDeletePublication(publicacion._id)}>
              </button>
              </div>
            <p className='decription'> {publicacion.description}</p>
            <img className='card-image' src={publicacion.image} alt="" />
            <button className='citas'></button><h4>AGENDA</h4>
          </li>
        ))}
      </ul>

    </PortalLayout>
  );  
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
// function setFile(_file: any) {
//   throw new Error("Function not implemented.");
// }

// module.exports = {
//   "rules": {
//     "no-unused-vars": "on",
//     "@typescript-eslint/no-unused-vars": "error"
//   }
// };