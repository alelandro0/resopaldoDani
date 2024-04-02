import exress from 'express'
const router= exress.Router()
import { agregarComentario } from '../controllers/comentario.mjs'


router.post('/',agregarComentario)

export {router}