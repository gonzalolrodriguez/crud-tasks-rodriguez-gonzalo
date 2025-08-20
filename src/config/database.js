import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import express from "express";

// Importar rutas
import userRoutes from "../routes/users.routes.js";
import taskRoutes from "../routes/tasks.routes.js";
import profileRoutes from "../routes/profiles.routes.js";
import projectRoutes from "../routes/projects.routes.js";
import userProjectRoutes from "../routes/user_projects.routes.js";

dotenv.config();

// Configuración de Sequelize
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

const app = express();
app.use(express.json());

// Rutas
app.use("/api", userRoutes);
app.use("/api", taskRoutes);
app.use("/api", profileRoutes);
app.use("/api", projectRoutes);
app.use("/api", userProjectRoutes);

const PORT = process.env.PORT;

// Inicialización de BD y servidor
(async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Conexión a la base de datos exitosa.");
        await sequelize.sync({ alter: true });

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Error al iniciar la aplicación:", error.message);
    }
})();
