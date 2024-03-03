import express  from "express";
import {getUsers} from '../controllers/AppoinmentController.mjs'
const router = express()

router.get('/',getUsers)

export{router}