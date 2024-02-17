import express from "express"
const router = express.Router();

import postUser from "../controllers/loginController.mjs"

router.post("/", postUser);

export default router;