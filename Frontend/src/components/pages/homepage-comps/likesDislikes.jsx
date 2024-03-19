export async function likePublication(publicationId, userId) {
    try {
      const response = await fetch(`http://localhost:5000/api/like/${publicationId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Error al dar like a la publicación');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al dar like a la publicación:', error);
      throw error;
    }
  }
  
  export async function dislikePublication(publicationId, userId) {
    try {
      const response = await fetch(`http://localhost:5000/api/dislike/${publicationId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Error al dar dislike a la publicación');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al dar dislike a la publicación:', error);
      throw error;
    }
  }
