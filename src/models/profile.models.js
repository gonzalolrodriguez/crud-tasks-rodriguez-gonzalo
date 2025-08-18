import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { User } from "./users.models.js";

export const Profile = sequelize.define("Profile", {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    address: { type: DataTypes.STRING(150), allowNull: false },
    phone: { type: DataTypes.STRING(20), allowNull: false },
    user_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, unique: true }
}, {
    tableName: "Profiles",
    timestamps: true
});

// Relación 1:1
User.hasOne(Profile, { foreignKey: "user_id", as: "profile" });
Profile.belongsTo(User, { foreignKey: "user_id", as: "user" });
