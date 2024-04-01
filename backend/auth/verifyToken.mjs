import jwt from "jsonwebtoken";

export function verifyAccessToken(token) {
    try {
        const verifyAcess=jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log('Valor verificado del token de acceso:', verifyAcess);
        return verifyAcess;
    } catch (error) {
        // Manejar errores de verificación del token aquí
        throw new Error("Token de acceso inválido");
    }
}

export function verifyRefreshToken(token) {
    try {
        const verifyR=jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        console.log('Valor verificado del token de actualización:', verifyR);
        return verifyR
        
    } catch (error) {
        // Manejar errores de verificación del token aquí
        throw new Error("Token de actualización inválido");
    }
}

