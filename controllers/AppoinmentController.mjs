import Cita from '../models/AppointmentModel.mjs';
import User from '../models/user.mjs'; 


export const createAppointment = async (req, res) => {
    try {
        const { title, date, description, hora } = req.body;

        // Verifica si el usuario existe
        const user = await User.findOne({name:title});
        console.log("ide del user",user);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Crea la cita utilizando el modelo de cita
        const cita = await Cita.create({
            title,
            nombre: user.name,
            date,
            hora,
            description,
            userId:user.id ,
            estado:'pendiente' // Asigna 'pendiente' si no se proporciona ningún estado
        });

        res.status(201).json(cita);
    } catch (err) {
        res.status(400).json({ message: err.message }); // Cambio de código de estado a 400 en caso de error
    }
}
export const cancelCita = async (req, res) => {
    try {
      const { id } = req.body; // Extrae el ID de req.body
  
      // Selecciona y actualiza la cita basada en el ID
      const updatedCita = { estado: 'cancelada' }; // Suponiendo que quieres cambiar el estado a "cancelada"
      const user = await Cita.findOneAndUpdate({ _id: id }, updatedCita, { new: true });
      console.log('Cita actualizada:', user);
  
      // Verifica si la cita existe
      if (!user) {
        return res.status(404).json({ message: 'Cita no encontrada' });
      }
  
      // Busca una cita con estado 'rechazada'
      const cancel = await Cita.findOne({ estado: 'pendiente' });
  
      // Si no se encuentra una cita con estado 'rechazada', devuelve un mensaje
      if (!cancel) {
        return res.status(404).json({ message: 'No se encontró ninguna cita pendiente' });
      }
  
      console.log('Cita cancelada:', cancel);
      return res.status(200).json(cancel);
    } catch (error) {
      // Captura cualquier error y devuelve un mensaje de error
      return res.status(400).json({ message: error.message });
    }
  };


// Controlador para actualizar una cita
export const updateAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        const cita = await Cita.findByIdAndUpdate({_id: id}, { estado }, { new: true });
        if (!cita) {
            return res.status(404).json({ message: 'Cita no encontrada' });
        }
        res.json(cita);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
export const getUsers = async (req, res) => {
    try {
      // Consultar todos los usuarios en la base de datos
      const users = await User.find({ roll: 'Profesional' });
  
      // Enviar la respuesta con los usuarios encontrados
      res.status(200).json(users);
    } catch (error) {
      // Manejar cualquier error que ocurra durante la consulta a la base de datos
      console.error('Error al obtener usuarios:', error.message);
      res.status(500).json({ error: 'Error al obtener usuarios' });
    }
  };