import getTokenFromHeader from "../auth/getTokenFromHeader.mjs";
import { jsonResponse } from "../lib/jsonResponse.mjs";
import Token from "../models/token.mjs";
import {verifyRefreshToken} from "../auth/verifyToken.mjs";


const postRefreToken= async(req, res)=>{

    const refreshToken = getTokenFromHeader(req.headers);

    if(refreshToken){
        try {
            const found = await Token.findOne({token: refreshToken})
            if(!found){
                return res.status(401).send(jsonResponse( {error: "Unauthorized"}))
            }

            const payload = verifyRefreshToken(found.token);

            if(payload){
               const accessToken = generateAccessToken(payload.use);

               return res.status(200).json(jsonResponse({accessToken}))
            }else{
                return res.status(401).send(jsonResponse( {error: "Unauthorized"}))
            }
            
        } catch (error) {
            return res.status(401).send(jsonResponse( {error: "Unauthorized"}))
        }

    }else{
        res.status(401).send(jsonResponse( {error: "Unauthorized"}))
    }
    res.send("refresh-token");

}
export default postRefreToken