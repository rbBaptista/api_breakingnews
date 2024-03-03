import User from "../models/user.model.js";

const findUserByEmail = (email) => {
    return User.findOne({ email: email }).select("+password");
};

export { findUserByEmail };