import mongoose from "mongoose";

const validateId = (req, res, next) => {
    let idParam;
    try {
        if (!req.params.id) {
            // Use o id do authmiddleware se nenhum id foi fornecido na URL
            idParam = req.userId;
        } else {
            idParam = req.params.id;
        }

        if (!idParam || !mongoose.Types.ObjectId.isValid(idParam)) {
            return res.status(400).send({ message: "Invalid ID" });
        }

        // Anexar o idParam ao objeto req para que ele possa ser usado no getByUserId
        req.params.id = idParam;

        next();
    } catch (error) {
        return res
            .status(500)
            .send({ message: "An error occurred", error: error.message });
    }
};

export { validateId };
