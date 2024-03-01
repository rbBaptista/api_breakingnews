import User from "../models/user.model.js";

const createUser = (body) => {
    return User.create(body);
};

const findAllUsers = () => {
    return User.find();
};

const findUserById = (id) => {
    return User.findById(id);
};

const updateUserById = (id, name, username, email, password, avatar, background) => {
    return User.findByIdAndUpdate({ _id: id }, { name, username, email, password, avatar, background }, { new: true });
}

const deleteUserById = (id) => {
    return User.findByIdAndDelete(id);
}

export { createUser, findAllUsers, findUserById, updateUserById, deleteUserById };