import express from "express"
const router = express.Router();
import postSignup from "../controllers/signupController.mjs";

router.post("/", postSignup);

export default router;
