import express from "express";

import { router } from "./src/routes/user.route.js";

const app = express();
const PORT = 3000;

app.use("/hello", router);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});