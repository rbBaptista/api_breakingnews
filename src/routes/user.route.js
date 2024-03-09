import { Router } from "express";

import { createUser, getAllUser, getByUserId, updateByUserId, deleteByUserId } from "../controllers/user.controller.js";

import { validateId } from "../middlewares/global.middleware.js";

const router = Router();

router.post("/", createUser);

router.get("/", getAllUser);

router.get("/:id", validateId, getByUserId);

router.patch("/:id", validateId, updateByUserId);

router.delete("/:id", validateId, deleteByUserId);

export default router;