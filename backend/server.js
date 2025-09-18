import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import { connect } from 'mongoose';
import { connectDB } from './config/db.js';
import userRouter from './routes/userroute.js';
import taskRouter from './routes/taskRoute.js';

const app = express();
const PORT = process.env.PORT || 4000;

//middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
//db connect
connectDB();
//routes
app.use("/api/user", userRouter);
app.use("/api/tasks", taskRouter);
app.get('/', (req, res) =>{
    res.send('API working..');
} )
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})