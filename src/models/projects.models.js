import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Project = sequelize.define("projects", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    description: { type: DataTypes.STRING(255), allowNull: true }
}, {
    tableName: "projects",
    timestamps: true,
    paranoid: true,            // Eliminación lógica
    deletedAt: "deleted_at"
});
