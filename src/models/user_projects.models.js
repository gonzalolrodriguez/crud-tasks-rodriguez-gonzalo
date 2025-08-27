import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { User } from "./users.models.js";
import { Project } from "./projects.models.js";

export const UserProjects = sequelize.define("user_projects", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" }
    },
    project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "projects", key: "id" }
    }
}, {
    tableName: "user_projects",
    timestamps: true,
    indexes: [
        { unique: true, fields: ["user_id", "project_id"] }
    ]
});

User.belongsToMany(Project, {
    through: UserProjects,
    as: "projects",
    foreignKey: "user_id",
    otherKey: "project_id",
    onDelete: "CASCADE",   //  Se borra user -> y se eliminan filas en tabla intermedia
    onUpdate: "CASCADE"
});
Project.belongsToMany(User, {
    through: UserProjects,
    as: "users",
    foreignKey: "project_id",
    otherKey: "user_id",
    onDelete: "CASCADE",   // Al borrar project (cascade o lógico) -> elimina filas intermedias
    onUpdate: "CASCADE"
});
