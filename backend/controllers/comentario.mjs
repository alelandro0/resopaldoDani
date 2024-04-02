import User from '../models/user.mjs'


// Ver comentarios de una publicación
export const verComentarios = async (req, res) => {
  const { publicationId } = req.params; // Obtener el ID de la publicación de los parámetros de la solicitud

  try {
    // Buscar la publicación
    const publicationOwner = await User.findOne({ "publication._id": publicationId });
    if (!publicationOwner) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }

    // Buscar la publicación específica dentro de las publicaciones del propietario
    const publication = publicationOwner.publication.find(pub => pub._id.toString() === publicationId);
    if (!publication) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }

    // Devolver los comentarios de la publicación
    res.status(200).json({ comentarios: publication.comentarios });
  } catch (error) {
    console.error("Error al ver comentarios de la publicación:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Agregar comentario
export const agregarComentario = async (req, res) => {
  const { userId, publicationId, comentario } = req.body;

  try {
    // Buscar al usuario que quiere agregar el comentario
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Buscar la publicación a la que se quiere agregar el comentario
    const publicationOwner = await User.findOne({ "publication._id": publicationId });
    if (!publicationOwner) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }

    // Buscar la publicación específica dentro de las publicaciones del propietario
    const publication = publicationOwner.publication.find(pub => pub._id.toString() === publicationId);
    if (!publication) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }

    // Agregar el comentario a la publicación
    publication.comentario.push({ 
      imagenPerfil: user.imageProfile,
      respuesta: comentario,
      nombre: user.name
    });

    await publicationOwner.save();

    res.status(200).json({ message: "Comentario agregado correctamente" });
  } catch (error) {
    console.error("Error al agregar comentario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Eliminar comentario
export const eliminarComentario = async (req, res) => {
  const { userId, publicationId, comentarioId } = req.body;

  try {
    // Buscar al usuario que quiere eliminar el comentario
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Buscar la publicación a la que se quiere eliminar el comentario
    const publicationOwner = await User.findOne({ "publication._id": publicationId });
    if (!publicationOwner) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }

    // Buscar la publicación específica dentro de las publicaciones del propietario
    const publication = publicationOwner.publication.find(pub => pub._id.toString() === publicationId);
    if (!publication) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }

    // Buscar el comentario dentro de los comentarios de la publicación
    const comentarioIndex = publication.comentarios.findIndex(comment => comment._id.toString() === comentarioId);
    if (comentarioIndex === -1) {
      return res.status(400).json({ message: "El comentario no existe en esta publicación" });
    }

    // Eliminar el comentario del array de comentarios de la publicación
    publication.comentarios.splice(comentarioIndex, 1);

    await publicationOwner.save();

    res.status(200).json({ message: "Comentario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar comentario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
// Editar comentario
export const editarComentario = async (req, res) => {
  const { userId, publicationId, comentarioId, nuevoComentario } = req.body;

  try {
    // Buscar al usuario que quiere editar el comentario
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Buscar la publicación a la que se quiere editar el comentario
    const publicationOwner = await User.findOne({ "publication._id": publicationId });
    if (!publicationOwner) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }

    // Buscar la publicación específica dentro de las publicaciones del propietario
    const publication = publicationOwner.publication.find(pub => pub._id.toString() === publicationId);
    if (!publication) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }

    // Buscar el comentario dentro de los comentarios de la publicación
    const comentario = publication.comentarios.find(comment => comment._id.toString() === comentarioId);
    if (!comentario) {
      return res.status(400).json({ message: "El comentario no existe en esta publicación" });
    }

    // Verificar si el usuario es el propietario del comentario
    if (comentario.idUsuario !== userId) {
      return res.status(403).json({ message: "No tienes permiso para editar este comentario" });
    }

    // Actualizar el contenido del comentario
    comentario.respuesta = nuevoComentario;

    await publicationOwner.save();

    res.status(200).json({ message: "Comentario editado correctamente" });
  } catch (error) {
    console.error("Error al editar comentario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

