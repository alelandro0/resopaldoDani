import {verComentarios} from  '../controllers/comentario.mjs'
import express from 'express'
const router =express.Router();

router.get('/:id',verComentarios)

export {router}