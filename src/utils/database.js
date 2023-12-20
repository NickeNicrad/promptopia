import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)

    if (isConnected) {
        console.log('MongoBD is already connected')
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_DB_URI, {
            dbName: 'share_prompt',
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        isConnected = true

        console.log('MongoDB connected')
    } catch (error) {
        console.log('something went wrong', error?.message)
    }
}