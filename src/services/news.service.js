import News from "../models/News.model.js";
import { v4 as uuidv4 } from 'uuid';

const create = (body) => {
    return News.create(body);
};

const findAll = (offset, limit) => {
    return News.find().sort({ createdAt: -1 }).skip(offset).limit(limit).populate("user", "name email");
};

const count = () => {
    return News.countDocuments();
};

const findLast = () => {
    return News.find().sort({ createdAt: -1 }).limit(1);
};

const findById = (id) => {
    return News.findById(id);
};

const findByTitle = (title) => {
    console.log(title);
    return News.find({
        title: { $regex: `${title || ""}`, $options: "i" }
    }).sort({ createdAt: -1 });
};

const findByUserId = (userId) => {
    return News.find({ user: userId }).populate("user", "name email");
};

const updateByUserId = (id, title, text, banner) => {
    return News.findByIdAndUpdate({ _id: id }, { title, text, banner, updatedAt: Date.now() }, { new: true });
}

const deleteById = (id) => {
    return News.findByIdAndDelete(id);
};

const addLike = (id, userId) => {
    return News.findByIdAndUpdate(id, { $inc: { likes: 1 }, $push: { usersLiked: userId } }, { new: true });
};

const removeLike = (id, userId) => {
    return News.findByIdAndUpdate(id, { $inc: { likes: -1 }, $pull: { usersLiked: userId } }, { new: true });
}

const addComment = (id, userId, comment) => {
    const commentId = uuidv4();
    return News.findByIdAndUpdate(id, { $push: { comments: { id: commentId, user: userId, comment } } }, { new: true });
}

const removeComment = (id, commentId) => {
    return News.findByIdAndUpdate(id, { $pull: { comments: { id: commentId } } }, { new: true });
}

export { create, findAll, count, findLast, findById, findByTitle, findByUserId, updateByUserId, deleteById, addLike, removeLike, addComment, removeComment };
