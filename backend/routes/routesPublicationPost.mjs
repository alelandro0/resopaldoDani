import  express  from "express";
import { postPublication } from "../controllers/controllerPulblication.mjs";
import { upload } from "../controllers/multer.mjs";
const router= express.Router()

router.post('/', upload.fields([{name:'file', maxCount: 1}]) ,postPublication);


export {router}