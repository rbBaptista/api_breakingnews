import { createUser, findAllUsers, findUserById } from "../services/user.service.js";
import mongoose from 'mongoose';

const create = async (req, res) => {

    const { name, username, email, password, avatar, background } = req.body;

    if (!name || !username || !email || !password || !avatar || !background) {
        console.log(req.body);
        return res.status(400).send({ message: "All fields are required" });
    }

    const user = await createUser(req.body);

    if (!user) {
        return res.status(500).send({ message: "Error creating user" });
    }

    res.status(201).send({
        message: "User created",
        user: {
            // id: user._id,
            name,
            username,
            email,
            avatar,
            background
        }
    });
};

const getAll = async (req, res) => {
    const users = await findAllUsers();

    if (!users) {
        return res.status(500).send({ message: "Error fetching users" });
    }

    res.status(200).send(users);
};

const getById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: "Invalid ID" });
    }

    const user = await findUserById(id);

    if (!user) {
        return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send(user);
};

export { create, getAll, getById };