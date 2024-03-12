// authenticate.mjs
import { jsonResponse } from "../lib/jsonResponse.mjs";
import getTokenFromHeader from "../auth/getTokenFromHeader.mjs";
import { verifyAccessToken } from "../auth/verifyToken.mjs";

 function authenticate(req, res , next){
    const token = getTokenFromHeader(req.headers);

    if(token){
        const decoded = verifyAccessToken(token);
        if(decoded){
            req.user = { ...decoded.user};
            next(); 
        }else{
            res.status(401).json(jsonResponse(401, {
                message: "no hay token"
            }));
        }
    }else{
        res.status(401).json(jsonResponse(401, {
            message: "no hay token"
        }));
    }
}

export {authenticate}