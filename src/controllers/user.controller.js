import {
    create,
    findAll,
    findById,
    updateById,
    deleteById,
} from "../services/user.service.js";
import { generateToken } from "../services/auth.service.js";

const createUser = async (req, res) => {
    try {
        const { name, username, email, password, avatar, background } =
            req.body;

        if (!name || !username || !email || !password) {
            return res.status(400).send({ message: "All fields are required" });
        }

        const user = await create(req.body);

        if (!user) {
            return res.status(500).send({ message: "Error creating user" });
        }

        const token = generateToken(user.id);

        res.status(201).send({
            message: "User created",
            token,
            user: {
                id: user._id,
                name,
                username,
                email,
                avatar,
                background,
            },
        });

        return token;
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message }); //
    }
};

const getAllUser = async (_, res) => {
    try {
        const users = await findAll();

        if (!users) {
            return res.status(500).send({ message: "Error fetching users" });
        }

        res.status(200).send(users);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
};

const getByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await findById(id);

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        res.status(200).send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
};

const updateByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, username, email, password, avatar, background } =
            req.body;
        const user = await updateById(
            id,
            name,
            username,
            email,
            password,
            avatar,
            background,
        );

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        res.status(200).send({
            message: "User updated",
            user: {
                id,
                name,
                username,
                email,
                avatar,
                background,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
};

const deleteByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await deleteById(id);

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        res.status(200).send({ message: "User deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
};

export { createUser, getAllUser, getByUserId, updateByUserId, deleteByUserId };
