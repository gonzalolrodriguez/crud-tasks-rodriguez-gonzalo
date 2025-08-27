import { Project } from "../models/projects.models.js";
import { User } from "../models/users.models.js";

export const createProject = async (req, res) => {
    try {
        const { name, description } = req.body;

        const exists = await Project.findOne({ where: { name }, paranoid: false });
        if (exists && !exists.deleted_at)
            return res.status(400).json({ message: "El proyecto ya existe" });

        // Si existe soft-deleted con mismo nombre, se podría restaurar en vez de crear
        const project = await Project.create({ name, description });
        return res.status(201).json({ message: "Proyecto creado", project });
    } catch (error) {
        return res.status(500).json({ message: "Error al crear proyecto", error: error.message });
    }
};

export const getProjects = async (_req, res) => {
    try {
        const projects = await Project.findAll({
            include: [{ model: User, as: "users", through: { attributes: [] }, attributes: ["id", "name", "email"] }]
        });
        return res.status(200).json(projects);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener proyectos", error: error.message });
    }
};

export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id, {
            include: [{ model: User, as: "users", through: { attributes: [] }, attributes: ["id", "name", "email"] }]
        });
        if (!project) return res.status(404).json({ message: "Proyecto no encontrado" });
        return res.status(200).json(project);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener proyecto", error: error.message });
    }
};

export const updateProject = async (req, res) => {
    try {
        const { name, description } = req.body;
        const project = await Project.findByPk(req.params.id);
        if (!project) return res.status(404).json({ message: "Proyecto no encontrado" });

        if (name && name !== project.name) {
            const exists = await Project.findOne({ where: { name } });
            if (exists) return res.status(400).json({ message: "Nombre de proyecto ya en uso" });
        }

        await project.update({ name, description });
        return res.status(200).json({ message: "Proyecto actualizado", project });
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar proyecto", error: error.message });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (!project) return res.status(404).json({ message: "Proyecto no encontrado" });

        await project.destroy(); // 🔹 soft delete (paranoid: true)
        return res.status(200).json({ message: "Proyecto eliminado (lógico)" });
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar proyecto", error: error.message });
    }
};

export const restoreProject = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id, { paranoid: false });
        if (!project) return res.status(404).json({ message: "Proyecto no encontrado" });
        if (!project.deleted_at) return res.status(400).json({ message: "El proyecto no está eliminado" });

        await project.restore();
        return res.status(200).json({ message: "Proyecto restaurado", project });
    } catch (error) {
        return res.status(500).json({ message: "Error al restaurar proyecto", error: error.message });
    }
};
