import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { User } from "./users.models.js";

export const Project = sequelize.define("Project", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING(200),
        allowNull: true
    }
});

// Relación N:M
export const UserProjects = sequelize.define("UserProjects", {}, { timestamps: false });

User.belongsToMany(Project, { through: UserProjects, as: "projects", foreignKey: "user_id" });
Project.belongsToMany(User, { through: UserProjects, as: "users", foreignKey: "project_id" });
