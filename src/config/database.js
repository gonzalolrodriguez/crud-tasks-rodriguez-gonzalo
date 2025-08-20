import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Conexión Sequelize
export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT,
        logging: false
    }
);

// Inicialización de la DB
export const initDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexión a la base de datos establecida correctamente.");
        await sequelize.sync({ alter: true });
        console.log("Modelos sincronizados correctamente.");
    } catch (error) {
        console.error("Error al conectar con la base de datos:", error.message);
        process.exit(1); // termina si hay error
    }
};
