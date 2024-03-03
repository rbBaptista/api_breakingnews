import { Router } from "express";

import { login } from "../controllers/auth.cotroller.js";

const router = Router();

router.post("/login", login);

export default router;