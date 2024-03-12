import jwt from "jsonwebtoken";

export function verifyAccessToken(token) {
    try {
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
        // Manejar errores de verificación del token aquí
        throw new Error("Token de acceso inválido");
    }
}

export function verifyRefreshToken(token) {
    try {
        return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
        // Manejar errores de verificación del token aquí
        throw new Error("Token de actualización inválido");
    }
}

