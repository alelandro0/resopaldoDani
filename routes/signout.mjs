import express from "express";
const router = express.Router();
import deleteSignout from "../controllers/signoutController.mjs";


router.delete("/",deleteSignout);

export default router;