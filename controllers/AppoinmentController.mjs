import Cita from '../models/AppointmentModel.mjs';
import User from '../models/user.mjs';

export const agendarCita = async (req, res) => {
  try {
    const { description, date, hora, id, nombre } = req.body;
    const profesionales = await User.find({ estado: true });
    // Verifica si ya existe una cita para la misma fecha y hora
    const existingAppointment = await Cita.findOne({ date, hora });
    if (existingAppointment) {
      return res.status(400).json({ message: 'Ya hay una cita agendada para esta fecha y hora' });
    }

    // Crea la cita utilizando el modelo de cita
    const cita = await Cita.create({
      ProfesionalId: profesionales._id,
      nombre,
      date,
      hora,
      description,
      userId: id,
      estado: 'pendiente' // Asigna 'pendiente' si no se proporciona ningún estado
    });
console.log('valores de la cita ',cita);
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
    const cita = await Cita.findByIdAndUpdate({ _id: id }, { estado }, { new: true });
    if (!cita) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }
    res.json(cita);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
export const getCitasUser = async (req, res) => {
  try {
    // Obtener el userId de la solicitud
    const userId = req.params.userId;
    // Buscar todas las citas asociadas a este userId
    const citas = await Cita.find({ userId: userId });
    // Verificar si se encontraron citas
    if (!citas || citas.length === 0) {
      return res.status(404).json({ message: 'No se encontraron citas para este usuario' });
    }
    
    // Crear un arreglo para almacenar las citas y los datos del usuario
    const citasConUsuario = [];

    // Iterar sobre cada cita
    for (const cita of citas) {
      // Encontrar el usuario asociado a la cita
      const user = await User.findById(cita.userId);

      // Verificar si se encontró el usuario
      if (!user) {
        console.error(`No se encontró el usuario para la cita con ID ${cita._id}`);
        continue;
      }

      // Crear un objeto con los datos de la cita y el usuario
      
       
     

      // Agregar la cita con usuario al arreglo
      citasConUsuario.push( cita);
    }

    // Devolver las citas encontradas con la información del usuario en la respuesta
    return res.status(200).json(citasConUsuario);
  } catch (error) {
    // Manejar errores
    res.status(400).json({ message: error.message });
  }
};

export const getCitasProfesional = async (req, res) => {
  try {
    const { nombre } = req.params;

    const citas = await Cita.find({ nombre: nombre });

    if (!citas || citas.length === 0) {
      return res.status(404).json({ message: 'No se encontraron citas para este profesional' });
    }

    const citasConUsuario = [];

    for (const cita of citas) {
      const usuario = await User.findById(cita.userId);
      const agendar = await Cita.findOne();
  
      if (usuario) {
        cita.usuario = {
          name: usuario.name,
          imageProfile: usuario.imageProfile
        };
      }
      citasConUsuario.push(agendar.date,agendar.hora,agendar.userId,usuario.name,usuario.imageProfile);
    }
    console.log(citasConUsuario, 'citas de usuario');
    return res.status(200).json(citasConUsuario);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};