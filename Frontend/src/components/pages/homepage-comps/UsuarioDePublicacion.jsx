import { API_URL } from "../../../Autentication/constanst";
import { useAuth } from "../../../Autentication/AutProvider";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import NabarMenu from "./NabarMenu";
import Modal from 'react-modal'
import './perfil.css';
import './style.css'


const UsuarioDePublicacion = () => {
  const [datos, setDatos] = useState('')
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [like, setLike] =useState(false)
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [verComentario, setVerComentario] = useState({})
  const auth = useAuth();

  const usuario = async () => {
    try {
      const response = await fetch(`${API_URL}/profileSearch/${auth.nombreUsuario}`, {
        method: "GET",  
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('este es response ', response);
      if (!response.ok) {
        throw new Error('Error al obtener la imagen de perfil: ' + response.statusText);
      }
      const data = await response.json();
      setDatos(data)
      console.log('Datos del usuario:', data);
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
    }
  };

  useEffect(() => {
    HandleLikes()
    usuario();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!auth.nombreUsuario) {
    console.log('este es el nombre en usuario publicacion', auth.nombreUsuario);
    return <div>No se ha proporcionado ningún nombre de usuario.</div>;
  }

  function getTimeElapsed(publishedAt) {
    const currentDate = new Date();
    const postDate = new Date(publishedAt);
    const timeDifference = currentDate.getTime() - postDate.getTime();
    const secondsElapsed = Math.floor(timeDifference / 1000);
    // TIEMPO DE PUBLICACION
    if (secondsElapsed < 60) {
      return `${secondsElapsed} segundos`;
    } else if (secondsElapsed < 3600) {
      const minutes = Math.floor(secondsElapsed / 60);
      return `${minutes} minutos`;
    } else if (secondsElapsed < 86400) {
      const hours = Math.floor(secondsElapsed / 3600);
      return `${hours} horas`;
    } else {
      const days = Math.floor(secondsElapsed / 86400);
      return `${days} días`;

    }
  }

  // Función para abrir el modal con el proyecto seleccionado

  const modalHandler = (isOpen) => {
    setModalIsOpen(isOpen)

  }
  // Función para cerrar el modal


  //LIKES Y DESLIKES
  const HandleLikes = async(userId,publicationId) => {
   
    if (!like) {
      console.log(userId,"  ",publicationId );
      try {
        const responseLikes = await fetch(`${API_URL}/likes`, {  
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({userId,publicationId})
        });
        
        if (!responseLikes.ok) {
          throw new Error('No se pudo dar like a la publicación');
        }
  
        const data = await responseLikes.json();
        usuario()
        setLike(true)
        console.log('respuesta del servidor', data);
      } catch (error) {
        console.error('Error al dar like:', error);
      }
    } else {
      try {
        const responseDislike = await fetch(`${API_URL}/dislikes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId, publicationId })
        });
  
        if (!responseDislike.ok) {
          throw new Error('No se pudo quitar el like de la publicación');
        }
        usuario()
        setLike(false)
        console.log('respuesta del servidor', await responseDislike.json());
      } catch (error) {
        console.error('Error al quitar like:', error);
      }
    }
  };
  const agregarComentario = async (userId, publicationId, comentario) => {
    console.log("userId:", userId);
    console.log("publicationId:", publicationId);
    console.log("comentario:", comentario);
    try {
      const response = await fetch(`${API_URL}/comentario`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, publicationId, comentario }),
      });
      const data = await response.json();
      // Manejar la respuesta del servidor (mostrar mensaje de éxito/error, actualizar la interfaz, etc.)
      console.log(data.message);
    } catch (error) {
      console.error('Error al agregar comentario:', error);
    }
  };
  const verComentarios = async (publicationId) => {
    try {
      const response = await fetch(`${API_URL}/vercomentario/${publicationId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  console.log('respose de comentarios',response);
      if (!response.ok) {
        throw new Error('Error al obtener los comentarios');
      }
  
      const data = await response.json();
      setVerComentario(data);
    } catch (error) {
      console.error('Error al obtener los comentarios:', error.message);
    }
  }
  


  return (
    <div>
      <NabarMenu />
      <div name='Perfil'
        className='profile-container relative  '>
        <section className="seccion-perfil-usuario ">
          <div className="perfil-usuario-header">
            <div className="perfil-usuario-portada " style={{ margin: 30 }} >
              <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}

              />
              <div className="perfil-usuario-avatar relative z-10" >
                <img src={datos.imageProfile} alt="img-avatar" className="avatar-img " />

              </div>

              <input
                type="file"
                id="PortadaInput"
                style={{ display: 'none' }}

              />

              <img src={datos.portada} alt="img-portada" className="portada " />
            </div>
          </div>
          <div className="perfil-usuario-body1" style={{ width: '50%', backgroundColor: 'black', color: 'white', padding: '20px', borderRadius: '10px' }}>
            <div className="perfil-usuario-bio" style={{ display: 'flex', flexDirection: 'column', background: "transparent" }}>
              <div>
                <h2 className='infor'>Información Personal:</h2>
              </div>
              <div>
                <h2 className='info'>Tipo de usuario: {datos.roll}</h2>
              </div>
              <div>
                <h2 className="Info">Nombre: {datos.name}</h2>
              </div>
              <div>
                <p className="info">Número de celular: {datos.telefono}</p>
              </div>
              <div>
                <p className="info">Correo Electrónico: {datos.username}</p>
              </div>
            </div>
            {datos.roll === "Profesional" && datos.publication && Array.isArray(datos.publication) && (
              <div className="Post-potfile">
                <h1 className="texto ">Publicaciones {datos.publication.length}</h1>
              </div>
            )}


          </div>
          <div className='publicacion-cometario '>
            <br />
            {console.log(datos.publication)}
            {datos && datos.publication && Array.isArray(datos.publication) && datos.publication.map((publicacion, index) => (
              <div className="publicacion-realizada" key={index}>
                <div className="usuario-publico">
                  <div className="avatar">
                    <img src={datos.imageProfile || 'https://static.vecteezy.com/system/resources/previews/003/337/584/large_2x/default-avatar-photo-placeholder-profile-icon-vector.jpg'} alt="img" />
                  </div>
                  <div className="contenido-publicacion">
                    <div>
                      <h4>{datos.name}</h4>
                      <button onClick={() => { modalHandler(true, publicacion?.image, publicacion?.id, publicacion?.description, publicacion?.name) }} className='btn-modal'>Ver</button>
                    </div>
                    <ul style={{ paddingTop: 4 }}>
                      <li>Hace {getTimeElapsed(publicacion.createdAt)}</li>
                    </ul>
                  </div>

                </div>
                <p className='descripcion'>{publicacion.description}</p>
                <div className="archivo-publicado py-6">
                  <img src={publicacion.image} />
                </div>
                <div className="botones-comentario">
                <button type=""
                onClick={()=> HandleLikes(publicacion.profesionalId,publicacion._id)
                }
                 className="text-white font-semibold w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-t from-blue-600 cursor-pointer mx-auto md:mx-0 p-3 rounded-md">
                  <FontAwesomeIcon icon={faThumbsUp} />
                  <p>{publicacion.likes.length}</p>
                </button>

                <div>
                  <label htmlFor="comment">Comment: </label>
                  <input type="text" style={{color:'black'}} name='comment' value={nuevoComentario} onChange={(e) => setNuevoComentario(e.target.value)} />
                </div>
                {console.log("ide el profesiona de comen", publicacion.profesionalId)}
                <button type="" className="boton-responder" onClick={() => agregarComentario(publicacion?.profesionalId, publicacion?._id, nuevoComentario)}>
                  Comentar
                </button>
                <button className="boton-responder"
                onClick={()=> verComentarios(publicacion?._id)}
                 >ver</button>
                <div><p>{verComentario.respuesta}</p></div>
                </div>
              </div>
            ))}
          </div>


          {/* {puplicaiones personales} */}






          <div style={{ height: 100 }}></div>
          {/* todas las publicaciones */}
        </section>
        <Modal className='fixed inset-0 flex items-center justify-center bg-opacity-70 bg-black z-40 over' isOpen={modalIsOpen} onRequestClose={() => modalHandler(false)}>
          <div className="relative bg-white/20 p-2 rounded-lg w-[70%] sm:w-[60%] max-w-[800px] modalCard max-h-[80vh] flex flex-col overflow-y-auto lg:text-lg lg:w-[90%]">
            <div className="overflow-hidden rounded-tl-lg rounded-tr-lg">
              <img className='w-full h-auto object-cover' src={datos.publicacion && datos.publicacion.image ? datos.publicacion.image : ''} alt="" />
            </div>
            <div className='w-full text-white p-8 flex flex-col bg-black/80 border-opacity-70 border-primary-color rounded-bl-lg rounded-br-lg'>
              <ul>
                <li>
                  <span className='text-blue-600'>Descripción:</span>
                  <span>{datos.publicacion && datos.publicacion.description ? datos.publicacion.description : ''}</span>
                </li>
              </ul>
            </div>
            <button className='absolute top-3 right-2 lg:right-4 cursor-pointer' onClick={() => modalHandler(false)}>
              <li className='bx bx-x-circle bg-black text-blue-600 text-[2.25rem] rounded-full transition-transform duration-300 hover:scale-110'></li>
            </button>
          </div>
        </Modal>


      </div>
    </div>
  )
}

export default UsuarioDePublicacion



