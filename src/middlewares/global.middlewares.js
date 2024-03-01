import mongoose from 'mongoose';

const validateId = (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: "Invalid ID" });
        }

        next();
    } catch (error) {
        return res.status(500).send({ message: "An error occurred", error: error.message });
    }
};

export { validateId };