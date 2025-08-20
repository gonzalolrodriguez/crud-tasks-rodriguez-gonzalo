import { Task } from "../models/tasks.models.js";
import { User } from "../models/users.models.js";

export const createTask = async (req, res) => {
    try {
        const { title, description, isComplete, user_id } = req.body;
        if (!title || !description || !user_id) return res.status(400).json({ message: "Datos inválidos" });

        const usuario = await User.findByPk(user_id);
        if (!usuario) return res.status(400).json({ message: "El usuario no existe" });

        const existeTitulo = await Task.findOne({ where: { title } });
        if (existeTitulo) return res.status(400).json({ message: "El título ya está registrado" });

        const nuevaTarea = await Task.create({ title, description, isComplete, user_id });
        res.status(201).json({ message: "Tarea creada con éxito", tarea: nuevaTarea });
    } catch (error) {
        res.status(500).json({ message: "Error al crear tarea", error: error.message });
    }
};

export const getTasks = async (req, res) => {
    try {
        const tareas = await Task.findAll({ include: [{ model: User, as: "user", attributes: ["id", "name", "email"] }] });
        res.status(200).json(tareas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener tareas", error: error.message });
    }
};
