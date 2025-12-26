// Standardize errors across the application
function errorHandler(err, req, res, next) {
    const statusCode = getStatusCode(err);
    const message = getErrorMessage(err);
    res.status(statusCode).json({ message });
}

function getStatusCode(err) {
    // JWT errors
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        return 401; // Unauthorized
    }
    
    // Mongoose validation error
    if (err.name === 'ValidationError') {
        return 400; // Bad Request
    }
    
    // Mongoose cast error (invalid ObjectId)
    if (err.name === 'CastError') {
        return 400; // Bad Request
    }
    
    // MongoDB duplicate key error
    if (err.code === 11000) {
        return 409; // Conflict
    }
    
    return err.statusCode || 500; // Internal Server Error
}

function getErrorMessage(err) {
    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        return 'Invalid token';
    }
    if (err.name === 'TokenExpiredError') {
        return 'Token expired';
    }
    
    // Mongoose validation error
    if (err.name === 'ValidationError') {
        return Object.values(err.errors).map(e => e.message).join(', ');
    }
    
    // Mongoose cast error
    if (err.name === 'CastError') {
        return `Invalid ${err.path}: ${err.value}`;
    }
    
    // MongoDB duplicate key (username/email exists)
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        return `${field} already exists`;
    }
    
    return err.message || 'Internal Server Error';
}

export default errorHandler;