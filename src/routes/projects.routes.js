import { Router } from "express";
import { createProject, getProjects } from "../controllers/projects.controllers.js";

const router = Router();
router.post("/projects", createProject);
router.get("/projects", getProjects);
export default router;
