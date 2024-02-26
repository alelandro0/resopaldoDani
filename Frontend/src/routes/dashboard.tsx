import React, { useEffect, useState } from 'react';
import { PortalLayout } from "../layout/PortalLayout";
import { useAuth } from "../Autentication/AutProvider";
//import  Chat from "./ChatButton"
import "./dashboard.css";
import { useRef } from 'react';
import Modal from 'react-modal'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

type Publicacion = {
  image: string;
  description: string;
  _id: string;
};
type allUserPost = {
  image: string;
  description: string;
  _id: string;
  name: string;
};

export default function Dashboard() {
  const auth = useAuth();
  const roll =auth.getUser()?.roll
  const [, setEditingProfileImage] = useState(false);
  const [downloadURL, setDownloadURL] = useState("");
  const [description, setDescription] = useState("");
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null); // Referencia para el input de tipo file
  const descriptionTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [currenImage, setCurrenImage] = useState('')
  const [, setCurrentPublicationId] = useState('')
  const [publicacionesUsuarios, setPublicacionesUsuarios] = useState<allUserPost[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Ocultar el ul al inicio de la aplicación
    setIsVisible(false);


    // Lógica para obtener las publicaciones de todos los usuarios
    getPublishAllUsers();
  }, []);


  useEffect(() => {
    getImageProfile()// Llama a la función para obtener la imagen de perfil cuando el componente se monta
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // El arreglo de dependencias vacío garantiza que el efecto se ejecute solo una vez
  useEffect(() => {
    Modal.setAppElement('body')
    obtenerTodasLasPublicaciones()// Llama a la función para obtener la imagen de perfil cuando el componente se monta
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFormSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // Agrega aquí la lógica para obtener todas las publicaciones
    // Puedes llamar a la función que obtiene las publicaciones aquí
    // Por ejemplo: await getPublishAllUsers();
    setIsVisible(false); // Muestra la lista de publicaciones después de obtenerlas
  };

  const handleFormSubmitFalse = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // Agrega aquí la lógica para obtener todas las publicaciones
    // Puedes llamar a la función que obtiene las publicaciones aquí
    // Por ejemplo: await getPublishAllUsers();
    setIsVisible(true); // Muestra la lista de publicaciones después de obtenerlas
  };

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
  // AGREGAR PUBLICACION

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
      getPublishAllUsers();

      // Realizar cualquier acción necesaria después de cargar la nueva publicación
      // setFile(data.file);
      fileInputRef.current.value = ''; // Limpiar el input de tipo file
      setDescription('');
      console.log('url de imagen publicada',);

    } catch (error) {
      console.error("Error al cargar la imagen publicada:", error);
    }
  }
  //OBTENER PUBLICACION
  const obtenerTodasLasPublicaciones = async () => {
    try {
      const accessToken = auth.getAccessToken();
      console.log('token de obtener la publicada ', accessToken);
      console.log('elemetos de user', auth.getUser());



      const id = auth.getUser()?.id
      console.log('ID of user', id);
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

      console.log('estas son las puplicaiones en el orden que se debe revisar', publicacionesOrdenadas);

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
  const modalHandler = (isOpen: boolean, image: string, publicationId: string) => {
    setModalIsOpen(isOpen)
    setCurrenImage(image)
    setCurrentPublicationId(publicationId);
  }
  const deleteHandler = async () => {
    try {
      // Obtener los IDs de las imágenes de las publicaciones del usuario
      const imageIDs = auth.getUser()?.publication.map(pub => pub._id);

      // Validar si existe la imagen actual en las publicaciones del usuario
      if (!imageIDs || !currenImage) {
        console.error('No se puede eliminar la imagen actual porque no se ha seleccionado una imagen válida.');
        return;
      }

      // Encontrar el ID de la imagen actual en las publicaciones del usuario
      const imageIDToDelete = imageIDs.find(id => id === currenImage);

      if (!imageIDToDelete) {
        console.error('No se encontró el ID de la imagen actual en las publicaciones del usuario.');
        return;
      }

      // Realizar la eliminación de la imagen utilizando su ID
      const idUser = auth.getUser()?.id;
      const response = await fetch(`http://localhost:5000/api/delete/${idUser}/publications/${imageIDToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la imagen.');
      }

      console.log('Imagen eliminada exitosamente.');
      // Aquí puedes realizar cualquier actualización de estado o acción necesaria después de la eliminación

    } catch (error) {
      console.error('Error al eliminar la imagen:', error);
    }
  };
  const getPublishAllUsers = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/publicationgetAll`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      console.log('GET publicaciones', response);

      if (!response.ok) {
        throw new Error('Error al obtener todas las publicaciones all');
      }
      const data = await response.json();

      // Ordenar las publicaciones por fecha de forma descendente
      const publicacionesOrdenadas = data.publications.slice().reverse();

      console.log('estas son las puplicaiones en el orden que se debe revisar all', publicacionesOrdenadas);

      setPublicacionesUsuarios(publicacionesOrdenadas);
      console.log('este es data de la publicacion traida all ', publicacionesOrdenadas);
    } catch (error) {
      if (typeof error === 'string') {
        setError(error);
      } else {
        console.log("error al treer la publicacion all");
      }
    }
  };

  
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
            <label className={auth.getUser()?.roll==="Profesional"?"button":"button-cliente"} style={{ color: "black" }} htmlFor="profileImageInput">+
            </label>
          </div>
          {downloadURL? (
            <img
              src={downloadURL}
              alt="Perfil"
              className={auth.getUser()?.roll ==='Profesiona'? "profile-image":"profile-cliente"}
            />
          ) : null}
        </div>
        <div className='container-father-publiText'>
          <form className="publiText" encType="multipart/form-data" onSubmit={postPublication}>
            {roll=== 'Profesional'?(
            <div className='post'>
              <input type="file"
                ref={fileInputRef}
                name="file"
                style={{ display: "none" }}
                id='Publicacion' />
              <label className='publicacion' htmlFor="Publicacion"></label>
              <textarea
                className="textarea"
                name="description"
                placeholder="Escribe nueva publicacion"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                ref={descriptionTextareaRef} />
              {error && <p>Error: {error}</p>}
              <button
                className="btn-btn-dark-my-2 mx-2 p-2"
                type="submit">Publicar</button>
            </div>
            ):(
              <h1>Servicios Publicados</h1>
            )}
          </form>
          <div>
            <form className="publiText" encType="multipart/form-data" onSubmit={handleFormSubmitFalse} style={{ alignSelf: "flex-end", flexDirection: "row-reverse" }}>
              {roll!=='Cliente'?(
              <div>
                <h3 style={{fontSize: '20px'}}>Mis publicaciones </h3>
                <button className="btnViewAll" type="submit"></button>
              </div>):(null)}
            </form>
            <form className="VerTodo" encType="multipart/form-data" onSubmit={handleFormSubmit} style={{ display: 'flex'}}>
            {roll!=='Cliente'?(
              <div style={{ alignItems: '' }}>
                <h3 style={{ color: 'black', margin: 0, fontSize: '20px' }}>Ver todo</h3>
                <button className="btnViewAll" type="submit"></button>
              </div>):(null)}
            </form>
          </div>
        </div>
      </div>  
      {isVisible ? (
  <ul className='collageImage'>
    {publicaciones.map((publicacion, index) => (
      <li className='card' key={index}>
        <div className='delete'>
          <div className='Perfile-img'>
            <img src="" alt="" />
          </div>
          <h2>{auth.getUser()?.name ?? ""}</h2>
          <button onClick={() => {
            modalHandler(true, publicacion.image, publicacion._id)
          }} className='btn btn-dark'>Ver</button>
        </div>
        <p className='decription'>{publicacion.description}</p>
        <img className='card-image' src={publicacion.image} alt="" /><br/><br/>
        <div className="btn-container">
          <button className="citas-perfile">Agendar</button>
        </div>
      </li>
    ))}
  </ul>
) : (
  <section className='Container' id='galeri'>
    <div className='text-center pt-5'>
      <ul className='row'>
      {Array.isArray(publicacionesUsuarios) && publicacionesUsuarios.map((usuarioPublicaciones, index) => (
        Array.isArray(usuarioPublicaciones) && usuarioPublicaciones.map((publicacion, subIndex) => (
            <li className='col-lg-4 list-unstyled mb-4 ' key={`${index}-${subIndex}`}>
              <div className='delete'>
                <h2 className='nameUser'>{publicacion.name ?? ""}</h2>
                <button onClick={() => {
                  modalHandler(true, publicacion.image, publicacion._id)
                }} className='btn btn-dark'>Ver</button>
              </div>
              <p className='decription'>{publicacion.description}</p>
              <img className='card-image p-3 ' src={publicacion.image} alt="" />
              {/* <button className='citas'></button><h4>AGENDA</h4> */}
            </li>
          ))
        ))}
      </ul>
    </div>
  </section>
)}
          
      <Modal className='card' style={{ content: { width: '50%', margin: '0 auto', marginTop: '100px' } }} isOpen={modalIsOpen} onRequestClose={() => modalHandler(false, '', '')}>
        <div >
          <div className='card-body' style={{ display: 'flex', justifyContent: 'space-between', width: "100%" }}>
            <button onClick={() => deleteHandler()} className='btn btn-danger'>ELIMINAR</button>
            <button className='btn btn-danger' onClick={() => modalHandler(false, '', '')}>X</button>
          </div>
          <img style={{ padding: 10, width: '100%' }} src={currenImage || ''} alt="" />
        </div>
      </Modal>

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