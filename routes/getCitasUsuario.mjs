import express from 'express'
const router= express.Router()
import {getCitasUser} from '../controllers/AppoinmentController.mjs'

router.get('/:userId',getCitasUser)

export{router}