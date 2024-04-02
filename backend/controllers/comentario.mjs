import User from '../models/user.mjs'

export const addComment = async (req, res) => {
  const { userId, publicationId, comentarioData } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const publication = user.publication.id(publicationId);
    if (!publication) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }

    publication.comentario.push(comentarioData);
    await user.save();

    return res.status(200).json({ message: "Comentario agregado correctamente" });
  } catch (error) {
    console.error("Error al agregar comentario:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
