const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

// =====================================================
// CORS
// =====================================================

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);

// =====================================================
// BODY PARSER
// =====================================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =====================================================
// HEALTH CHECK
// =====================================================

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "CareerAI API is running"
    });
});

// =====================================================
// ROUTES
// =====================================================

const authRoutes = require("./routes/authRoutes");
const careerRoutes = require("./routes/careerRoutes");
const skillRoutes = require("./routes/skillRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/api/auth", authRoutes);

app.use("/api/careers", careerRoutes);

app.use("/api/skills", skillRoutes);

app.use("/api/admin", adminRoutes);

// =====================================================
// 404 HANDLER
// MUST BE AFTER ALL ROUTES
// =====================================================

app.use((req, res) => {

    console.log(
        `❌ Route not found: ${req.method} ${req.originalUrl}`
    );

    res.status(404).json({
        success: false,
        message: "API route not found",
        path: req.originalUrl
    });
});

// =====================================================
// GLOBAL ERROR HANDLER
// =====================================================

app.use((err, req, res, next) => {

    console.error(
        "❌ SERVER ERROR:",
        err
    );

    res.status(500).json({
        success: false,
        message: "Internal server error",
        error: err.message
    });
});

// =====================================================
// START SERVER
// =====================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log("==========================================");
    console.log("🚀 CareerAI server started successfully");
    console.log(`🌐 http://localhost:${PORT}`);
    console.log(`❤️  http://localhost:${PORT}/api/health`);
    console.log(`📚 http://localhost:${PORT}/api/careers`);
    console.log(`🧠 http://localhost:${PORT}/api/skills`);
    console.log(`🔐 http://localhost:${PORT}/api/auth`);
    console.log(`👑 http://localhost:${PORT}/api/admin`);
    console.log("==========================================");

});