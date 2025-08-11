import { Task } from "../models/tasks.models.js";

export const createTask = async (req, res) => {
    try {
        const { title, description, isComplete } = req.body;

        if (!title || title.length > 100 || !description || description.length > 100) {
            return res.status(400).json({ message: "Datos inválidos" });
        }

        const existeTitulo = await Task.findOne({ where: { title } });
        if (existeTitulo) {
            return res.status(400).json({ message: "El título ya está registrado" });
        }

        const nuevaTarea = await Task.create({ title, description, isComplete });
        res.status(201).json({ message: "Tarea creada con éxito", tarea: nuevaTarea });

    } catch (error) {
        res.status(500).json({ message: "Error al crear tarea", error: error.message });
    }
};

export const getTasks = async (req, res) => {
    try {
        const tareas = await Task.findAll();
        res.status(200).json(tareas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener tareas", error: error.message });
    }
};

export const getTaskById = async (req, res) => {
    try {
        const tarea = await Task.findByPk(req.params.id);
        if (!tarea) return res.status(404).json({ message: "Tarea no encontrada" });
        res.status(200).json(tarea);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener tarea", error: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { title, description, isComplete } = req.body;
        const tarea = await Task.findByPk(req.params.id);

        if (!tarea) return res.status(404).json({ message: "Tarea no encontrada" });

        if (title && title.length <= 100) {
            const existeTitulo = await Task.findOne({ where: { title } });
            if (existeTitulo && existeTitulo.id !== tarea.id) {
                return res.status(400).json({ message: "El título ya está registrado" });
            }
        }

        await tarea.update({ title, description, isComplete });
        res.status(200).json({ message: "Tarea actualizada", tarea });

    } catch (error) {
        res.status(500).json({ message: "Error al actualizar tarea", error: error.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const tarea = await Task.findByPk(req.params.id);
        if (!tarea) return res.status(404).json({ message: "Tarea no encontrada" });

        await tarea.destroy();
        res.status(200).json({ message: "Tarea eliminada" });

    } catch (error) {
        res.status(500).json({ message: "Error al eliminar tarea", error: error.message });
    }
};
