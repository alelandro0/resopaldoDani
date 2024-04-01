import express from "express";
import { agendarCita } from '../controllers/AppoinmentController.mjs';

const router = express.Router();

// Ruta para crear citas
router.post('/', agendarCita);

// Ruta para actualizar citas


export { router };
