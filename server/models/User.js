const db = require("../config/database");

console.log(
    "✅ User model loaded from:",
    __filename
);


// =====================================================
// FIND USER BY EMAIL
// =====================================================

const findByEmail = async (email) => {

    console.log(
        "🔎 User.findByEmail called:",
        email
    );

    const [rows] = await db.query(
        `
        SELECT
            id,
            name,
            email,
            password,
            role,
            is_active,
            created_at,
            updated_at
        FROM users
        WHERE email = ?
        LIMIT 1
        `,
        [email]
    );

    console.log(
        "USER FOUND:",
        rows.length > 0
    );

    return rows.length > 0
        ? rows[0]
        : null;
};


// =====================================================
// FIND USER BY ID
// =====================================================

const findById = async (id) => {

    const [rows] = await db.query(
        `
        SELECT
            id,
            name,
            email,
            password,
            role,
            is_active,
            created_at,
            updated_at
        FROM users
        WHERE id = ?
        LIMIT 1
        `,
        [id]
    );

    return rows.length > 0
        ? rows[0]
        : null;
};


// =====================================================
// GET ALL USERS
// =====================================================
// Used by:
// GET /api/admin/users
//
// IMPORTANT:
// This is NOT static data.
// It reads directly from MySQL.
// =====================================================

// =====================================================
// GET ALL USERS
// =====================================================

const getAll = async () => {

    const [rows] = await db.query(
        `
        SELECT
            id,
            name,
            email,
            role,
            is_active,
            created_at,
            updated_at
        FROM users
        ORDER BY id DESC
        `
    );

    return rows;
};


// =====================================================
// GET USER STATISTICS
// =====================================================
// Used by:
// GET /api/admin/dashboard
// =====================================================

const getStats = async () => {

    console.log(
        "📊 User.getStats() called"
    );

    const [rows] = await db.query(
        `
        SELECT

            COUNT(*) AS totalUsers,

            SUM(
                CASE
                    WHEN is_active = 1
                    THEN 1
                    ELSE 0
                END
            ) AS activeUsers,

            SUM(
                CASE
                    WHEN role = 'admin'
                    THEN 1
                    ELSE 0
                END
            ) AS adminUsers,

            SUM(
                CASE
                    WHEN role = 'student'
                    THEN 1
                    ELSE 0
                END
            ) AS studentUsers

        FROM users
        `
    );

    const stats = rows[0] || {};

    console.log(
        "📊 USER STATS:",
        stats
    );

    return {
        totalUsers:
            Number(stats.totalUsers || 0),

        activeUsers:
            Number(stats.activeUsers || 0),

        adminUsers:
            Number(stats.adminUsers || 0),

        studentUsers:
            Number(stats.studentUsers || 0)
    };
};


// =====================================================
// CREATE USER
// =====================================================

const create = async ({
    name,
    email,
    password,
    role = "student"
}) => {

    console.log(
        "➕ Creating user:",
        email
    );

    const [result] = await db.query(
        `
        INSERT INTO users
        (
            name,
            email,
            password,
            role,
            is_active
        )
        VALUES (?, ?, ?, ?, TRUE)
        `,
        [
            name,
            email,
            password,
            role
        ]
    );

    console.log(
        "✅ User created:",
        result.insertId
    );

    return result.insertId;
};


// =====================================================
// UPDATE USER
// =====================================================

const update = async (id, data) => {

    const fields = [];
    const values = [];


    // -----------------------------------------
    // NAME
    // -----------------------------------------

    if (data.name !== undefined) {

        fields.push(
            "name = ?"
        );

        values.push(
            data.name
        );
    }


    // -----------------------------------------
    // EMAIL
    // -----------------------------------------

    if (data.email !== undefined) {

        fields.push(
            "email = ?"
        );

        values.push(
            data.email
        );
    }


    // -----------------------------------------
    // PASSWORD
    // -----------------------------------------

    if (data.password !== undefined) {

        fields.push(
            "password = ?"
        );

        values.push(
            data.password
        );
    }


    // -----------------------------------------
    // ROLE
    // -----------------------------------------

    if (data.role !== undefined) {

        fields.push(
            "role = ?"
        );

        values.push(
            data.role
        );
    }


    // -----------------------------------------
    // ACTIVE STATUS
    // -----------------------------------------

    if (data.is_active !== undefined) {

        fields.push(
            "is_active = ?"
        );

        values.push(
            data.is_active
        );
    }


    // -----------------------------------------
    // NOTHING TO UPDATE
    // -----------------------------------------

    if (fields.length === 0) {

        console.log(
            "⚠️ No fields to update"
        );

        return false;
    }


    // -----------------------------------------
    // UPDATED TIMESTAMP
    // -----------------------------------------

    fields.push(
        "updated_at = CURRENT_TIMESTAMP"
    );


    values.push(id);


    // -----------------------------------------
    // EXECUTE UPDATE
    // -----------------------------------------

    const [result] = await db.query(
        `
        UPDATE users
        SET ${fields.join(", ")}
        WHERE id = ?
        `,
        values
    );


    console.log(
        `✏️ User ${id} updated. Affected rows:`,
        result.affectedRows
    );


    return result.affectedRows > 0;
};


// =====================================================
// DELETE USER
// =====================================================

const remove = async (id) => {

    console.log(
        "🗑️ User.remove() called:",
        id
    );

    const [result] = await db.query(
        `
        DELETE FROM users
        WHERE id = ?
        `,
        [id]
    );

    console.log(
        `🗑️ Deleted user ${id}. Affected rows:`,
        result.affectedRows
    );

    return result.affectedRows > 0;
};


// =====================================================
// EXPORT
// =====================================================

module.exports = {

    findByEmail,

    findById,

    getAll,

    getStats,

    create,

    update,

    remove

};