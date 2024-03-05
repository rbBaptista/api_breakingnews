import Router from "express";

import { create, getAll } from "../controllers/news.controller.js";

import { validateId } from "../middlewares/global.middleware.js";

import { authmiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authmiddleware, create);

router.get("/", getAll);

export default router;