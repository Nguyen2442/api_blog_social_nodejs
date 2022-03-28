import mongoose from 'mongoose';
import 'dotenv'

//Database
export const connect = () => {
    try {
        const response = mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB is connected!");
    } catch (err) {
        console.log(err);
    }
};