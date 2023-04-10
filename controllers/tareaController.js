import { Tarea } from '../models/models.js'

export const crearTarea = async (req, res) => {

    try {
        const { titulo, descripcion } = req.body;

        if (titulo == '' || descripcion == '') {
            return res.status(404).json({ msg: "Debe ingresar un titulo y descripción" });
        }
        const tarea = new Tarea({ titulo, descripcion, user: req.usuario.id });
        await tarea.save();
        console.log(tarea)
        res.status(200).json(tarea);
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Problema en servidor" });
    }
}

export const obtenerTareas = async (req, res) => {
    try {
        const tareas = await Tarea.find({ user: req.usuario.id });
        res.status(200).json(tareas);
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Problema en servidor" });
    }
}

export const obtenerTarea = async (req, res) => {
    try {
        const id = req.params.id;
        const tarea = await Tarea.findById(id);

        if (!tarea || tarea.user != req.usuario.id) {
            return res.status(404).json({ msg: 'Tarea no encontrada' });
        }

        res.status(200).json(tarea);
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Problema en servidor" });
    }
}

export const editarTarea = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        const { titulo, descripcion } = req.body;
        const tarea = await Tarea.findById(id);
        console.log(tarea)
        if (!tarea || tarea.user != req.usuario.id) {
            return res.status(404).json({ msg: 'Tarea no encontrada' });
        }
        tarea.titulo = titulo || titulo.title;
        tarea.descripcion = descripcion || tarea.descripcion;
        await tarea.save();
        res.status(200).json(tarea);
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Problema en servidor" });
    }
}

export const eliminarTarea = async (req, res) => {
    try {
        const id = req.params.id;
        const tarea = await Tarea.findById(id);

        if (!tarea || tarea.user != req.usuario.id) {
            return res.status(404).json({ msg: 'Tarea no encontrada' });
        }
        await tarea.deleteOne({ _id: id })
        res.status(200).json({ msg: 'Tarea borrada' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Problema en servidor" });
    }
}