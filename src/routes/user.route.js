import { Router } from "express";

import {
    createUser,
    getAllUser,
    getByUserId,
    updateByUserId,
    deleteByUserId,
} from "../controllers/user.controller.js";

import { validateId } from "../middlewares/global.middleware.js";

import { authmiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", createUser);

router.get("/:id?", authmiddleware, validateId, getByUserId);

router.get("/", getAllUser);

router.patch("/:id", validateId, updateByUserId);

router.delete("/:id", validateId, deleteByUserId);

export default router;
