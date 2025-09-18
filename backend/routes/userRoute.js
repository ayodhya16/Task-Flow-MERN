import express from 'express';
import { getCurrentUser, loginUser, registerUser, updatePassword, updateUserProfile } from '../controllers/usercontroller.js';
import authMiddleware from '../middleware/auth.js';

const userRouter = express.Router();

//public routes
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

//private routes protect also


userRouter.get('/me', authMiddleware, getCurrentUser);
userRouter.put('/profile',authMiddleware, updateUserProfile);
userRouter.put('/password', authMiddleware, updatePassword);

export default userRouter;


