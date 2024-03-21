import Router from "express";

import {
    createNews,
    getAllNews,
    getLastNews,
    getNewsById,
    getNewsByTitle,
    getNewsByUserId,
    updateNews,
    deleteNews,
    updateNewsLikes,
    updateNewsComment,
    deleteNewsComment,
} from "../controllers/news.controller.js";

import { validateId } from "../middlewares/global.middleware.js";

import { authmiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authmiddleware, createNews);

router.get("/", getAllNews);

router.get("/last", getLastNews);

router.get("/search", getNewsByTitle);

router.get("/my-news", authmiddleware, getNewsByUserId);

router.patch("/likes/:id", authmiddleware, updateNewsLikes);

router.patch("/comments/:id", authmiddleware, updateNewsComment);

router.delete("/comments/:id/:commentId", authmiddleware, deleteNewsComment);

router.delete("/:id", authmiddleware, deleteNews);

router.patch("/:id", authmiddleware, updateNews);

router.get("/:id", validateId, getNewsById);

export default router;
