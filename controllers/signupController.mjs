import sendConfirmationEmail from "../validations/correos.mjs";
import { jsonResponse } from "../lib/jsonResponse.mjs";
import User from "../models/user.mjs";

const postSignup = async (req, res) => {
    const { username, name, password, roll } = req.body;

    if (!username || !name || !password || !roll) {
        return res.status(400).json(jsonResponse(400, {
            error: "Todos los campos son requeridos"
        }));
    }

    if (password.length < 6) {
        return res.status(400).json(jsonResponse(400, {
            error: "La contraseña debe tener al menos 6 caracteres"
        }));
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+.,])[A-Za-z\d!@#$%^&*()_+.,]+$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json(jsonResponse(400, {
            error: "La contraseña debe contener al menos una letra mayúscula, un número y un carácter especial"
        }));
    }

    try {
        const existingUsername = await User.findOne({ username });
        const existingName = await User.findOne({ name });

        if (existingUsername) {
            return res.status(400).json(jsonResponse(400, {
                error: "El nombre de usuario ya existe"
            }));
        }

        if (existingName) {
            return res.status(400).json(jsonResponse(400, {
                error: "El correo electrónico ya está registrado"
            }));
        }

        const newUser = new User({ username, name, password, roll });
        await newUser.save();
        sendConfirmationEmail(username);
        console.log(sendConfirmationEmail(username));
        res.status(200).json(jsonResponse(200, {
            message: "Usuario creado exitosamente"
        }));
    } catch (error) {
        res.status(500).json(jsonResponse(500, {
            error: "Error al crear un usuario"
        }));
    }
};

export default postSignup;
