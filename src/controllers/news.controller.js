import { createNews, findAllNews } from "../services/news.service.js";

const create = async (req, res) => {
    try {
        const { title, text, banner } = req.body;
        const userId = req.userId;

        if (!title || !text || !banner) {
            return res.status(400).send({ message: "All fields are required" });
        }

        req.body.user = userId;

        const news = await createNews(req.body);

        if (!news) {
            return res.status(500).send({ message: "Error creating news" });
        }

        res.status(201).send({
            message: "News created",
            news: {
                userName: req.userName,
                id: news._id,
                userid: news.user,
                title,
                text,
                banner
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
}

const getAll = async (req, res) => {
    try {
        const news = await findAllNews();

        if (!news) {
            return res.status(500).send({ message: "Error fetching news" });
        }

        res.status(200).send(news);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
}

export { create, getAll };