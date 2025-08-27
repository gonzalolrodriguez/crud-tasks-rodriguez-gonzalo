import { Router } from "express";
import { body, param } from "express-validator";
import { createUser, getUsers, getUserById, updateUser, deleteUser } from "../controllers/users.controllers.js";
import { validate } from "../middlewares/validate.js";

const router = Router();

router.post(
    "/users",
    [
        body("name").notEmpty().withMessage("name requerido").isLength({ min: 2 }),
        body("email").notEmpty().isEmail().withMessage("email inválido"),
        body("password").notEmpty().isLength({ min: 4 })
    ],
    validate,
    createUser
);

router.get("/users", getUsers);

router.get(
    "/users/:id",
    [param("id").isInt().withMessage("id inválido")],
    validate,
    getUserById
);

router.put(
    "/users/:id",
    [
        param("id").isInt(),
        body("name").optional().isLength({ min: 2 }),
        body("email").optional().isEmail(),
        body("password").optional().isLength({ min: 4 })
    ],
    validate,
    updateUser
);

router.delete(
    "/users/:id",
    [param("id").isInt()],
    validate,
    deleteUser
);

export default router;
