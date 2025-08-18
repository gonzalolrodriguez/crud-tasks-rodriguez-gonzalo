import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Task = sequelize.define("Task", {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    description: { type: DataTypes.STRING(100), allowNull: false },
    isComplete: { type: DataTypes.BOOLEAN, defaultValue: false },
    user_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false }
}, {
    tableName: "Tasks",
    timestamps: true
});
