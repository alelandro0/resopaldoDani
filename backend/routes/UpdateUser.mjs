import  express  from "express";
import { UpdatePerfil } from "../controllers/UpdateUser.mjs";
import { getUserById } from "../controllers/UpdateUser.mjs";

const router = express.Router();
router.get ('', getUserById)

router.put('/:id', UpdatePerfil);

export {router}