import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { User } from "./users.models.js";
import { Project } from "./project.models.js";

export const UserProjects = sequelize.define("user_projects", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    project_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
    tableName: "user_projects",
    timestamps: false
});

// Relaciones N:M
User.belongsToMany(Project, { through: UserProjects, as: "projects", foreignKey: "user_id" });
Project.belongsToMany(User, { through: UserProjects, as: "users", foreignKey: "project_id" });

// Alias para incluir en consultas
UserProjects.belongsTo(User, { foreignKey: "user_id", as: "user" });
UserProjects.belongsTo(Project, { foreignKey: "project_id", as: "project" });
