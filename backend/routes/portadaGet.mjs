import express from 'express'
import {gets} from '../controllers/portada.mjs'
const router= express.Router()


router.get('/:id',gets)

export {router}
