import { Router } from "express";
import { body, param } from "express-validator";
import { createProject, getProjects, getProjectById, updateProject, deleteProject, restoreProject } from "../controllers/projects.controllers.js";
import { validate } from "../middlewares/validate.js";

const router = Router();

router.post(
    "/projects",
    [body("name").notEmpty().isLength({ min: 2 }), body("description").optional().isLength({ max: 255 })],
    validate,
    createProject
);

router.get("/projects", getProjects);

router.get(
    "/projects/:id",
    [param("id").isInt()],
    validate,
    getProjectById
);

router.put(
    "/projects/:id",
    [
        param("id").isInt(),
        body("name").optional().isLength({ min: 2 }),
        body("description").optional().isLength({ max: 255 })
    ],
    validate,
    updateProject
);

router.delete(
    "/projects/:id",
    [param("id").isInt()],
    validate,
    deleteProject
);

// Restaurar proyecto eliminado lógicamente
router.post(
    "/projects/:id/restore",
    [param("id").isInt()],
    validate,
    restoreProject
);

export default router;
