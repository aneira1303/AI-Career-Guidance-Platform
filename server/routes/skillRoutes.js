const express = require("express");
const router = express.Router();

const db = require("../config/database");

// =====================================================
// GET ALL SKILLS
// GET /api/skills
// =====================================================

router.get("/", async (req, res) => {
    try {
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

        res.json({
            success: true,
            count: skills.length,
            data: skills
        });

    } catch (error) {
        console.error("❌ GET SKILLS ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch skills",
            error: error.message
        });
    }
});

// =====================================================
// GET SINGLE SKILL
// GET /api/skills/:id
// =====================================================

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

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

        res.json({
            success: true,
            data: skills[0]
        });

    } catch (error) {
        console.error("❌ GET SKILL ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch skill",
            error: error.message
        });
    }
});

// =====================================================
// CREATE SKILL
// POST /api/skills
// =====================================================

router.post("/", async (req, res) => {
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
                name.trim(),
                category || null,
                description || null
            ]
        );

        const [newSkill] = await db.query(
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
            message: "Skill created successfully",
            data: newSkill[0]
        });

    } catch (error) {
        console.error("❌ CREATE SKILL ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create skill",
            error: error.message
        });
    }
});

// =====================================================
// UPDATE SKILL
// PUT /api/skills/:id
// =====================================================

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;

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

        const [result] = await db.query(
            `
            UPDATE skills
            SET
                name = ?,
                category = ?,
                description = ?
            WHERE id = ?
            `,
            [
                name.trim(),
                category || null,
                description || null,
                id
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Skill not found"
            });
        }

        const [updatedSkill] = await db.query(
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

        res.json({
            success: true,
            message: "Skill updated successfully",
            data: updatedSkill[0]
        });

    } catch (error) {
        console.error("❌ UPDATE SKILL ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update skill",
            error: error.message
        });
    }
});

// =====================================================
// DELETE SKILL
// DELETE /api/skills/:id
// =====================================================

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.query(
            `
            DELETE FROM skills
            WHERE id = ?
            `,
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Skill not found"
            });
        }

        res.json({
            success: true,
            message: "Skill deleted successfully"
        });

    } catch (error) {
        console.error("❌ DELETE SKILL ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete skill",
            error: error.message
        });
    }
});

module.exports = router;