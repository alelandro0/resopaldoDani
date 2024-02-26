import express from "express";
import { createAppointment } from '../controllers/AppoinmentController.mjs';

const router = express.Router();

// Ruta para crear citas
router.post('/', createAppointment);

// Ruta para actualizar citas


export { router };
