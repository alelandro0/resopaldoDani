import express from 'express'
const router = express.Router()
import {updateUser} from '../controllers/editarUsuario.mjs'

router.put('/:id',updateUser)

export{router}