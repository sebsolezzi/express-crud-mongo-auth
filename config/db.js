import mongoose from "mongoose";

export function conectDB() {
    try {
        mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
    } catch (error) {
        console.log(error)
    }
}