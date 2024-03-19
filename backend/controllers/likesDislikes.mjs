import User from '../models/user.mjs' 

// Controlador para dar like a una publicación
const likePublication = async (req, res) => {
  const { userId, publicationId } = req.params;

  try {
    // Busca al usuario
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verifica si el usuario ya ha dado like a esta publicación
    const publication = user.publication.id(publicationId);
    if (!publication) {
      return res.status(404).json({ error: 'Publication not found' });
    }

    if (!publication.likedBy.includes(userId)) {
      // Incrementa el contador de likes
      publication.likes += 1;
      // Agrega el usuario a la lista de quienes han dado like
      publication.likedBy.push(userId);
      // Guarda los cambios
      await user.save();
      res.status(200).json({ message: 'Publication liked successfully', likes: publication.likes });
    } else {
      res.status(400).json({ error: 'You have already liked this publication' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to like the publication' });
  }
};

// Controlador para dar dislike a una publicación
const dislikePublication = async (req, res) => {
  const { userId, publicationId } = req.params;

  try {
    // Busca al usuario
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verifica si el usuario ya ha dado dislike a esta publicación
    const publication = user.publication.id(publicationId);
    if (!publication) {
      return res.status(404).json({ error: 'Publication not found' });
    }

    if (!publication.dislikedBy.includes(userId)) {
      // Incrementa el contador de dislikes
      publication.dislikes += 1;
      // Agrega el usuario a la lista de quienes han dado dislike
      publication.dislikedBy.push(userId);
      // Guarda los cambios
      await user.save();
      res.status(200).json({ message: 'Publication disliked successfully', dislikes: publication.dislikes });
    } else {
      res.status(400).json({ error: 'You have already disliked this publication' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to dislike the publication' });
  }
};

export {
  likePublication,
  dislikePublication
};
