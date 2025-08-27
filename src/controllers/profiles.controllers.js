import { Profile } from "../models/profile.models.js";
import { User } from "../models/users.models.js";

export const createProfile = async (req, res) => {
    try {
        const { bio, user_id } = req.body;

        const user = await User.findByPk(user_id);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        const exists = await Profile.findOne({ where: { user_id } });
        if (exists) return res.status(400).json({ message: "El usuario ya tiene un perfil" });

        const profile = await Profile.create({ bio, user_id });
        return res.status(201).json({ message: "Perfil creado", profile });
    } catch (error) {
        return res.status(500).json({ message: "Error al crear perfil", error: error.message });
    }
};

export const getProfiles = async (_req, res) => {
    try {
        const profiles = await Profile.findAll({ include: [{ model: User, as: "user" }] });
        return res.status(200).json(profiles);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener perfiles", error: error.message });
    }
};

export const getProfileById = async (req, res) => {
    try {
        const profile = await Profile.findByPk(req.params.id, { include: [{ model: User, as: "user" }] });
        if (!profile) return res.status(404).json({ message: "Perfil no encontrado" });
        return res.status(200).json(profile);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener perfil", error: error.message });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { bio } = req.body;
        const profile = await Profile.findByPk(req.params.id);
        if (!profile) return res.status(404).json({ message: "Perfil no encontrado" });

        await profile.update({ bio });
        return res.status(200).json({ message: "Perfil actualizado", profile });
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar perfil", error: error.message });
    }
};

export const deleteProfile = async (req, res) => {
    try {
        const profile = await Profile.findByPk(req.params.id);
        if (!profile) return res.status(404).json({ message: "Perfil no encontrado" });

        await profile.destroy();
        return res.status(200).json({ message: "Perfil eliminado" });
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar perfil", error: error.message });
    }
};
