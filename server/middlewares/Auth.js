let jwt = require('jsonwebtoken');
require('dotenv').config();

// Authentication middleware to verify JWT token
const authMiddleware = (req, res, next) => {
    try {
        // Get token from header
        const token = req.headers.authorization?.split(' ')[1] || req.headers['x-auth-token'];

        if (!token) {
            return res.status(401).json({
                message: "No token provided, Authorization denied",
                success: false
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(401).json({
            message: "Invalid token",
            success: false,
            error: err.message
        });
    }
};

module.exports = { authMiddleware };
