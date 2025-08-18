import { Profile } from "../models/profile.models.js";
import { User } from "../models/users.models.js";

export const createProfile = async (req, res) => {
    try {
        const { address, phone, user_id } = req.body;
        if (!address || !phone || !user_id) {
            return res.status(400).json({ message: "Datos inválidos" });
        }

        const usuario = await User.findByPk(user_id);
        if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

        const existePerfil = await Profile.findOne({ where: { user_id } });
        if (existePerfil) return res.status(400).json({ message: "El usuario ya tiene un perfil" });

        const perfil = await Profile.create({ address, phone, user_id });
        res.status(201).json({ message: "Perfil creado con éxito", perfil });
    } catch (error) {
        res.status(500).json({ message: "Error al crear perfil", error: error.message });
    }
};

export const getProfiles = async (req, res) => {
    try {
        const perfiles = await Profile.findAll({ include: [{ model: User, as: "user", attributes: ["id", "name", "email"] }] });
        res.status(200).json(perfiles);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener perfiles", error: error.message });
    }
};
