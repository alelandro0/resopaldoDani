import User from "../models/user.mjs";

// DAR LIKE
export const darLike = async (req, res) => {
  const { userId, publicationId } = req.body;

  try {
    console.log('id de la publicacion', publicationId);
    const user = await User.findById(userId);
    console.log('existe', user);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Busca la publicación propietaria usando el ID de la publicación
    const publicationOwner = await User.findOne({ "publication._id": publicationId });
    if (!publicationOwner) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }

    // Busca la publicación específica dentro de las publicaciones del propietario
    let publication = publicationOwner.publication.find(pub => pub._id.toString() === publicationId);

    if (!publication) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }

    // Verifica si el campo likes es un array
    if (!Array.isArray(publication.likes)) {
      return res.status(400).json({ message: "El campo 'likes' no es un array" });
    }

    // Verifica si el usuario ya ha dado like a la publicación
    const hasLikedIndex = publication.likes.findIndex(like => like.userId === userId);
    if (hasLikedIndex !== -1) {
      return res.status(400).json({ message: "El usuario ya ha dado like a esta publicación" });
    }

    // Agrega el like al array de likes de la publicación
    publication.likes.push({ userId: userId, estado: true });

    await publicationOwner.save();

    res.status(200).json({ message: "Like agregado correctamente" });
  } catch (error) {
    console.error("Error al dar like:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// QUITAR LIKE
// QUITAR LIKE
export const quitarLike = async (req, res) => {
  const { userId, publicationId } = req.body;

  try {
    // Busca al usuario que dio el like
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Busca al propietario de la publicación
    const publicationOwner = await User.findOne({ "publication._id": publicationId });
    if (!publicationOwner) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }

    // Busca la publicación específica dentro de las publicaciones del propietario
    const publication = publicationOwner.publication.find(pub => pub._id.toString() === publicationId);
    if (!publication) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }

    // Verifica si el usuario ha dado like a la publicación
    const likeIndex = publication.likes.findIndex(like => like.userId === userId);
    if (likeIndex === -1) {
      return res.status(400).json({ message: "El usuario no ha dado like a esta publicación" });
    }

    // Elimina el like del array de likes de la publicación
    publication.likes.splice(likeIndex, 1);

    await publicationOwner.save();

    res.status(200).json({ message: "Like quitado correctamente" });
  } catch (error) {
    console.error("Error al quitar like:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
