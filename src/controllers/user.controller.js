import { createUser, findAllUsers, findUserById, updateUserById, deleteUserById } from "../services/user.service.js";

const create = async (req, res) => {
    try {
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
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
};

const getAll = async (req, res) => {
    try {
        const users = await findAllUsers();

        if (!users) {
            return res.status(500).send({ message: "Error fetching users" });
        }

        res.status(200).send(users);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await findUserById(id);

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        res.status(200).send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
};

const updateById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, username, email, password, avatar, background } = req.body;
        const user = await updateUserById(id, name, username, email, password, avatar, background);

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
                background
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
};

const deleteById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await deleteUserById(id);

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        res.status(200).send({ message: "User deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
};

export { create, getAll, getById, updateById, deleteById };