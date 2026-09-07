const jwt = require("jsonwebtoken");


// =====================================================
// VERIFY JWT TOKEN
// =====================================================

const verifyToken = (req, res, next) => {

    try {

        const authHeader =
            req.headers.authorization;


        // No Authorization header

        if (!authHeader) {

            return res.status(401).json({
                success: false,
                message: "Authorization token required"
            });
        }


        // Expected format:
        // Bearer TOKEN

        if (!authHeader.startsWith("Bearer ")) {

            return res.status(401).json({
                success: false,
                message: "Invalid authorization format"
            });
        }


        const token =
            authHeader.split(" ")[1];


        if (!token) {

            return res.status(401).json({
                success: false,
                message: "Token missing"
            });
        }


        // Verify token

        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );


        console.log(
            "🔐 JWT verified"
        );

        console.log(
            "USER:",
            decoded
        );


        // Attach user to request

        req.user = decoded;


        next();

    } catch (error) {

        console.error(
            "❌ JWT ERROR:",
            error.message
        );


        return res.status(401).json({

            success: false,

            message:
                "Invalid or expired token"

        });
    }
};


// =====================================================
// REQUIRE ADMIN
// =====================================================

const requireAdmin = (req, res, next) => {

    console.log(
        "👑 Checking admin access"
    );

    console.log(
        "USER ROLE:",
        req.user?.role
    );


    if (!req.user) {

        return res.status(401).json({

            success: false,

            message:
                "Authentication required"

        });
    }


    if (req.user.role !== "admin") {

        return res.status(403).json({

            success: false,

            message:
                "Admin access required"

        });
    }


    console.log(
        "✅ Admin access granted"
    );


    next();
};


// =====================================================
// EXPORT
// =====================================================

module.exports = {
    verifyToken,
    requireAdmin
};