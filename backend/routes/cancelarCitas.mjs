import express from 'express'
const router= express.Router();
import {cancelCita} from '../controllers/AppoinmentController.mjs'

router.put('/:id', cancelCita)

export{router}