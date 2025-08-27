import { UserProjects } from "../models/user_projects.models.js";
import { User } from "../models/users.models.js";
import { Project } from "../models/projects.models.js";

export const addUserToProject = async (req, res) => {
    try {
        const { user_id, project_id } = req.body;

        const user = await User.findByPk(user_id);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        const project = await Project.findByPk(project_id);
        if (!project) return res.status(404).json({ message: "Proyecto no encontrado" });

        const exists = await UserProjects.findOne({ where: { user_id, project_id } });
        if (exists) return res.status(400).json({ message: "La relación ya existe" });

        const relation = await UserProjects.create({ user_id, project_id });
        return res.status(201).json({ message: "Relación creada", relation });
    } catch (error) {
        return res.status(500).json({ message: "Error al crear relación", error: error.message });
    }
};

export const getUserProjects = async (_req, res) => {
    try {
        const relations = await UserProjects.findAll({
            include: [
                { model: User, as: "users", through: { attributes: [] } },
                { model: Project, as: "projects", through: { attributes: [] } }
            ]
        });

        return res.status(200).json(relations);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener relaciones", error: error.message });
    }
};

export const deleteUserProject = async (req, res) => {
    try {
        const relation = await UserProjects.findByPk(req.params.id);
        if (!relation) return res.status(404).json({ message: "Relación no encontrada" });

        await relation.destroy();
        return res.status(200).json({ message: "Relación eliminada" });
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar relación", error: error.message });
    }
};
