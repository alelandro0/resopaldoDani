import exress from 'express'
const router= exress.Router()
import { quitarLike } from '../controllers/like.mjs'


router.post('/',quitarLike)

export {router}