import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { User } from "./users.models.js";

export const Profile = sequelize.define("profiles", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    address: { type: DataTypes.STRING(150), allowNull: false },
    phone: { type: DataTypes.STRING(20), allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false, unique: true }
}, { tableName: "profiles" });

// Relaciones 1:1
User.hasOne(Profile, { foreignKey: "user_id", as: "profile" });
Profile.belongsTo(User, { foreignKey: "user_id", as: "user" });
