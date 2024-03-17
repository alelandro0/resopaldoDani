// authenticate.mjs

import { jsonResponse } from "../lib/jsonResponse.mjs";
import getTokenFromHeader from "../auth/getTokenFromHeader.mjs";
import { verifyAccessToken } from "../auth/verifyToken.mjs";

function authenticate(req, res , next){
    console.log("Middleware de autenticación ejecutándose");
    
    const token = getTokenFromHeader(req.headers);

    if(token){
        console.log("Token encontrado:", token);
        const decoded = verifyAccessToken(token);
        console.log("Resultado de verifyAccessToken:", decoded);
        
        if(decoded){
            req.user = { ...decoded.user};
            next(); 
        }else{
            console.log("El token no es válido");
            res.status(401).json(jsonResponse(401, {
                message: "Token inválido"
            }));
        }
    }else{
        console.log("Token no encontrado en el encabezado de la solicitud");
        res.status(401).json(jsonResponse(401, {
            message: "Token no encontrado en el encabezado de la solicitud"
        }));
    }
}

export { authenticate };
