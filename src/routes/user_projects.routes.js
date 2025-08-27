import { Router } from "express";
import { body, param } from "express-validator";
import { addUserToProject, getUserProjects, deleteUserProject } from "../controllers/user_projects.controllers.js";
import { validate } from "../middlewares/validate.js";

const router = Router();

router.post(
    "/user_projects",
    [
        body("user_id").notEmpty().isInt(),
        body("project_id").notEmpty().isInt()
    ],
    validate,
    addUserToProject
);

router.get("/user_projects", getUserProjects);

router.delete(
    "/user_projects/:id",
    [param("id").isInt()],
    validate,
    deleteUserProject
);

export default router;
