// AppointmentModel.mjs

import mongoose from 'mongoose';

const { Schema } = mongoose;

const citaSchema = new Schema({
    title: { type: String },
    nombre:{type: String},
    date: { type: Date, required: true },
    hora: { type: String, require:true },
    description: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId},
    estado: { type: String }
});

const Cita = mongoose.model('Cita', citaSchema);

export default Cita; // Exporta el modelo de cita como default

