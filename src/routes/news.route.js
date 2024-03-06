import Router from "express";

import { create, getAll, getLastNews, getNewsById, getNewsByTitle, getNewsByMyUserId } from "../controllers/news.controller.js";

import { validateId } from "../middlewares/global.middleware.js";

import { authmiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authmiddleware, create);

router.get("/", getAll);

router.get("/last", getLastNews);

router.get("/search", getNewsByTitle);

router.get("/my-news", authmiddleware, getNewsByMyUserId);

router.get("/:id", validateId, getNewsById);

export default router;