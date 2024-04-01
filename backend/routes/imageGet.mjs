import express from "express";
import {gets} from "../controllers/controllerImage.mjs"

const router = express.Router();

router.get("/:id", gets);
export { router };