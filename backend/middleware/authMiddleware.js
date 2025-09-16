import jwt from 'jsonwebtoken';

export const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication failed: No token provided."
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: "Authorization failed: User is not an admin."
            });
        }
        
        next();

    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Authentication failed: Invalid token.",
            error: error.message
        });
    }
};