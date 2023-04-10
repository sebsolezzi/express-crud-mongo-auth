import { Task } from '../models/models.js'

export const createTask = async (req, res) => {

    try {
        const { title, description } = req.body;

        if (title == '' || description == '') {
            return res.status(404).json({ msg: "Debe ingresar un titulo y descripción" });
        }
        const task = new Task({ title, description, user: req.user.id });
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Server problem" });
    }
}

export const getTasks = async (req, res) => {
    try {
        const task = await Task.find({ user: req.user.id });
        res.status(200).json(task);
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Server problem" });
    }
}

export const getTask = async (req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.findById(id);

        if (!task || task.user != req.user.id) {
            return res.status(404).json({ msg: 'Task no found' });
        }

        res.status(200).json(task);
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Server problem" });
    }
}

export const editTask = async (req, res) => {
    try {
        const id = req.params.id;
        
        const { title, description } = req.body;
        const task = await Task.findById(id);
        
        if (!task || task.user != req.user.id) {
            return res.status(404).json({ msg: 'Task not found' });
        }
        task.title = title || task.title;
        task.description = description || task.description;
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Server problem" });
    }
}

export const deleteTask = async (req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.findById(id);

        if (!task || task.user != req.user.id) {
            return res.status(404).json({ msg: 'Task not found' });
        }
        await task.deleteOne({ _id: id })
        res.status(200).json({ msg: 'Task deleted' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Server problem" });
    }
}