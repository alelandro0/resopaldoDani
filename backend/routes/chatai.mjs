import  express  from "express";
import { chat } from "../controllers/controllerchaia.mjs";

const router = express.Router();

router.post('/', chat);

export {router}