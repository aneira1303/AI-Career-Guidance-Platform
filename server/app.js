const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// =====================================================
// CORS
// =====================================================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",

      // Replace this with your actual Vercel frontend URL
      "https://ai-career-guidance-platform.vercel.app",,
    ],
    credentials: true,
  })
);

// =====================================================
// MIDDLEWARE
// =====================================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =====================================================
// ROOT ROUTE
// =====================================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Career Guidance API is running",
  });
});

// =====================================================
// HEALTH CHECK
// =====================================================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CareerAI API is running",
  });
});

// =====================================================
// API ROUTES
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
// =====================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
    path: req.originalUrl,
  });
});

// =====================================================
// ERROR HANDLER
// =====================================================

app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);

  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err.message,
  });
});

// =====================================================
// LOCAL SERVER
// =====================================================

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// =====================================================
// EXPORT FOR VERCEL
// =====================================================

module.exports = app;