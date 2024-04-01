import getTokenFromHeader from "../auth/getTokenFromHeader.mjs";
import Token from "../models/token.mjs";
import { jsonResponse } from "../lib/jsonResponse.mjs";

const deleteSignout = async (req, res) => {
    try {
        const refreshToken = getTokenFromHeader(req.headers);
        if (refreshToken) {
            const refrescar = await Token.findOneAndRemove({ token: refreshToken });
            console.log('token removido',refrescar);
            if (!refrescar) {
                return res.status(200).json(jsonResponse(200, { message: "Logout successful" }));
            } else {
                return res.status(404).json(jsonResponse(404, { message: "Refresh token not found" }));
            }
        } else {
            return res.status(400).json(jsonResponse(400, { message: "Refresh token not provided" }));
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json(jsonResponse(500, { error: "Server error" }));
    }
};

export default deleteSignout;