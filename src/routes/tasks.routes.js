import { Router } from "express";
import { body, param } from "express-validator";
import { createTask, getTasks, getTaskById, updateTask, deleteTask } from "../controllers/tasks.controllers.js";
import { validate } from "../middlewares/validate.js";

const router = Router();

router.post(
    "/tasks",
    [
        body("title").notEmpty().isLength({ min: 3 }),
        body("description").notEmpty().isLength({ min: 3 }),
        body("isComplete").optional().isBoolean(),
        body("user_id").notEmpty().isInt()
    ],
    validate,
    createTask
);

router.get("/tasks", getTasks);

router.get(
    "/tasks/:id",
    [param("id").isInt()],
    validate,
    getTaskById
);

router.put(
    "/tasks/:id",
    [
        param("id").isInt(),
        body("title").optional().isLength({ min: 3 }),
        body("description").optional().isLength({ min: 3 }),
        body("isComplete").optional().isBoolean(),
        body("user_id").optional().isInt()
    ],
    validate,
    updateTask
);

router.delete(
    "/tasks/:id",
    [param("id").isInt()],
    validate,
    deleteTask
);

export default router;
