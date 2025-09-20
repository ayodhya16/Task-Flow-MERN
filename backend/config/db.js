import mongoose from "mongoose";
export const connectDB = async () => {
    await mongoose.connect("//mongodb credentials")
    .then(() => console.log("DB connected"))
}

