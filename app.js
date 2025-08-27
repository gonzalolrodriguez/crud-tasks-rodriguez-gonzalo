import express from "express";
import dotenv from "dotenv";
import { initDB } from "./src/config/database.js";

// Rutas
import userRoutes from "./src/routes/users.routes.js";
import taskRoutes from "./src/routes/tasks.routes.js";
import profileRoutes from "./src/routes/profiles.routes.js";
import projectRoutes from "./src/routes/projects.routes.js";
import userProjectRoutes from "./src/routes/user_projects.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

// Prefijo común
app.use("/api", userRoutes);
app.use("/api", taskRoutes);
app.use("/api", profileRoutes);
app.use("/api", projectRoutes);
app.use("/api", userProjectRoutes);

const PORT = process.env.PORT;

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(` Servidor en http://localhost:${PORT}`);
    });
});
