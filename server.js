import express from "express";
import { router } from "./src/routes/user.route.js";
import connectDB from "./src/database/db.js";

const app = express();
const PORT = 3001;

app.use(express.json());

app.use("/user", router);

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