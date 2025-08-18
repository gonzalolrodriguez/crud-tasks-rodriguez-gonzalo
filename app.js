import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/database.js";

// Importar rutas
import userRoutes from "./routes/users.routes.js";
import taskRoutes from "./routes/tasks.routes.js";
import profileRoutes from "./routes/profiles.routes.js";
import projectRoutes from "./routes/projects.routes.js";

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
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("❌ Error al iniciar la aplicación:", error.message);
    }
})();

export default app;
