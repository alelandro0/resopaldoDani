import express from "express";
const router = express.Router();
import { likePublication, dislikePublication } from '../controllers/likesDislikes.mjs';

// Ruta para dar like a una publicación
router.post('/:publicationId/like', likePublication);

// Ruta para dar dislike a una publicación
router.post(':publicationId/dislike', dislikePublication);

export {router} ;
