import mongoose from "mongoose";

// Modelo Usuario
const usuarioSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique:true
    },
    password: {
        type: String,
        require: true
    },
});
export const Usuario = mongoose.model('Usuario', usuarioSchema);

// Modelo tareas
const tareaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        require: true
    },
    descripcion: {
        type: String,
        require: true
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
export const Tarea = mongoose.model('Tarea', tareaSchema);

