import exress from 'express'
const router= exress.Router()
import { darLike } from '../controllers/like.mjs'

router.post('/',darLike)


export {router}

