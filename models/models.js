import mongoose from "mongoose";

// Modelo Usuario
const userSchema = new mongoose.Schema({
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
export const User = mongoose.model('Users', userSchema);

// Modelo tareas
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
});
export const Task = mongoose.model('Tasks', taskSchema);

