import User from "../models/User.model.js";

const create = async (body) => {
    const existingUser = await User.findOne({
        $or: [{ email: body.email }, { username: body.username }],
    });
    if (existingUser) {
        throw new Error("User already exists");
    }

    return User.create(body);
};

const findAll = () => {
    return User.find();
};

const findById = (id) => {
    return User.findById(id);
};

const updateById = (
    id,
    name,
    username,
    email,
    password,
    avatar,
    background,
) => {
    return User.findByIdAndUpdate(
        { _id: id },
        { name, username, email, password, avatar, background },
        { new: true },
    );
};

const deleteById = (id) => {
    return User.findByIdAndDelete(id);
};

export { create, findAll, findById, updateById, deleteById };
