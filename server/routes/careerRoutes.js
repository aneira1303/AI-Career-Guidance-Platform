const express = require("express");
const router = express.Router();

const db = require("../config/database");

// =====================================================
// GET ALL CAREERS
// GET /api/careers
// =====================================================

router.get("/", async (req, res) => {
  try {
    console.log("📚 GET /api/careers");

    const [careers] = await db.query(`
      SELECT
        id,
        title,
        description,
        category,
        salary_min,
        salary_max,
        demand_level,
        education_required,
        responsibilities,
        career_path,
        created_at
      FROM careers
      ORDER BY id DESC
    `);

    console.log(`✅ Found ${careers.length} careers`);

    res.status(200).json({
      success: true,
      count: careers.length,
      careers: careers
    });

  } catch (error) {
    console.error("❌ GET CAREERS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch careers",
      error: error.message
    });
  }
});


// =====================================================
// GET SINGLE CAREER
// GET /api/careers/:id
// =====================================================

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [careers] = await db.query(
      `
      SELECT
        id,
        title,
        description,
        category,
        salary_min,
        salary_max,
        demand_level,
        education_required,
        responsibilities,
        career_path,
        created_at
      FROM careers
      WHERE id = ?
      `,
      [id]
    );

    if (careers.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Career not found"
      });
    }

    res.status(200).json({
      success: true,
      career: careers[0]
    });

  } catch (error) {
    console.error("❌ GET CAREER ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch career",
      error: error.message
    });
  }
});


module.exports = router;