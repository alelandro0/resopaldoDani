import express from "express";
import postRefreToken from "../controllers/refresTokenController.mjs";
const router = express.Router();


router.post("/",postRefreToken);

export default router;