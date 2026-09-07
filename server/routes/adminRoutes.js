const express = require("express");
const router = express.Router();

const User = require("../models/User");
const db = require("../config/database");

const {
    verifyToken,
    requireAdmin
} = require("../middleware/authMiddleware");

// =====================================================
// ADMIN AUTHENTICATION
// =====================================================

router.use(verifyToken);
router.use(requireAdmin);


// =====================================================
// ADMIN TEST
// GET /api/admin
// =====================================================

router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Admin API is working"
    });
});


// =====================================================
// USERS
// =====================================================

// GET ALL USERS
// GET /api/admin/users
router.get("/users", async (req, res) => {
    try {
        console.log("📋 GET /api/admin/users");

        const users = await User.getAll();

        res.status(200).json({
            success: true,
            count: users.length,
            users: users
        });

    } catch (error) {
        console.error("❌ Get users error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch users",
            error: error.message
        });
    }
});


// CREATE USER
// POST /api/admin/users
router.post("/users", async (req, res) => {
    try {
        const {
            name,
            email,
            role,
            is_active
        } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Name is required"
            });
        }

        if (!email || !email.trim()) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const cleanName = name.trim();
        const cleanEmail = email.trim().toLowerCase();

        const existing = await User.findByEmail(cleanEmail);

        if (existing) {
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }

        const userId = await User.create({
            name: cleanName,
            email: cleanEmail,
            password: "ChangeMe123!",
            role: role || "student"
        });

        if (is_active === false) {
            await User.update(userId, {
                is_active: false
            });
        }

        const user = await User.findById(userId);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: user
        });

    } catch (error) {
        console.error("❌ Create user error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create user",
            error: error.message
        });
    }
});


// UPDATE USER
// PUT /api/admin/users/:id
router.put("/users/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID"
            });
        }

        const existingUser = await User.findById(id);

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const {
            name,
            email,
            role,
            is_active
        } = req.body;

        // Do not allow removing admin role
        if (
            existingUser.role === "admin" &&
            role &&
            role !== "admin"
        ) {
            return res.status(403).json({
                success: false,
                message: "Administrator role cannot be removed"
            });
        }

        // Check duplicate email
        if (email && email.trim()) {
            const cleanEmail = email.trim().toLowerCase();

            const duplicate =
                await User.findByEmail(cleanEmail);

            if (
                duplicate &&
                Number(duplicate.id) !== id
            ) {
                return res.status(409).json({
                    success: false,
                    message: "Email already exists"
                });
            }
        }

        const updated = await User.update(id, {
            name:
                name && name.trim()
                    ? name.trim()
                    : existingUser.name,

            email:
                email && email.trim()
                    ? email.trim().toLowerCase()
                    : existingUser.email,

            role:
                role || existingUser.role,

            is_active:
                typeof is_active === "boolean"
                    ? is_active
                    : existingUser.is_active
        });

        if (!updated) {
            return res.status(400).json({
                success: false,
                message: "No changes were made"
            });
        }

        const user = await User.findById(id);

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: user
        });

    } catch (error) {
        console.error("❌ Update user error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update user",
            error: error.message
        });
    }
});


// DELETE USER
// DELETE /api/admin/users/:id
router.delete("/users/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID"
            });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Never allow deleting an admin
        if (user.role === "admin") {
            return res.status(403).json({
                success: false,
                message: "Admin users cannot be deleted"
            });
        }

        const deleted = await User.remove(id);

        if (!deleted) {
            return res.status(400).json({
                success: false,
                message: "User could not be deleted"
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (error) {
        console.error("❌ Delete user error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete user",
            error: error.message
        });
    }
});


// =====================================================
// SKILLS
// =====================================================

// GET ALL SKILLS
// GET /api/admin/skills

router.get("/skills", async (req, res) => {
    try {
        console.log("🧠 GET /api/admin/skills");

        const [skills] = await db.query(`
            SELECT
                id,
                name,
                category,
                description,
                created_at
            FROM skills
            ORDER BY created_at DESC
        `);

        res.status(200).json({
            success: true,
            count: skills.length,
            skills: skills
        });

    } catch (error) {
        console.error("❌ Get skills error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch skills",
            error: error.message
        });
    }
});


// GET SINGLE SKILL
// GET /api/admin/skills/:id

router.get("/skills/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid skill ID"
            });
        }

        const [skills] = await db.query(
            `
            SELECT
                id,
                name,
                category,
                description,
                created_at
            FROM skills
            WHERE id = ?
            `,
            [id]
        );

        if (skills.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Skill not found"
            });
        }

        res.status(200).json({
            success: true,
            skill: skills[0]
        });

    } catch (error) {
        console.error("❌ Get skill error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch skill",
            error: error.message
        });
    }
});


// CREATE SKILL
// POST /api/admin/skills

router.post("/skills", async (req, res) => {
    try {
        const {
            name,
            category,
            description
        } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Skill name is required"
            });
        }

        const cleanName = name.trim();

        // Check duplicate
        const [existing] = await db.query(
            `
            SELECT id
            FROM skills
            WHERE name = ?
            `,
            [cleanName]
        );

        if (existing.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Skill already exists"
            });
        }

        const [result] = await db.query(
            `
            INSERT INTO skills
            (
                name,
                category,
                description
            )
            VALUES (?, ?, ?)
            `,
            [
                cleanName,
                category && category.trim()
                    ? category.trim()
                    : null,
                description && description.trim()
                    ? description.trim()
                    : null
            ]
        );

        const [skills] = await db.query(
            `
            SELECT
                id,
                name,
                category,
                description,
                created_at
            FROM skills
            WHERE id = ?
            `,
            [result.insertId]
        );

        res.status(201).json({
            success: true,
            message: "Skill added successfully",
            skill: skills[0]
        });

    } catch (error) {
        console.error("❌ Create skill error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to add skill",
            error: error.message
        });
    }
});


// UPDATE SKILL
// PUT /api/admin/skills/:id

router.put("/skills/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid skill ID"
            });
        }

        const {
            name,
            category,
            description
        } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Skill name is required"
            });
        }

        const cleanName = name.trim();

        // Check skill exists
        const [existing] = await db.query(
            `
            SELECT id
            FROM skills
            WHERE id = ?
            `,
            [id]
        );

        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Skill not found"
            });
        }

        // Check duplicate name
        const [duplicate] = await db.query(
            `
            SELECT id
            FROM skills
            WHERE name = ?
            AND id != ?
            `,
            [
                cleanName,
                id
            ]
        );

        if (duplicate.length > 0) {
            return res.status(409).json({
                success: false,
                message:
                    "Another skill with this name already exists"
            });
        }

        await db.query(
            `
            UPDATE skills
            SET
                name = ?,
                category = ?,
                description = ?
            WHERE id = ?
            `,
            [
                cleanName,
                category && category.trim()
                    ? category.trim()
                    : null,
                description && description.trim()
                    ? description.trim()
                    : null,
                id
            ]
        );

        const [skills] = await db.query(
            `
            SELECT
                id,
                name,
                category,
                description,
                created_at
            FROM skills
            WHERE id = ?
            `,
            [id]
        );

        res.status(200).json({
            success: true,
            message: "Skill updated successfully",
            skill: skills[0]
        });

    } catch (error) {
        console.error("❌ Update skill error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update skill",
            error: error.message
        });
    }
});


// DELETE SKILL
// DELETE /api/admin/skills/:id

router.delete("/skills/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid skill ID"
            });
        }

        const [existing] = await db.query(
            `
            SELECT id
            FROM skills
            WHERE id = ?
            `,
            [id]
        );

        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Skill not found"
            });
        }

        await db.query(
            `
            DELETE FROM skills
            WHERE id = ?
            `,
            [id]
        );

        res.status(200).json({
            success: true,
            message: "Skill deleted successfully"
        });

    } catch (error) {
        console.error("❌ Delete skill error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete skill",
            error: error.message
        });
    }
});


// =====================================================
// CAREERS
// =====================================================

// GET ALL CAREERS
// GET /api/admin/careers

router.get("/careers", async (req, res) => {
    try {
        console.log("💼 GET /api/admin/careers");

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
            ORDER BY created_at DESC
        `);

        res.status(200).json({
            success: true,
            count: careers.length,
            careers: careers
        });

    } catch (error) {
        console.error("❌ Get careers error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch careers",
            error: error.message
        });
    }
});


// GET SINGLE CAREER
// GET /api/admin/careers/:id

router.get("/careers/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid career ID"
            });
        }

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
        console.error("❌ Get career error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch career",
            error: error.message
        });
    }
});


// CREATE CAREER
// POST /api/admin/careers

router.post("/careers", async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            salary_min,
            salary_max,
            demand_level,
            education_required,
            responsibilities,
            career_path
        } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                success: false,
                message: "Career title is required"
            });
        }

        const cleanTitle = title.trim();

        // Check duplicate career
        const [existing] = await db.query(
            `
            SELECT id
            FROM careers
            WHERE title = ?
            `,
            [cleanTitle]
        );

        if (existing.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Career already exists"
            });
        }

        const [result] = await db.query(
            `
            INSERT INTO careers
            (
                title,
                description,
                category,
                salary_min,
                salary_max,
                demand_level,
                education_required,
                responsibilities,
                career_path
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
                cleanTitle,
                description || null,
                category || null,
                salary_min || null,
                salary_max || null,
                demand_level || "medium",
                education_required || null,
                responsibilities || null,
                career_path || null
            ]
        );

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
            [result.insertId]
        );

        res.status(201).json({
            success: true,
            message: "Career added successfully",
            career: careers[0]
        });

    } catch (error) {
        console.error("❌ Create career error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to add career",
            error: error.message
        });
    }
});


// UPDATE CAREER
// PUT /api/admin/careers/:id

router.put("/careers/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid career ID"
            });
        }

        const {
            title,
            description,
            category,
            salary_min,
            salary_max,
            demand_level,
            education_required,
            responsibilities,
            career_path
        } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                success: false,
                message: "Career title is required"
            });
        }

        const cleanTitle = title.trim();

        // Check career exists
        const [existing] = await db.query(
            `
            SELECT id
            FROM careers
            WHERE id = ?
            `,
            [id]
        );

        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Career not found"
            });
        }

        // Check duplicate title
        const [duplicate] = await db.query(
            `
            SELECT id
            FROM careers
            WHERE title = ?
            AND id != ?
            `,
            [
                cleanTitle,
                id
            ]
        );

        if (duplicate.length > 0) {
            return res.status(409).json({
                success: false,
                message:
                    "Another career with this title already exists"
            });
        }

        await db.query(
            `
            UPDATE careers
            SET
                title = ?,
                description = ?,
                category = ?,
                salary_min = ?,
                salary_max = ?,
                demand_level = ?,
                education_required = ?,
                responsibilities = ?,
                career_path = ?
            WHERE id = ?
            `,
            [
                cleanTitle,
                description || null,
                category || null,
                salary_min || null,
                salary_max || null,
                demand_level || "medium",
                education_required || null,
                responsibilities || null,
                career_path || null,
                id
            ]
        );

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

        res.status(200).json({
            success: true,
            message: "Career updated successfully",
            career: careers[0]
        });

    } catch (error) {
        console.error("❌ Update career error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update career",
            error: error.message
        });
    }
});


// DELETE CAREER
// DELETE /api/admin/careers/:id

router.delete("/careers/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid career ID"
            });
        }

        const [existing] = await db.query(
            `
            SELECT id
            FROM careers
            WHERE id = ?
            `,
            [id]
        );

        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Career not found"
            });
        }

        await db.query(
            `
            DELETE FROM careers
            WHERE id = ?
            `,
            [id]
        );

        res.status(200).json({
            success: true,
            message: "Career deleted successfully"
        });

    } catch (error) {
        console.error("❌ Delete career error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete career",
            error: error.message
        });
    }
});

// =====================================================
// ADMIN - CAREER RECOMMENDATIONS
// =====================================================

// GET ALL RECOMMENDATIONS
router.get("/recommendations", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT *
      FROM career_recommendations
      ORDER BY created_at DESC
    `);

    res.status(200).json({
      success: true,
      data: rows
    });

  } catch (error) {
    console.error(
      "GET ADMIN RECOMMENDATIONS ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch recommendations",
      error: error.message
    });
  }
});


// GET SINGLE RECOMMENDATION
router.get("/recommendations/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      `
      SELECT *
      FROM career_recommendations
      WHERE id = ?
      `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Recommendation not found"
      });
    }

    res.status(200).json({
      success: true,
      data: rows[0]
    });

  } catch (error) {
    console.error(
      "GET SINGLE RECOMMENDATION ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch recommendation",
      error: error.message
    });
  }
});


// DELETE RECOMMENDATION
router.delete("/recommendations/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      `
      DELETE FROM career_recommendations
      WHERE id = ?
      `,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Recommendation not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Recommendation deleted successfully"
    });

  } catch (error) {
    console.error(
      "DELETE RECOMMENDATION ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to delete recommendation",
      error: error.message
    });
  }
});
// =====================================================
// EXPORT
// =====================================================

module.exports = router;