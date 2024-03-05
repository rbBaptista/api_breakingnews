import News from "../models/News.model.js";

const createNews = (body) => {
    return News.create(body);
};

const findAllNews = () => {
    return News.find();
};

export { createNews, findAllNews };
