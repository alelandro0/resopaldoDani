import  express  from "express";
import { getPublicationAll } from "../controllers/controllerPulblication.mjs";

const router = express.Router()

router.get('', getPublicationAll);
export {router}