const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


// ==========================================
// LOGIN
// ==========================================

const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        console.log("=================================");
        console.log("🔐 LOGIN REQUEST");
        console.log("Email:", email);
        console.log("=================================");


        // -------------------------------
        // VALIDATION
        // -------------------------------

        if (!email || !password) {

            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });

        }


        // -------------------------------
        // FIND USER
        // -------------------------------

        const user = await User.findByEmail(email);

        console.log("USER FOUND:", !!user);


        if (!user) {

            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });

        }


        // -------------------------------
        // CHECK ACTIVE STATUS
        // -------------------------------

        if (!user.is_active) {

            return res.status(403).json({
                success: false,
                message: "Your account has been deactivated"
            });

        }


        // -------------------------------
        // CHECK PASSWORD
        // -------------------------------

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        console.log(
            "PASSWORD MATCH:",
            passwordMatch
        );


        if (!passwordMatch) {

            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });

        }


        // -------------------------------
        // JWT SECRET
        // -------------------------------

        if (!process.env.JWT_SECRET) {

            throw new Error(
                "JWT_SECRET is not configured"
            );

        }


        // -------------------------------
        // CREATE TOKEN
        // -------------------------------

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );


        // -------------------------------
        // REMOVE PASSWORD
        // -------------------------------

        const safeUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            is_active: user.is_active
        };


        // -------------------------------
        // SUCCESS
        // -------------------------------

        console.log(
            "✅ LOGIN SUCCESS:",
            user.email,
            user.role
        );


        return res.status(200).json({

            success: true,

            message: "Login successful",

            data: {
                token,
                user: safeUser
            }

        });

    } catch (error) {

        console.error(
            "❌ LOGIN CONTROLLER ERROR:"
        );

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Login failed",

            error: error.message

        });

    }

};


// ==========================================
// REGISTER
// ==========================================

const register = async (req, res) => {

    try {

        const {
            name,
            email,
            password
        } = req.body;


        if (!name || !email || !password) {

            return res.status(400).json({

                success: false,

                message:
                    "Name, email and password are required"

            });

        }


        // Check existing user

        const existingUser =
            await User.findByEmail(email);


        if (existingUser) {

            return res.status(409).json({

                success: false,

                message: "Email already registered"

            });

        }


        // Hash password

        const hashedPassword =
            await bcrypt.hash(password, 12);


        // Create student

        const userId =
            await User.create({

                name,
                email,
                password: hashedPassword,

                role: "student"

            });


        return res.status(201).json({

            success: true,

            message: "Registration successful",

            data: {
                userId
            }

        });

    } catch (error) {

        console.error(
            "❌ REGISTER ERROR:",
            error
        );

        return res.status(500).json({

            success: false,

            message: "Registration failed",

            error: error.message

        });

    }

};


module.exports = {
    login,
    register
};