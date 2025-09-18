import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

export default async function authMiddleware(req, res, next) {
    //grab the bearer token from the authorization header
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({success: false, message: "Unauthorized"});
    }   
    const token = authHeader.split(' ')[1];

    //verfify and attach the user to the request object
    try{
        const payload = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(payload.userId).select('-password');
        if(!user){
            return res.status(401).json({success: false, message: "Unauthorized or token expired"});
        }
        req.user = user;
        req.userId =payload.userId
        next();

    }
    catch(err){
        console.log("JWT verification failed", err);
        return res.status(401).json({success: false, message: "token invalid or expired"});
    }

}