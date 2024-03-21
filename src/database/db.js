import mongoose from "mongoose";

// `strictQuery` option will be switched back to `false` by default in Mongoose 7
mongoose.set("strictQuery", false);

const connectDB = async () => {
    console.log("Connecting to MongoDB...");

    try {
        await mongoose.connect(process.env.MONGODBCONNECTIONSTRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error... MongoDB not conected:", error);
    }
};

export default connectDB;
