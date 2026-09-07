require("dotenv").config();

const bcrypt = require("bcrypt");
const db = require("./config/database");

async function resetAdmin() {
    try {
        const email = "admin@careerai.com";
        const newPassword = "Admin@123";

        console.log("🔐 Resetting admin password...");

        const hashedPassword = await bcrypt.hash(
            newPassword,
            12
        );

        const [result] = await db.query(
            `
            UPDATE users
            SET password = ?,
                role = 'admin',
                is_active = TRUE,
                updated_at = CURRENT_TIMESTAMP
            WHERE email = ?
            `,
            [
                hashedPassword,
                email
            ]
        );

        if (result.affectedRows === 0) {
            console.log("❌ Admin user not found.");
        } else {
            console.log("✅ Admin password reset successfully.");
            console.log("");
            console.log("Email:    admin@careerai.com");
            console.log("Password: Admin@123");
            console.log("Role:     admin");
        }

    } catch (error) {

        console.error(
            "❌ Failed to reset admin:",
            error
        );

    } finally {

        await db.end();

    }
}

resetAdmin();