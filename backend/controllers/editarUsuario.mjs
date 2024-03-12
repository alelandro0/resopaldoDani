import User from '../models/user.mjs' 
import { jsonResponse } from "../lib/jsonResponse.mjs";

export const updateUser = async (req, res) => {
  
try {
    const { id } = req.params;
    const { username, name, password } = req.body;

    // Verificar si el usuario existe
    const existingUser = await User.findById(id);
    if (!existingUser) {
         res.status(404).json(jsonResponse(404,{ error: "Usuario no encontrado" }));
    }

    // Validar campos obligatorios
    if (!username || !name || !password ) {
        res.status(400).json(jsonResponse(400,{ error: "Todos los campos son requeridos" }));
    }

    // Validar longitud de contraseña
    if (password.length < 6) {
      res.status(400).json(jsonResponse(400,{ error: "La contraseña debe tener al menos 6 caracteres" }));
    }

    // Validar formato de contraseña
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+.,])[A-Za-z\d!@#$%^&*()_+.,]+$/;
    if (!passwordRegex.test(password)) {
      res.status(400).json({ error: "La contraseña debe contener al menos una letra mayúscula, un número y un carácter especial" });
    }

    // Verificar si el nombre de usuario ya está en uso
    if (existingUser.username !== username) {
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            res.status(400).json({ error: "El nombre de usuario ya existe" });
        }
    }

    // Actualizar usuario
    existingUser.username = username;
    existingUser.name = name;
    existingUser.password = password;
    await existingUser.save();

    res.status(200).json(jsonResponse(200,{ message: "Usuario actualizado exitosamente" }));
} catch (error) {
    res.status(500).json(jsonResponse(500,{ error: "Error al actualizar el usuario" }));
}};