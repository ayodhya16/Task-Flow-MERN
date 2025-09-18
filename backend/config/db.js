import mongoose from "mongoose";
export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://maheshbabuayodhya_db_user:babumb1608@cluster0.npzkrkj.mongodb.net/TaskFlow')
    .then(() => console.log("DB connected"))
}