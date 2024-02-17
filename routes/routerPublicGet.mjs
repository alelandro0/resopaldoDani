import  express  from "express";
import { getPublication } from "../controllers/controllerPulblication.mjs";

const router = express.Router()

router.get('/:userId', getPublication);
export {router}