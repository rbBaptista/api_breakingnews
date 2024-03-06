import { createNews, findAllNews, countNews, findLastNews, findNewsById, findNewsByTitle, findNewsByMyUserId } from "../services/news.service.js";

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

    let { limit, offset } = req.query;

    limit = Number(limit) || 2;
    offset = Number(offset) || 0;

    try {
        const news = await findAllNews(offset, limit);
        const total = await countNews();
        const currentUrl = req.baseUrl;
        console.log(currentUrl, total);

        const nextUrl = offset + limit < total ? `${currentUrl}?limit=${limit}&offset=${offset + limit}` : null;
        const previousUrl = offset > 0 ? `${currentUrl}?limit=${limit}&offset=${offset - limit}` : null;

        if (!news) {
            return res.status(500).send({ message: "Error fetching news" });
        }

        res.status(200).send({ nextUrl, previousUrl, limit, offset, total, news });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
}

const getLastNews = async (req, res) => {
    try {
        const news = await findLastNews();

        if (!news) {
            return res.status(500).send({ message: "Error fetching news" });
        }

        res.status(200).send(news);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
}

const getNewsById = async (req, res) => {
    try {
        const { id } = req.params;
        const news = await findNewsById(id);

        if (!news) {
            return res.status(404).send({ message: "News not found" });
        }

        res.status(200).send(news);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
}

const getNewsByTitle = async (req, res) => {
    try {
        const { title } = req.query;
        const news = await findNewsByTitle(title);
        console.log(title);

        if (!news) {
            return res.status(404).send({ message: "Search news not found" });
        }

        res.status(200).send(news);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
}

const getNewsByMyUserId = async (req, res) => {
    try {
        const userId = req.userId;
        const news = await findNewsByMyUserId(userId);

        if (!news) {
            return res.status(404).send({ message: "News not found" });
        }

        res.status(200).send(news);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
}

export { create, getAll, getLastNews, getNewsById, getNewsByTitle, getNewsByMyUserId };