import express from 'express'
import {posts} from '../controllers/portada.mjs'
import { upload } from "../controllers/multer.mjs";


const router= express.Router()

router.post('/',upload.fields([{name:'file', maxCount: 1}]),posts);


export {router}