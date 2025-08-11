import { User } from "../models/users.models.js";

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || name.length > 100 || !email || email.length > 100 || !password || password.length > 100) {
            return res.status(400).json({ message: "Datos inválidos" });
        }

        const existeEmail = await User.findOne({ where: { email } });
        if (existeEmail) {
            return res.status(400).json({ message: "El email ya está registrado" });
        }

        const nuevoUsuario = await User.create({ name, email, password });
        res.status(201).json({ message: "Usuario creado con éxito", usuario: nuevoUsuario });

    } catch (error) {
        res.status(500).json({ message: "Error al crear usuario", error: error.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        const usuarios = await User.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener usuarios", error: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const usuario = await User.findByPk(req.params.id);
        if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener usuario", error: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const usuario = await User.findByPk(req.params.id);

        if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

        if (email && email.length <= 100) {
            const existeEmail = await User.findOne({ where: { email } });
            if (existeEmail && existeEmail.id !== usuario.id) {
                return res.status(400).json({ message: "El email ya está registrado" });
            }
        }

        await usuario.update({ name, email, password });
        res.status(200).json({ message: "Usuario actualizado", usuario });

    } catch (error) {
        res.status(500).json({ message: "Error al actualizar usuario", error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const usuario = await User.findByPk(req.params.id);
        if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

        await usuario.destroy();
        res.status(200).json({ message: "Usuario eliminado" });

    } catch (error) {
        res.status(500).json({ message: "Error al eliminar usuario", error: error.message });
    }
};
