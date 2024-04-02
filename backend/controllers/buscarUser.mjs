import User from '../models/user.mjs';

const getUserProfile = async (req, res) => {
  try {
    const nombreUsuario = req.params.nombre.trim(); // Eliminar espacios en blanco al principio y al final del nombre en la solicitud
    const regex = new RegExp('^' + nombreUsuario + '\\s*$'); // Crear una expresión regular para buscar el nombre con espacios opcionales al final
    const user = await User.findOne({ name: { $regex: regex, $options: 'i' } }); // Buscar en la base de datos utilizando la expresión regular
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};


 
export default getUserProfile;
