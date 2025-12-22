// Middleware to handle authentication. A gatekeeper that checks if the request has a valid JWT token before allowing it to reach your protected routes (like creating/updating/deleting transactions).
const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function authMiddleware(req, res, next) {
    const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
        // Decode token without verifying first
        const decoded = jwt.decode(token);
        if (!decoded) {
            return res.status(401).json({ message: 'Token is not valid' });
        }

        // Find user to get their jwtSecret
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Now verify with user's jwtSecret
        jwt.verify(token, process.env.JWT_SECRET || user.jwtSecret);

        req.user = {
            userId: decoded.userId,
            username: decoded.username,
            email: decoded.email,
            id: decoded.id
        };
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid', error: error.message });
    }
}

module.exports = authMiddleware;