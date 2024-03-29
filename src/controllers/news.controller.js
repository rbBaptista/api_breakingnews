import {
    create,
    findAll,
    count,
    findLast,
    findById,
    findByTitle,
    findByUserId,
    updateByUserId,
    deleteById,
    addLike,
    removeLike,
    addComment,
    removeComment,
} from "../services/news.service.js";

const createNews = async (req, res) => {
    try {
        const { title, text, image } = req.body;
        const userId = req.userId;
        console.log(userId);

        if (!title || !text || !image) {
            return res.status(400).send({ message: "All fields are required" });
        }

        req.body.userId = userId; // Changed from 'user'

        const news = await create(req.body);

        console.log(news);

        if (!news) {
            return res.status(500).send({ message: "Error creating news" });
        }

        res.status(201).send({
            message: "News created",
            news: {
                userName: req.userName,
                id: news._id,
                userId: news.userId, // Changed from 'userid: news.user'
                title,
                text,
                image,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
};

const getAllNews = async (req, res) => {
    let { limit, offset } = req.query;

    limit = Number(limit) || 8;
    offset = Number(offset) || 0;

    try {
        const news = await findAll(offset, limit);
        const total = await count();
        const currentUrl = req.baseUrl;
        console.log(currentUrl, total);

        const nextUrl =
            offset + limit < total
                ? `${currentUrl}?limit=${limit}&offset=${offset + limit}`
                : null;
        const previousUrl =
            offset > 0
                ? `${currentUrl}?limit=${limit}&offset=${offset - limit}`
                : null;

        if (!news) {
            return res.status(500).send({ message: "Error fetching news" });
        }

        res.status(200).send({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,
            news,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
};

const getLastNews = async (req, res) => {
    try {
        const news = await findLast();

        if (!news) {
            return res.status(500).send({ message: "Error fetching news" });
        }

        res.status(200).send(news);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
};

const getNewsById = async (req, res) => {
    try {
        const { id } = req.params;
        const news = await findById(id);

        if (!news) {
            return res.status(404).send({ message: "News not found" });
        }

        res.status(200).send(news);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
};

const getNewsByTitle = async (req, res) => {
    try {
        const { title } = req.query;
        const news = await findByTitle(title);
        console.log(title);

        if (!news) {
            return res.status(404).send({ message: "Search news not found" });
        }

        res.status(200).send(news);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
};

const getNewsByUserId = async (req, res) => {
    try {
        const userId = req.userId;
        const news = await findByUserId(userId);

        if (!news) {
            return res.status(404).send({ message: "News not found" });
        }

        res.status(200).send(news);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
};

const updateNews = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, text, image } = req.body;
        const userId = req.userId;

        if (!id && !title && !text && !image) {
            return res.status(400).send({ message: "All fields are required" });
        }

        const news = await updateByUserId(id, title, text, image);

        if (userId !== news.user.toString()) {
            return res.status(401).send({ message: "Unauthorized" });
        }

        if (!news) {
            return res.status(500).send({ message: "Error updating news" });
        }

        res.status(200).send({
            message: "News updated",
            news: {
                userName: req.userName,
                id: news._id,
                title,
                text,
                image,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
};

const deleteNews = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        const news = await deleteById(id);

        if (userId !== news.user.toString()) {
            return res.status(401).send({ message: "Unauthorized" });
        }

        if (!news) {
            return res.status(500).send({ message: "Error deleting news" });
        }

        res.status(200).send({ message: "News deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
};

const updateNewsLikes = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        let news = await findById(id);

        if (!news) {
            return res.status(404).send({ message: "News not found" });
        }

        if (news.usersLiked.includes(userId)) {
            news = await removeLike(id, userId);
            return res.status(400).send({ message: "Like removed" });
        }

        news = await addLike(id, userId);

        if (!news) {
            return res.status(500).send({ message: "Error updating news" });
        }

        res.status(200).send({ message: "News updated, +1 like" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
};

const updateNewsComment = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const { comment } = req.body;

        let news = await findById(id);

        if (!news) {
            return res.status(404).send({ message: "News not found" });
        }

        news = await addComment(id, userId, comment);

        if (!news) {
            return res.status(500).send({ message: "Error updating news" });
        }

        res.status(200).send({ message: "Comment added" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
};

const deleteNewsComment = async (req, res) => {
    try {
        const { id, commentId } = req.params;

        let news = await findById(id);

        if (!news) {
            return res.status(404).send({ message: "News not found" });
        }

        news = await removeComment(id, commentId);

        if (!news) {
            return res.status(500).send({ message: "Error updating news" });
        }

        res.status(200).send({ message: "Comment removed" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
};

export {
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
};
