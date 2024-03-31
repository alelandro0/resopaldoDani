import User from '../models/user.mjs';

const getUserProfile = async (req, res) => {
  try {
    const name = req.params.nombre; // Usar req.params.nombre para obtener el nombre del usuario
    const user = await User.findOne({ name: name });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

 
export default getUserProfile;
