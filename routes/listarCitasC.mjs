import express from 'express'
const router= express.Router();
import {getCitasAgendadas} from '../controllers/AppoinmentController.mjs'

router.get('/',getCitasAgendadas)

export{router}