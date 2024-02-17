import expres from "express";
import{deletePublication} from "../controllers/controllerPulblication.mjs"

const router = expres()

router.delete('/:userId/publications/:publicationId',deletePublication)

export {router}