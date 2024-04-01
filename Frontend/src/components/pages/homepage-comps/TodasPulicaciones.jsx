// import './perfil.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faImage, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
// import { useEffect, useState } from 'react';
// import { useAuth } from '../../../Autentication/AutProvider';
// import { API_URL } from '../../../Autentication/constanst';
// import { useRef } from 'react';
// import Modal from 'react-modal'

// const TodasPulicaciones = () => {
//     const [downloadURL, setDownloadURL] = useState("");
//     const [, setEditingProfileImage] = useState(false);
//     const [downloadURLPortada, setDownloadURLPortada] = useState("");
//     const [description, setDescription] = useState("");
//     const fileInputRef = useRef(null); // Utiliza useRef() para crear referencias
//     const descriptionTextareaRef = useRef(null);
//     const [publicaciones, setPublicaciones] = useState([]);
//     const [modalIsOpen, setModalIsOpen] = useState(false)
//     const [currenImage, setCurrenImage] = useState('')
//     const [idPublicacion, setCurrentPublicationId] = useState('')
//     const [name, setName] = useState('')
//     // const [horas, setHoras] = useState('')
//     // const [fechas, setfecha] = useState(Date)
  
  
//     const auth = useAuth();
//     useEffect(() => {
//       getImageProfile()// Llama a la función para obtener la imagen de perfil cuando el componente se monta
//       // eslint-disable-next-line react-hooks/exhaustive-deps
//       getImagePortda()
//       obtenerTodasLasPublicaciones()
  
//     }, []);
  
  
//     async function handleProfileImageChange(files) {
//       try {
//         if (!files || files.length === 0) {
//           console.error("No se seleccionó ningún archivo");
//           return;
//         }
  
//         const file = files[0];
//         const formData = new FormData();
//         formData.append("file", file);
//         console.log('post TOKEN ', auth.getAccessToken());
  
  
//         // Subir la nueva imagen
//         const responsePost = await fetch(`${API_URL}/upload`, {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${auth.getAccessToken()}`,
//           },
//           body: formData,
//         });
//         console.log('POST perfil ', responsePost);
  
//         if (!responsePost.ok) {
//           console.error(
//             "Error al cambiar la imagen de perfil:",
//             responsePost.statusText
//           );
//           return;
//         }
  
//         const data = await responsePost.json();
//         console.log("Respuesta del servidor POST:", data.downloadURL);
  
//         // Después de cargar la nueva imagen, actualizar la imagen de perfil
//         setDownloadURL(data.downloadURL);
//         getImageProfile()
//       } catch (error) {
//         console.error("Error al cambiar la imagen de perfil:", error);
//       }
//     }
//     async function getImageProfile() {
//       try {
//         console.log('este es el token => ', auth.getAccessToken());
//         const id = auth.getUser()?.id
  
//         console.log('ID of user Profile', id);
//         const response = await fetch(`${API_URL}/getImage/${id}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${auth.getAccessToken()}`,
//           },
//         });
//         console.log('GET perfil', response);
  
//         if (!response.ok) {
//           throw new Error('Error al obtener la imagen de perfil: ' + response.statusText);
//         }
  
//         const data = await response.json();
//         console.log('==> este es data de get', data);
  
//         if (!data.imageProfile) { // Cambio aquí de data.downloadURL a data.imageProfile
//           throw new Error('Error: La respuesta del servidor no contiene la URL de la imagen de perfil');
//         }
  
//         setDownloadURL(data.imageProfile); // Cambio aquí de data.downloadURL a data.imageProfile
//         console.log('URL de la imagen de perfil obtenida:', data.imageProfile); // Cambio aquí de data.downloadURL a data.imageProfile
//       } catch (error) {
//         const defaultImageUrl = 'https://static.vecteezy.com/system/resources/previews/003/337/584/large_2x/default-avatar-photo-placeholder-profile-icon-vector.jpg'; // Reemplaza con la URL de tu imagen por defecto
//         setDownloadURL(defaultImageUrl)
//         console.error('Error al obtener la imagen de perfil:', error);
//       }
//       //
//     }
//     async function handlePortdaImageChange(files) {
//       try {
//         if (!files || files.length === 0) {
//           console.error("No se seleccionó ningún archivo");
//           return;
//         }
  
//         const file = files[0];
//         const formData = new FormData();
//         formData.append("file", file);
//         console.log('post TOKEN ', auth.getAccessToken());
  
  
//         // Subir la nueva imagen
//         const responsePost = await fetch(`${API_URL}/portada`, {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${auth.getAccessToken()}`,
//           },
//           body: formData,
//         });
//         console.log('POST perfil ', responsePost);
  
//         if (!responsePost.ok) {
//           console.error(
//             "Error al cambiar la imagen de perfil:",
//             responsePost.statusText
//           );
//           return;
//         }
  
//         const data = await responsePost.json();
//         console.log("Respuesta del servidor POST:", data.downloadURLPortada);
  
//         // Después de cargar la nueva imagen, actualizar la imagen de perfil
//         setDownloadURLPortada(data.downloadURLPortada);
//         getImagePortda()
//       } catch (error) {
//         console.error("Error al cambiar la imagen de perfil:", error);
//       }
//     }
//     async function getImagePortda() {
//       try {
//         console.log('este es el token => ', auth.getAccessToken());
//         const id = auth.getUser()?.id
  
//         console.log('ID of user Profile', id);
//         const response = await fetch(`${API_URL}/portadaGet/${id}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${auth.getAccessToken()}`,
//           },
//         });
//         console.log('GET perfil', response);
  
//         if (!response.ok) {
//           throw new Error('Error al obtener la imagen de portdad: ' + response.statusText);
//         }
  
//         const data = await response.json();
//         console.log('==> este es data de get portada', data);
//         console.log('imagen de portada', data.portada);
//         if (!data.portada) { // Cambio aquí de data.downloadURL a data.imageProfile
//           throw new Error('Error: La respuesta del servidor no contiene la URL de la imagen de perfil');
//         }
  
//         setDownloadURLPortada(data.portada); // Cambio aquí de data.downloadURL a data.imageProfile
//         console.log('URL de la imagen de portad obtenida:', data.portada); // Cambio aquí de data.downloadURL a data.imageProfile
//       } catch (error) {
//         console.error('Error al obtener la imagen de portada:', error);
//       }
//       //
//     }
//     async function postPublication(event) {
//       event.preventDefault();
  
//       try {
//         const formData = new FormData();
  
//         // Obtener el archivo seleccionado del input de tipo file
//         const files = fileInputRef.current?.files;
  
//         // Obtener el valor del textarea
//         const description = descriptionTextareaRef.current?.value;
  
//         // Agregar la descripción al FormData
//         formData.append('description', description || '');
  
//         if (!files || files.length === 0) {
//           console.error('No se han seleccionado archivos.');
//           return;
//         }
  
//         // Agregar el archivo al FormData
//         for (let i = 0; i < files.length; i++) {
//           formData.append('file', files[i]);
//         }
  
//         const accessToken = auth.getAccessToken();
//         console.log('Token de publicacion', accessToken);
  
//         const response = await fetch(`${API_URL}/publicationpost`, {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//           body: formData,
//         });
  
//         console.log('POST publicacion:', response);
  
//         if (!response.ok) {
//           console.error("Error al cargar la imagen de publicación:", response.statusText);
//           return;
//         }
  
//         const data = await response.json();
//         console.log("Respuesta del servidor al subir publicacion POST:", data);
  
//         // Actualizar la lista de publicaciones después de la publicación exitosa
//         obtenerTodasLasPublicaciones();
//         getPublishAllUsers();
  
//         // Realizar cualquier acción necesaria después de cargar la nueva publicación
//         // setFile(data.file);
//         fileInputRef.current.value = ''; // Limpiar el input de tipo file
//         setDescription('');
//         console.log('url de imagen publicada',);
  
//       } catch (error) {
//         console.error("Error al cargar la imagen publicada:", error);
//       }
//     }
//     const obtenerTodasLasPublicaciones = async () => {
//       try {
//         const accessToken = auth.getAccessToken();
//         console.log('token de obtener la publiblocaciones ', accessToken);
//         console.log('elemetos de user', auth.getUser());
  
  
  
//         const id = auth.getUser()?.id
//         console.log('ID of user de PUBLICACIONES', id);
//         const response = await fetch(`${API_URL}/publicationget/${id}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });
//         console.log('GET publicaciones', response);
  
//         if (!response.ok) {
//           throw new Error('Error al obtener todas las publicaciones');
//         }
//         const data = await response.json();
//         console.log('data de toadas las publicaciones ', data);
//         // Ordenar las publicaciones por fecha de forma descendente
//         const publicacionesOrdenadas = data.publications.slice().reverse();
  
  
//         console.log('Todas las publicaciones', publicacionesOrdenadas);
  
//         setPublicaciones(publicacionesOrdenadas);
  
//       } catch (error) {
//         if (typeof error === 'string') {
//           setError(error);
//         } else {
//           console.log("error al treer la publicacion");
//           await Swal.fire({
//             icon: 'error',
//             title: '¡Error!',
//             text: 'Ocurrió un error al mostrar la publicacion.',
  
//           });
//         }
//       }
//     };
//     const modalHandler = (isOpen, image, publicationId, descripcion, nombre) => {
//       setModalIsOpen(isOpen)
//       setCurrenImage(image)
//       setCurrentPublicationId(publicationId);
//       setDescription(descripcion);
//       setName(nombre);
//       setTransparentBackground(true);
//     }
//     const getPublishAllUsers = async () => {
//       try {
//         const response = await fetch(`${API_URL}/publicationgetAll`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//         });
//         console.log('GET publicaciones', response);
  
//         if (!response.ok) {
//           throw new Error('Error al obtener todas las publicaciones all');
//         }
//         const data = await response.json();
  
//         // Ordenar las publicaciones por fecha de forma descendente
//         const publicacionesOrdenadas = data.publications.slice().reverse();
  
//         console.log('estas son las puplicaiones en el orden que se debe revisar all', publicacionesOrdenadas);
  
//         setPublicacionesUsuarios(publicacionesOrdenadas);
//         console.log('este es data de la publicacion traida todos ', publicacionesOrdenadas);
//       } catch (error) {
//         if (typeof error === 'string') {
//           setError(error);
//         } else {
//           console.log("error al treer la publicacion all");
//           await Swal.fire({
//             icon: 'error',
//             title: '¡Error!',
//             text: 'Ocurrió un error al traer las publicaciones.',
  
//           });
//         }
//       }
//     };
  
//     return (
//       <div className='profile-container relative  '><section className="seccion-perfil-usuario ">
//         <div className="perfil-usuario-header">
//           <div className="perfil-usuario-portada " style={{ margin: 30 }} >
//             <input
//               type="file"
//               id="fileInput"
//               style={{ display: 'none' }}
//               onChange={(e) => handleProfileImageChange(e.target.files)}
//             />
//             <div className="perfil-usuario-avatar relative z-10" onClick={() => setEditingProfileImage(true)}>
//               <img src={downloadURL} alt="img-avatar" className="avatar-img " />
//               <label htmlFor="fileInput" style={{ background: 'black' }}
//                 className="boton-avatar flex items-center justify-center"
//                 onClick={(e) => handleProfileImageChange(e.target.files)}>
//                 <FontAwesomeIcon icon={faImage} />
//               </label>
//             </div>
  
//             <input
//               type="file"
//               id="PortadaInput"
//               style={{ display: 'none' }}
//               onChange={(e) => handlePortdaImageChange(e.target.files)}
//             />
  
//             <img src={downloadURLPortada} alt="img-portada" className="portada " />
//             <label htmlFor="PortadaInput" className="boton-portada" >
//               <FontAwesomeIcon icon={faImage} /> Cambiar fondo
//             </label>
//           </div>
//         </div>
//         <div className="perfil-usuario-body" style={{ width: '50%' }}>
//           <div className="perfil-usuario-bio" style={{ display: 'flex', flexDirection: 'column' }}>
//             <div>
//               <h2 className='info' style={{ color: 'black', marginBottom: '1rem' }}>Información Personal:</h2>
//             </div>
//             <div>
//               <h2 className="Name" style={{ color: 'black' }}>Nombre: {auth.getUser()?.name}</h2>
//             </div>
//             <div>
//               <p className="Phone" style={{ color: 'black' }}>Numero de celular: {auth.getUser()?.telefono}</p>
//             </div>
//             <div>
//               <p className="Email" style={{ color: 'black' }}>Correo Electronico: {auth.getUser()?.username}</p>
//             </div>
//           </div>
//           <div className="Post-potfile">
//             <h1 className="texto">Publicaciones {publicaciones.length}</h1>
//           </div>
//         </div>
//         <div className="area-comentar">
//           <div className="avatar">
//             <img src="https://firebasestorage.googleapis.com/v0/b/react-firebase-upload-480ee.appspot.com/o/Avatar%2FC__Data_Users_DefApps_AppData_INTERNETEXPLORER_Temp_Saved%20Images_Cortes-de-cabello-para-hombre-4.jpg_1710158906965?alt=media&token=42f22ef9-e239-432b-b935-d293589e03b4" alt="img" />
//           </div>
//           {/* {seccion formulario publicacion} */}
//           <form className="inputs-comentarios" encType="multipart/form-data" onSubmit={postPublication}>
//             <div className="textarea-container">
//               <textarea
//                 name=""
//                 className="area-comentario text-black"
//                 placeholder="Descripcion del Servicio"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 ref={descriptionTextareaRef}
//                 style={{ padding: 2 }}
//               ></textarea>
//             </div>
//             <div className="botones-comentar">
//               <div className="boton-subir-archivo">
//                 <label className="boton-file" htmlFor="adjuntar">
//                   Adjuntar archivo
//                 </label>
//                 <input type="file"
//                   ref={fileInputRef}
//                   name="file"
//                   id="adjuntar" />
//               </div>
//               <button className="boton-enviar" type="submit">
//                 Enviar
//               </button>
//             </div>
//           </form>
//         </div>
//         {/* {puplicaiones personales} */}
  
//         <div className='publicacion-cometario '>
//           {console.log(publicaciones)}
//           {publicaciones.map((publicacion, index) => (
//             <div className="publicacion-realizada" key={index}>
//               <div className="usuario-publico">
//                 <div className="avatar">
//                   <img src={auth.getUser()?.imageProfile} alt="img" />
//                 </div>
//                 <div className="contenido-publicacion">
//                  <div style={{display:'flex', gap:15}}>
//                  <h4 style={{paddingTop:2}} >{auth.getUser()?.name}</h4>
//                   <button onClick={() => {
//                     modalHandler(true, publicacion?.image, publicacion?.id, publicacion?.description, publicacion?.name)
//                   }} className='btn-modal' >Ver</button>
//                   </div>
//                   <ul style={{paddingTop:4}}>
//                     <li>Hace 3 min</li>
//                   </ul>
//                 </div>
//                 <div className="menu-comentario">
//                 <FontAwesomeIcon icon={faPen} />
//                   <ul className="menu" style={{ background: 'black', maxHeight: 100 }}>
//                     <li><a href="" >Editar</a></li>
//                     <li><a href="" >Eliminar</a></li>
//                   </ul>
//                 </div>
//               </div>
//               <p className='descripcion'>{publicacion.description}</p>
//               <div className="archivo-publicado">
//                 <img src={publicacion.image} alt="img" />
//               </div>
//               <div className="botones-comentario">
//                 <button type="" className="boton-puntuar" style={{ color: 'black' }}>
//                   <i className="fas fa-thumbs-up"></i>
//                   45
//                 </button>
//                 <button type="" className="boton-responder" style={{ color: 'black' }}>
//                   Comentar
//                 </button>
//               </div>
//             </div>
//           ))}
  
//         </div>
//         <Modal className='card' style={{ content: { width: '50%', margin: '0 auto', marginTop: '100px' } }} isOpen={modalIsOpen} onRequestClose={() => modalHandler(false, '', '', '', '',)}>
//           <div >
//             <div className='card-body' style={{ display: 'flex', justifyContent: 'space-between', width: "100%" }}>
//               <button onClick={() => deleteHandler()} className='btn btn-danger'>ELIMINAR</button>
//               <button className='btn btn-danger' onClick={() => modalHandler(false, '', '', '', '')}>X</button>
//             </div>
//             <img style={{ padding: 10, width: '100%' }} src={currenImage || ''} alt="" />
//           </div>
//         </Modal>
  
//         <div style={{ height: 100 }}></div>
  
//       </section>
  
//       </div>
  
//     );
// }

// export default TodasPulicaciones
