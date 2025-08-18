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

export async function initDB() {
    try {
        await sequelize.authenticate();
        console.log("✅ Conexión a la base de datos exitosa.");
        // Fuerza recrear tablas limpias para evitar errores de FK
        await sequelize.sync({ force: true });
        console.log("✅ Tablas sincronizadas correctamente");
    } catch (error) {
        console.error("Error al conectar la base de datos:", error.message);
        throw error;
    }
}
