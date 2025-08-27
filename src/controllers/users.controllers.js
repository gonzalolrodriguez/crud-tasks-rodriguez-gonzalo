import { User } from "../models/users.models.js";
import { Task } from "../models/tasks.models.js";
import { Profile } from "../models/profiles.models.js";
import { Project } from "../models/projects.models.js";

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const exists = await User.findOne({ where: { email } });
        if (exists) return res.status(400).json({ message: "Email ya registrado" });

        const user = await User.create({ name, email, password });
        return res.status(201).json({ message: "Usuario creado", user });
    } catch (error) {
        return res.status(500).json({ message: "Error al crear usuario", error: error.message });
    }
};

export const getUsers = async (_req, res) => {
    try {
        const users = await User.findAll({
            include: [
                { model: Task, as: "tasks" },
                { model: Profile, as: "profile" },
                { model: Project, as: "projects", through: { attributes: [] } }
            ]
        });
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener usuarios", error: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: [
                { model: Task, as: "tasks" },
                { model: Profile, as: "profile" },
                { model: Project, as: "projects", through: { attributes: [] } }
            ]
        });
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener usuario", error: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        if (email && email !== user.email) {
            const exists = await User.findOne({ where: { email } });
            if (exists) return res.status(400).json({ message: "Email ya en uso" });
        }

        await user.update({ name, email, password });
        return res.status(200).json({ message: "Usuario actualizado", user });
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar usuario", error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        await user.destroy(); // 🔹 cascada eliminará profile, tasks y relaciones N:M
        return res.status(200).json({ message: "Usuario eliminado" });
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar usuario", error: error.message });
    }
};
