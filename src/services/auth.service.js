import User from "../models/User.model.js";
import jwt from "jsonwebtoken";

const findUserByEmail = (email) => {
    return User.findOne({ email: email }).select("+password");
};

const generateToken = (id) => {
    console.log(id);
    return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export { findUserByEmail, generateToken };