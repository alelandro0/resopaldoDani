import { uploadFile } from "./uploadFile.mjs"
import User from '../models/user.mjs'


export const posts = async (req, res) => {
    const image = req.files.file;
    const userId = req.user.id; // Suponiendo que tienes acceso al ID del usuario desde la solicitud

    try {
        // Busca el usuario por su ID
        const userToUpdate = await User.findById(userId);
        
        if (!userToUpdate) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        if (image && image.length > 0) {
            // Si se proporciona una nueva imagen, carga y actualiza la URL de la imagen del usuario
            const { downloadURL } = await uploadFile(image[0]);
            console.log('Inicio de la URL:', downloadURL);

            // Actualiza la información de la imagen del usuario
            userToUpdate.imageProfile = downloadURL;
        }

        // Guarda los cambios en el usuario
        await userToUpdate.save();

        console.log('URL correcta:', userToUpdate.imageProfile);
        return res.status(201).json({ message: 'Imagen actualizada exitosamente.', downloadURL: userToUpdate.imageProfile });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: 'Ocurrió un error al guardar la imagen.', error });
    }
};


export const gets = async (req, res) => {
    try {
        const userId = req.params.id; // Suponiendo que el ID de usuario se pasa como parámetro en la URL

        // Buscar el usuario específico por su ID en la base de datos
        const user = await User.findOne({ _id: userId });
        console.log('id de profile ', userId);
        console.log("Usuario encontrado:", user);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        // Verificar si el usuario tiene una imagen de perfil
        if (!user.imageProfile) {
            return res.status(404).json({ message: 'Usuario no tiene una imagen de perfil.' });
        }

        // Si el usuario tiene una imagen de perfil, devolverla en la respuesta
        return res.status(200).json({ imageProfile: user.imageProfile });
    } catch (error) {
        console.error("Error al obtener la imagen de perfil:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}
