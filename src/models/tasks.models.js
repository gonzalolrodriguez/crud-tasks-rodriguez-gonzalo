import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { User } from "./users.models.js";

export const Task = sequelize.define("tasks", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.STRING(255), allowNull: false },
    isComplete: { type: DataTypes.BOOLEAN, defaultValue: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: "users", key: "id" } }
}, { tableName: "tasks", timestamps: false });

// Relaciones
User.hasMany(Task, { foreignKey: "user_id", as: "tasks" });
Task.belongsTo(User, { foreignKey: "user_id", as: "user" });
