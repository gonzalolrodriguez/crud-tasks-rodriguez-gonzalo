import { Router } from "express";
import { addUserToProject, getUserProjects, deleteUserProject } from "../controllers/user_projects.controllers.js";

const router = Router();
router.post("/user_projects", addUserToProject);
router.get("/user_projects", getUserProjects);
router.delete("/user_projects/:id", deleteUserProject);
export default router;
