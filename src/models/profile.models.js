import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { User } from "./users.models.js";

export const Profile = sequelize.define("profiles", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    bio: { type: DataTypes.STRING(255), allowNull: true },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: { model: "users", key: "id" }
    }
}, {
    tableName: "profiles",
    timestamps: true
});

// 1:1 con cascada
User.hasOne(Profile, {
    foreignKey: "user_id",
    as: "profile",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});
Profile.belongsTo(User, { foreignKey: "user_id", as: "user" });
