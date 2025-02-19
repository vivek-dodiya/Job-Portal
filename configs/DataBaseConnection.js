import mongoose from "mongoose";

export const DatabaseConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');
        return true;
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
        return false;
    }
}
