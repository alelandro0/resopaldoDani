
import { jsonResponse } from "../lib/jsonResponse.mjs";
import User from "../models/user.mjs";
import getUserInfo from "../lib/getUserInfo.mjs";
const postUser= async (req, res)=>{
    

        const { username, password } = req.body;
    
        if (!!!username || !!!password) {
            return res.status(400).json(jsonResponse(400, {
                error: "archivos son requeridos"
            }));
        }
        //autenticar usuario
    
        const user = await User.findOne({ username });
    
        if (user) {
            const correctPassword = await user.comparePassword(password, user.password);
    
            if (correctPassword) {
                const accessToken = user.createAccessToken();
                const refreshToken = await user.createRefreshToken();
    
                res.status(200)
                    .json(
                        jsonResponse(200, {
                            user: getUserInfo(user),
                            accessToken,
                            refreshToken
                }));
            } else {
                res.status(400)
                    .json(
                        jsonResponse(400, {
                            error: "Usuario o contraseña incorrectos"
                }))
            }
        } else {
            res.status(400).json(jsonResponse(400, {
                error: "Usuario no encontrado"
            }))
        }
    }
export default postUser;