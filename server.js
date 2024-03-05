import express from "express";
import connectDB from "./src/database/db.js";
import dotenv from "dotenv";
import cors from "cors";

import userRoute from "./src/routes/user.route.js";
import authRoute from "./src/routes/auth.route.js";
import newsRoute from "./src/routes/news.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.use(express.json());

app.use("/user", userRoute);

app.use("/auth", authRoute);

app.use("/news", newsRoute);

app.use((_, res) => {
    res.status(404).send('Sorry, we cannot find that!');
});

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error... Server not connected:', error);
    }
};

startServer();