import { UserProjects } from "../models/user_projects.models.js";
import { User } from "../models/users.models.js";
import { Project } from "../models/projects.models.js";

export const addUserToProject = async (req, res) => {
    try {
        const { user_id, project_id } = req.body;
        if (!user_id || !project_id) return res.status(400).json({ message: "Faltan datos" });

        const usuario = await User.findByPk(user_id);
        if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

        const proyecto = await Project.findByPk(project_id);
        if (!proyecto) return res.status(404).json({ message: "Proyecto no encontrado" });

        const existe = await UserProjects.findOne({ where: { user_id, project_id } });
        if (existe) return res.status(400).json({ message: "La relación ya existe" });

        const relacion = await UserProjects.create({ user_id, project_id });
        res.status(201).json({ message: "Relación creada con éxito", relacion });
    } catch (error) {
        res.status(500).json({ message: "Error al crear relación", error: error.message });
    }
};

export const getUserProjects = async (req, res) => {
    try {
        const relaciones = await UserProjects.findAll({
            include: [
                { model: User, as: "user", attributes: ["id", "name", "email"] },
                { model: Project, as: "project", attributes: ["id", "name", "description"] }
            ]
        });
        res.status(200).json(relaciones);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener relaciones", error: error.message });
    }
};

export const deleteUserProject = async (req, res) => {
    try {
        const { id } = req.params;
        const relacion = await UserProjects.findByPk(id);
        if (!relacion) return res.status(404).json({ message: "Relación no encontrada" });

        await relacion.destroy();
        res.status(200).json({ message: "Relación eliminada" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar relación", error: error.message });
    }
};
