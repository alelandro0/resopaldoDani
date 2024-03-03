import React, { useEffect, useState } from 'react';
import { PortalLayout } from "../layout/PortalLayout";
import { useAuth } from "../Autentication/AutProvider";
import Chat from "./ChatButton"
import "./dashboard.css";
import { useRef } from 'react';
import Modal from 'react-modal'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

type Publicacion = {
  id: string;
  image: string;
  name: string;
  description: string;

};
type allUserPost = {

  _id: string;
  image: string;
  description: string;
  name: string;
};

export default function Dashboard() {
  const auth = useAuth();
  const roll = auth.getUser()?.roll
  const [, setEditingProfileImage] = useState(false);
  const [downloadURL, setDownloadURL] = useState("");
  const [description, setDescription] = useState("");
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null); // Referencia para el input de tipo file
  const descriptionTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [agendarModalIsOpen, setAgendarModalIsOpen] = useState(false);

  const [currenImage, setCurrenImage] = useState('')
  const [idPublicacion, setCurrentPublicationId] = useState('')
  const [publicacionesUsuarios, setPublicacionesUsuarios] = useState<allUserPost[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const [descripcionCita, setDescripcionCita] = useState('');
  const [transparentBackground, setTransparentBackground] = useState(false);
  
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [fechas, setfecha] = useState(Date)
  const [horas, setHoras] = useState('')
  const [name, setName] = useState('')
  const [descripcionP, setdeProfesion] = useState('')

  useEffect(() => {
    // Ocultar el ul al inicio de la aplicación
    setIsVisible(false);
    setTransparentBackground(false)

    // Lógica para obtener las publicaciones de todos los usuarios
    getPublishAllUsers();
  }, []);


  useEffect(() => {
    getImageProfile()// Llama a la función para obtener la imagen de perfil cuando el componente se monta
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // El arreglo de dependencias vacío garantiza que el efecto se ejecute solo una vez
  useEffect(() => {
    // Modal.setAppElement('body')
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


      console.log('estas son las  de un usuario', publicacionesOrdenadas);
     
      setPublicaciones(publicacionesOrdenadas);
     
    } catch (error) {
      if (typeof error === 'string') {
        setError(error);
      } else {
        console.log("error al treer la publicacion");
        await Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Ocurrió un error al mostrar la publicacion.',

        });
      }
    }
  };
  const modalHandler = (isOpen: boolean, image: string, publicationId: string, descripcion: string, nombre: string) => {
    setModalIsOpen(isOpen)
    setCurrenImage(image)
    setCurrentPublicationId(publicationId);
    setDescription(descripcion);
    setName(nombre);
    setTransparentBackground(true);
  }
  const deleteHandler = async () => {
    try {

      const imageIDToDelete = idPublicacion

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
      await Swal.fire({
        icon: 'success',
        title: '¡Imagen eliminada exitosamente!',
        showConfirmButton: false,
        timer: 1500
      });
      obtenerTodasLasPublicaciones()
      getPublishAllUsers()
      // Aquí puedes realizar cualquier actualización de estado o acción necesaria después de la eliminación

    } catch (error) {
      console.error('Error al eliminar la imagen:', error);
      await Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Ocurrió un error al eliminar la imagen. Por favor, inténtalo de nuevo más tarde.',
        confirmButtonText: 'OK'
      });
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
      console.log('este es data de la publicacion traida todos ', publicacionesOrdenadas);
    } catch (error) {
      if (typeof error === 'string') {
        setError(error);
      } else {
        console.log("error al treer la publicacion all");
        await Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Ocurrió un error al traer las publicaciones.',

        });
      }
    }
  };
  const modalHandlerAgendar = (isOpenAge: boolean, date: string, hora: string, descripcionCita: string) => {
    setAgendarModalIsOpen(isOpenAge)
    setfecha(date)
    setHoras(hora)
    setdeProfesion(descripcionCita)
  }
  const handleAgendarCita = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = {

        nombre: name,
        description: descripcionCita,
        date: fechas,
        hora: horas,
        userId: idPublicacion,
        id: auth.getUser()?.id  // Asegúrate de obtener este valor de donde corresponda
      };

      const response = await fetch(`http://localhost:5000/api/citas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Error al agendar la cita');
      }

      const data = await response.json();
      await Swal.fire({
        icon: 'success',
        title: '¡Cita Agendada Exitosamente!',
        showConfirmButton: false,
        timer: 1500
      });
      console.log('Cita agendada satisfactoriamente:', data);
      // Aquí puedes realizar cualquier acción adicional después de agendar la cita, como mostrar un mensaje de éxito.
    } catch (error) {
      console.error('Error al agendar la cita:', error);
      await Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Ocurrió un error al Agendar la Cita. Por favor, inténtalo de nuevo más tarde.',

      });
      // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje de error al usuario.
    }
  };


  return (
    <PortalLayout>
      <div className="perfil">
        <div className="profile-header" onClick={() => setEditingProfileImage(true)}>
          <div className={transparentBackground ?"opaque": ""}>
            <input
              type="file"
              id="profileImageInput"
              style={{ display: "none" }}
              onChange={(e) => handleProfileImageChange(e.target.files)}
            />
              <label className={auth.getUser()?.roll=== 'Cliente' || transparentBackground ? "button-cliente transparent":"button-profesional transparent"} style={{ color: "black" }} htmlFor="profileImageInput">
            </label>
          </div>
          {downloadURL ? (
            <img
              src={downloadURL}
              alt="Perfil"
              className={auth.getUser()?.roll === 'Profesiona' ? "profile-image" : "profile-cliente"}
            />
          ) : null}
        </div>
        <div className='container-father-publiText'>
          <form className="publiText" encType="multipart/form-data" onSubmit={postPublication}>
            {roll === 'Profesional' ? (
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
            ) : (
              <h1 style={{ fontSize: 25, marginTop: '-30px' }}>Cambiar Imagen</h1>
            )}
          </form>
          <div className='public'>
            <form encType="multipart/form-data" onSubmit={handleFormSubmitFalse} style={{ alignSelf: "flex-end", flexDirection: "row-reverse" }}>
              {roll !== 'Cliente' ? (
                <div>
                  <button className="btn btn-secondary m-2" type="submit">Mis publicaciones</button>
                </div>) : (null)}
            </form>
            <form className="m-2" encType="multipart/form-data" onSubmit={handleFormSubmit} style={{ display: 'flex' }}>
              {roll !== 'Cliente' ? (
                <div style={{ alignItems: '' }}>

                  <button className="btn btn-secondary" type="submit">Ver todo</button>
                </div>) : (null)}
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
                  modalHandler(true, publicacion?.image, publicacion?.id, publicacion?.description, publicacion?.name)
                }} className='btn btn-dark'>Ver</button>
              </div>
              
              <p className='decription'>{publicacion?.description}</p>
              <img className='card-image' src={publicacion?.image} alt="" /><br /><br />
              <div className="btn-container">

              </div>
              <Modal className='card' style={{ content: { width: '50%', margin: '0 auto', marginTop: '100px' } }} isOpen={modalIsOpen} onRequestClose={() => modalHandler(false, '', '', '', '',)}>
                <div >
                  <div className='card-body' style={{ display: 'flex', justifyContent: 'space-between', width: "100%" }}>
                    <button onClick={() => deleteHandler()} className='btn btn-danger'>ELIMINAR</button>
                    <button className='btn btn-danger' onClick={() => modalHandler(false, '', '', '', '')}>X</button>
                  </div>
                  <img style={{ padding: 10, width: '100%' }} src={currenImage || ''} alt="" />
                </div>
              </Modal>
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
                      <h2 className='nameUser'>{(publicacion.name) ?? ""}</h2>
                      <button onClick={() => {
                        modalHandler(true, publicacion?.image, publicacion?.id, publicacion?.description, publicacion?.name)
                      }} className='btn btn-dark'>Ver</button>
                    </div>
                    
                    <p className='decription'>{publicacion?.description}</p>
                    <img className='card-image p-3 ' src={publicacion?.image} alt="" />
                    {/* <button className='citas'></button><h4>AGENDA</h4> */}
                  </li>
                ))
              ))}
            </ul>
            <Chat />
          </div>
        </section>
      )}

      <Modal className='card' style={{ content: { width: '50%', margin: '0 auto', marginTop: '100px' } }} isOpen={modalIsOpen} onRequestClose={() => modalHandler(false, '', '', '', '')}>
        <div >
          <div className='card-body' style={{ display: 'flex', justifyContent: 'space-between', width: "100%" }}>
            <button className='btn btn-dark' onClick={() => modalHandlerAgendar(true, fechas, horas, descripcionP)}>Agendar</button>
            
            <button className='btn btn-danger' onClick={() => modalHandler(false, '', '', '', '')}>X</button>

          </div>
          <img style={{ padding: 10, width: '100%' }} src={currenImage || ''} alt="" />
        </div>
      </Modal>
      <Modal className='card' style={{ content: { width: '30%', margin: '0 auto', marginTop: '100px' } }} isOpen={agendarModalIsOpen} onRequestClose={() => modalHandlerAgendar(false, '', '', '')}>
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div className='modal-header mt-5' style={{ backgroundColor: 'gray', color: 'white' }}>
              <h5 className='modal-title mx-4'>Agendar Cita  Con : {name || 'sin nombre'}</h5>
              <button type='button' className='btn btn-danger' onClick={() => modalHandlerAgendar(false, '', '', '')}>X</button>
            </div>
            <div className='modal-body'>
              <form onSubmit={handleAgendarCita} className="modal-body">
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">Fecha:</label>
                  <input type="date" className="form-control" id="date" name="date" value={fechas} onChange={(e) => setfecha(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="time" className="form-label">Hora:</label>
                  <input type="time" className="form-control" id="time" name="time" value={horas} onChange={(e) => setHoras(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Descripción:</label>
                  <textarea className="form-control" id="description" name="description" value={descripcionCita} onChange={(e) => setDescripcionCita(e.target.value)} required></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{ backgroundColor: 'gray', color: 'white' }}>Agendar</button>
              </form>
            </div>
          </div>
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