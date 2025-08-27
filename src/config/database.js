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
        port: process.env.DB_PORT,
        logging: false
    }
);

export const initDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexión a la base de datos OK");
        // sincroniza modelos y aplica alter cuando haya cambios
        await sequelize.sync({ alter: true });
        console.log("Modelos sincronizados");
    } catch (error) {
        console.error("Error DB:", error.message);
        process.exit(1);
    }
};
