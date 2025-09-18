import mongoose from "mongoose";
export const connectDB = async () => {
    await mongoose.connect('"monogb credentials')
    .then(() => console.log("DB connected"))
}
