const jwt = require("jsonwebtoken");


// ==========================================
// VERIFY JWT TOKEN
// ==========================================

const verifyToken = (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {

            return res.status(401).json({
                success: false,
                message: "Authentication token required"
            });

        }

        const parts = authHeader.split(" ");

        if (
            parts.length !== 2 ||
            parts[0] !== "Bearer"
        ) {

            return res.status(401).json({
                success: false,
                message: "Invalid authorization format"
            });

        }

        const token = parts[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        console.error(
            "JWT verification error:",
            error.message
        );

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });

    }

};


// ==========================================
// REQUIRE ADMIN
// ==========================================

const requireAdmin = (req, res, next) => {

    if (!req.user) {

        return res.status(401).json({
            success: false,
            message: "Authentication required"
        });

    }

    if (req.user.role !== "admin") {

        return res.status(403).json({
            success: false,
            message: "Admin access required"
        });

    }

    next();

};


// ==========================================
// EXPORT
// ==========================================

module.exports = {
    verifyToken,
    requireAdmin
};