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

export { createUser, findAllUsers, findUserById };