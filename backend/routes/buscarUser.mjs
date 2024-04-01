// routes/userRoutes.js

import express from 'express';
const router = express.Router();
import userController from '../controllers/buscarUser.mjs';

// Ruta para obtener el perfil de un usuario por su ID
router.get('/:nombre', userController);

export {router}
