import Mongoose from "mongoose";

const UserSchema = new Mongoose.Schema({
    id: { type: Object },
    imagen: { type: String, required: true, unique: true },
    profesion: { type: String, required: true },
    tipo: { type: String, required: true },
    costo:{type: String},
    horario:{type: String},
    roll:Boolean
  });
  