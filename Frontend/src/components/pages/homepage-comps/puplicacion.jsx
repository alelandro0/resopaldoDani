import './style.css'
const Publicaciones = () => {
    return (
      <section className="contenedor-comentarios">
        <div className="area-comentar">
          <div className="avatar">
            <img src="http://localhost/multimedia/relleno/img-c9.png" alt="img" />
          </div>
          <form action="#" method="post" className="inputs-comentarios">
            <textarea name="" className="area-comentario"></textarea>
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
        <div className='publicacion-cometario'>
        <div className="publicacion-realizada">
          <div className="usuario-publico">
            <div className="avatar">
              <img src="http://localhost/multimedia/relleno/img-c9.png" alt="img" />
            </div>
            <div className="contenido-publicacion">
              <h4>Carolina de la valle</h4>
              <ul>
                <li>Hace 3 min</li>
              </ul>
            </div>
            <div className="menu-comentario">
              <i className="fas fa-pen"></i>
              <ul className="menu">
                <li><a href="">Editar</a></li>
                <li><a href="">Eliminar</a></li>
              </ul>
            </div>
          </div>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores aliquam possimus, doloremque repellat assumenda ipsam magni ducimus, dolorem explicabo</p>
          <div className="archivo-publicado">
            <img src="http://localhost/multimedia/relleno/img-s5.png" alt="img" />
          </div>
          <div className="botones-comentario">
            <button type="" className="boton-puntuar">
              <i className="fas fa-thumbs-up"></i>
              45
            </button>
            <button type="" className="boton-responder">
              Comentar
            </button>
          </div>
        </div>
        <div className="comentarios-usuarios">
          <div className="comentario-principal-usuario">
            <div className="avatar">
              <img src="http://localhost/multimedia/relleno/img-c10.png" alt="img" />
            </div>
            <div className="comentario">
              <div className="usuario-comentario">
                <div className="texto">
                  <a href="#" title="" className="nombre-usuario">Camila valle</a> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla tenetur necessitatibus, error debitis provident obcaecati blanditiis incidunt amet suscipit libero praesentium ducimus omnis harum commodi nobis modi perspiciatis? Quia, facilis.
                  <div className="menu-comentario">
                    <i className="fas fa-pen"></i>
                    <ul className="menu">
                      <li><a href="">Editar</a></li>
                      <li><a href="">Eliminar</a></li>
                    </ul>
                  </div>
                </div>
                <div className="botones-comentario">
                  <button type="" className="boton-puntuar">
                    <i className="fas fa-thumbs-up"></i>
                    5
                  </button>
                  <button type="" className="boton-responder">
                    responrder
                  </button>
                  <span className="tiempo-comentario">
                    hece 3 min
                  </span>
                </div>
              </div>
              <div className="contenedor-sub-comentarios">
                <div className="comentario-principal-usuario">
                  <div className="avatar">
                    <img src="http://localhost/multimedia/relleno/img-c7.png" alt="img" />
                  </div>
                  <div className="comentario">
                    <div className="usuario-comentario">
                      <div className="texto">
                        <a href="#" title="" className="nombre-usuario">Estevan Hernandez</a> Lorem ipsum dolor sit amet adipisicing elit, sed do eiusmod
                        <div className="menu-comentario">
                          <i className="fas fa-pen"></i>
                          <ul className="menu">
                            <li><a href="">Editar</a></li>
                            <li><a href="">Eliminar</a></li>
                          </ul>
                        </div>
                      </div>
                      <div className="botones-comentario">
                        <button type="" className="boton-puntuar">
                          <i className="fas fa-thumbs-up"></i>
                          12
                        </button>
                        <button type="" className="boton-responder">
                          responrder
                        </button>
                        <span className="tiempo-comentario">
                          hece 3 min
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="comentar-publicacion">
            <div className="avatar">
              <img src="http://localhost/multimedia/relleno/img-c10.png" alt="img" />
            </div>
            <form action="#" method="post" className="comentar-comentario">
              <input type="text" name="" value="" placeholder="" />
              <button type="" className="boton-enviar">
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
        </div>
      </section>
    )
  }
  
  export default Publicaciones;
  