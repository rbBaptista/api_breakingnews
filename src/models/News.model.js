import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    image: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    likes: { type: Number, default: 0 },
    usersLiked: { type: Array, required: true, default: [] },
    comments: { type: Array, required: true, default: [] },
});

const News = mongoose.model("News", NewsSchema);

export default News;
