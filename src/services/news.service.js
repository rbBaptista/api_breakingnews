import News from "../models/News.model.js";

const createNews = (body) => {
    return News.create(body);
};

const findAllNews = (offset, limit) => {
    return News.find().sort({ createdAt: -1 }).skip(offset).limit(limit).populate("user", "name email");
};

const countNews = () => {
    return News.countDocuments();
};

const findLastNews = () => {
    return News.find().sort({ createdAt: -1 }).limit(1);
};

const findNewsById = (id) => {
    return News.findById(id);
};

const findNewsByTitle = (title) => {
    console.log(title);
    return News.find({
        title: { $regex: `${title || ""}`, $options: "i" }
    }).sort({ createdAt: -1 });
};

const findNewsByMyUserId = (userId) => {
    return News.find({ user: userId }).populate("user", "name email");
};

export { createNews, findAllNews, countNews, findLastNews, findNewsById, findNewsByTitle, findNewsByMyUserId };
