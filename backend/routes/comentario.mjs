import express from 'express';
import { agregarComentario, eliminarComentario, editarComentario } from '../controllers/comentario.mjs';

const router = express.Router();

router.post('/', agregarComentario);

export { router };
