import User from "../models/user.mjs";


//DAR LIKE
export const darLike = async (req, res) => {
  const { userId, publicationId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const publicationOwner = await User.findOne({ "publication._id": publicationId });
    if (!publicationOwner) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }

    const publication = publicationOwner.publication.id(publicationId);
    if (!publication) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }

    publication.likes += 1;

    await publicationOwner.save();

    res.status(200).json({ message: "Like agregado correctamente" });
  } catch (error) {
    console.error("Error al dar like:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

//QUITAR LIKE
export const quitarLike = async (req, res) => {
    const { userId, publicationId } = req.body;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
  
      const publicationOwner = await User.findOne({ "publication._id": publicationId });
      if (!publicationOwner) {
        return res.status(404).json({ message: "Publicación no encontrada" });
      }
  
      const publication = publicationOwner.publication.id(publicationId);
      if (!publication) {
        return res.status(404).json({ message: "Publicación no encontrada" });
      }
  
      // Verifica si el usuario ya ha dado like a la publicación
      const hasLiked = publication.likes.includes(userId);
      if (!hasLiked) {
        return res.status(400).json({ message: "El usuario no ha dado like a esta publicación" });
      }
  
      // Quita el like del usuario
      const likeIndex = publication.likes.indexOf(userId);
      publication.likes.splice(likeIndex, 1);
  
      await publicationOwner.save();
  
      res.status(200).json({ message: "Like quitado correctamente" });
    } catch (error) {
      console.error("Error al quitar like:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };
