import { Task } from "../models/tasks.models.js";
import { User } from "../models/users.models.js";

export const createTask = async (req, res) => {
    try {
        const { title, description, isComplete, user_id } = req.body;

        const user = await User.findByPk(user_id);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        const titleExists = await Task.findOne({ where: { title, user_id } });
        if (titleExists) return res.status(400).json({ message: "El usuario ya tiene una tarea con ese título" });

        const task = await Task.create({ title, description, isComplete, user_id });
        return res.status(201).json({ message: "Tarea creada", task });
    } catch (error) {
        return res.status(500).json({ message: "Error al crear tarea", error: error.message });
    }
};

export const getTasks = async (_req, res) => {
    try {
        const tasks = await Task.findAll({ include: [{ model: User, as: "user", attributes: ["id", "name", "email"] }] });
        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener tareas", error: error.message });
    }
};

export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id, { include: [{ model: User, as: "user", attributes: ["id", "name", "email"] }] });
        if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
        return res.status(200).json(task);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener tarea", error: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { title, description, isComplete, user_id } = req.body;
        const task = await Task.findByPk(req.params.id);
        if (!task) return res.status(404).json({ message: "Tarea no encontrada" });

        if (user_id) {
            const user = await User.findByPk(user_id);
            if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Evitar duplicar título por usuario
        if (title && (title !== task.title || (user_id && user_id !== task.user_id))) {
            const dup = await Task.findOne({ where: { title, user_id: user_id ?? task.user_id } });
            if (dup) return res.status(400).json({ message: "El usuario ya tiene una tarea con ese título" });
        }

        await task.update({ title, description, isComplete, user_id });
        return res.status(200).json({ message: "Tarea actualizada", task });
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar tarea", error: error.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) return res.status(404).json({ message: "Tarea no encontrada" });

        await task.destroy();
        return res.status(200).json({ message: "Tarea eliminada" });
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar tarea", error: error.message });
    }
};

