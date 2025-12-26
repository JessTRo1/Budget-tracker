// Middleware to handle authentication. A gatekeeper that checks if the request has a valid JWT token before allowing it to reach your protected routes (like creating/updating/deleting transactions).
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

async function authMiddleware(req, res, next) {
    // Extract token from Authorization header
    const authHeader = req.header('Authorization');
    const token = authHeader?.replace('Bearer ', '') || req.cookies.token;
    
    if (!token) {
        const error = new Error('No token provided');
        return next(error);
    }
    try {
        // Decode token without verifying first
        const decoded = jwt.decode(token);
        if (!decoded) {
            const error = new Error('Invalid token');
            return next(error);
        }

        // Find user to get their jwtSecret
        const user = await User.findById(decoded.userId);
        if (!user) {
            const error = new Error('User not found');
            return next(error);
        }

        // Verify with user's jwtSecret
        jwt.verify(token, process.env.JWT_SECRET || user.jwtSecret);

        req.user = {
            userId: decoded.userId,
            username: decoded.username,
            email: decoded.email,
            id: decoded.id
        };
        next();
    } catch (error) {
        next(error);
    }
}

export default authMiddleware;