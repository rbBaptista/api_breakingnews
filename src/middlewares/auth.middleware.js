import jwt from 'jsonwebtoken';
import { findUserById } from '../services/user.service.js';

const authmiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await findUserById(decoded.id);
        req.userId = user.id;
        req.userName = user.username;
        return next();
    } catch (ex) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

export { authmiddleware };