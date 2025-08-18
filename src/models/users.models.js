import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";


import { Task } from "./tasks.models.js";

export const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
});

// Relaciones uno a muchos
User.hasMany(Task, { foreignKey: 'user_id', as: 'tasks' });
Task.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// Función para sincronizar relaciones
export async function syncUserTaskRelations() {
    await User.sync();
    await Task.sync();
}
