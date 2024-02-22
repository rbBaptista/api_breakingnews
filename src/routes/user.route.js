import { Router } from "express";

import { hello } from "../controllers/user.controller.js";

const router = Router();

router.get("/", hello);

export { router };