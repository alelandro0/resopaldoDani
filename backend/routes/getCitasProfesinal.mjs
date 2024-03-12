import express from 'express'
const router = express.Router()
import {getCitasProfesional} from '../controllers/AppoinmentController.mjs'

router.get('/:nombre',getCitasProfesional)

export{router}