import mongoose from 'mongoose';

// `strictQuery` option will be switched back to `false` by default in Mongoose 7
mongoose.set('strictQuery', false);

const connectDB = async () => {

    console.log('Connecting to MongoDB...');

    try {
        await mongoose.connect('mongodb+srv://baptista:129203@cluster0.qdkirkd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error... MongoDB not conected:', error);
    }
};

export default connectDB;