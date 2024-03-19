import bcrypt from 'bcryptjs';
import { findUserByEmail, generateToken } from '../services/auth.service.js';

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).send({ message: "Invalid credentials" });
        }

        const token = generateToken(user._id);

        res.status(200).send({ message: "User logged in", token: token });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
};

export { login };