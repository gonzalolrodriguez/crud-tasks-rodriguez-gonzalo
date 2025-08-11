import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT
    }
);



export const initDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("La conexión ha sido exitosa.");
        await sequelize.sync();
    } catch (error) {
        console.error("No se puede conectar a la base de datos:", error);
    }
}
