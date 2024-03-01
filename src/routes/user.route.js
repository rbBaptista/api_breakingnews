import { Router } from "express";

import { create, getAll, getById, updateById, deleteById } from "../controllers/user.controller.js";

import { validateId } from "../middlewares/global.middlewares.js";

const router = Router();

router.post("/", create);

router.get("/", getAll);

router.get("/:id", validateId, getById);

router.put("/:id", validateId, updateById);

router.delete("/:id", validateId, deleteById);

export { router };