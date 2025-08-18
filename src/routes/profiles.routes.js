import { Router } from "express";
import { createProfile, getProfiles } from "../controllers/profiles.controllers.js";

const router = Router();

router.post("/profiles", createProfile);
router.get("/profiles", getProfiles);

export default router;
