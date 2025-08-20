import { Project } from "../models/projects.models.js";
import { User } from "../models/users.models.js";

export const createProject = async (req, res) => {
    try {
        const { name, description, user_ids } = req.body;
        if (!name) return res.status(400).json({ message: "Nombre inválido" });

        const existe = await Project.findOne({ where: { name } });
        if (existe) return res.status(400).json({ message: "El proyecto ya existe" });

        const proyecto = await Project.create({ name, description });

        if (user_ids && Array.isArray(user_ids)) {
            const usuarios = await User.findAll({ where: { id: user_ids } });
            await proyecto.addUsers(usuarios);
        }

        res.status(201).json({ message: "Proyecto creado con éxito", proyecto });
    } catch (error) {
        res.status(500).json({ message: "Error al crear proyecto", error: error.message });
    }
};

export const getProjects = async (req, res) => {
    try {
        const proyectos = await Project.findAll({
            include: [{ model: User, as: "users", attributes: ["id", "name", "email"] }]
        });
        res.status(200).json(proyectos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener proyectos", error: error.message });
    }
};
