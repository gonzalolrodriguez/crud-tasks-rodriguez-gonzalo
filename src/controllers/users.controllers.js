import { User } from "../models/users.models.js";
import { Task } from "../models/tasks.models.js";
import { Profile } from "../models/profile.models.js";
import { Project } from "../models/project.models.js";

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).json({ message: "Datos inválidos" });

        const existeEmail = await User.findOne({ where: { email } });
        if (existeEmail) return res.status(400).json({ message: "El email ya está registrado" });

        const nuevoUsuario = await User.create({ name, email, password });
        res.status(201).json({ message: "Usuario creado con éxito", usuario: nuevoUsuario });
    } catch (error) {
        res.status(500).json({ message: "Error al crear usuario", error: error.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        const usuarios = await User.findAll({
            include: [
                { model: Task, as: "tasks" },
                { model: Profile, as: "profile" },
                { model: Project, as: "projects" }
            ]
        });
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener usuarios", error: error.message });
    }
};
