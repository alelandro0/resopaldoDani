import express from "express";
import {posts} from "../controllers/controllerImage.mjs"
import { upload } from "../controllers/multer.mjs";
//import {addPublications} from '../controllers/publicController.mjs'


const router = express.Router();

router.post("/",upload.fields([{name:'file', maxCount: 1}]),posts);

export { router };
