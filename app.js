import express from "express";
import dotenv from "dotenv";
import { initDB } from "./src/config/database.js";

// Rutas
import userRoutes from "./src/routes/users.routes.js";
import taskRoutes from "./src/routes/tasks.routes.js";
import profileRoutes from "./src/routes/profiles.routes.js";
import projectRoutes from "./src/routes/projects.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

// Rutas
app.use("/api", userRoutes);
app.use("/api", taskRoutes);
app.use("/api", profileRoutes);
app.use("/api", projectRoutes);

// Inicializar DB y servidor
const PORT = process.env.PORT || 3000;
(async () => {
    try {
        await initDB();
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Error al iniciar la aplicación:", error.message);
    }
})();

export default app;
