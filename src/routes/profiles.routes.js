import { Router } from "express";
import { body, param } from "express-validator";
import { createProfile, getProfiles, getProfileById, updateProfile, deleteProfile } from "../controllers/profiles.controllers.js";
import { validate } from "../middlewares/validate.js";

const router = Router();

router.post(
    "/profiles",
    [
        body("bio").optional().isLength({ max: 255 }),
        body("user_id").notEmpty().isInt().withMessage("user_id entero requerido")
    ],
    validate,
    createProfile
);

router.get("/profiles", getProfiles);

router.get(
    "/profiles/:id",
    [param("id").isInt()],
    validate,
    getProfileById
);

router.put(
    "/profiles/:id",
    [
        param("id").isInt(),
        body("bio").optional().isLength({ max: 255 })
    ],
    validate,
    updateProfile
);

router.delete(
    "/profiles/:id",
    [param("id").isInt()],
    validate,
    deleteProfile
);

export default router;
