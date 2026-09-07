require("dotenv").config();

const bcrypt = require("bcryptjs");

const {
    pool
} = require("./config/database");


const createAdmin = async () => {

    try {

        console.log("Creating admin...");


        const name =
            "System Administrator";

        const email =
            "admin@careerai.com";

        const password =
            "Admin@12345";


        /*
        ==========================================
        CHECK EXISTING USER
        ==========================================
        */

        const [rows] =
            await pool.execute(
                `
                SELECT id, email, role
                FROM users
                WHERE email = ?
                LIMIT 1
                `,
                [email]
            );


        /*
        ==========================================
        USER ALREADY EXISTS
        ==========================================
        */

        if (rows.length > 0) {

            console.log(
                "User already exists."
            );


            await pool.execute(
                `
                UPDATE users
                SET
                    role = 'admin',
                    is_active = TRUE
                WHERE email = ?
                `,
                [email]
            );


            console.log(
                "✅ Existing user promoted to admin."
            );

        }

        /*
        ==========================================
        CREATE NEW ADMIN
        ==========================================
        */

        else {

            const hashedPassword =
                await bcrypt.hash(
                    password,
                    12
                );


            await pool.execute(
                `
                INSERT INTO users
                (
                    name,
                    email,
                    password,
                    role,
                    is_active
                )
                VALUES
                (
                    ?,
                    ?,
                    ?,
                    'admin',
                    TRUE
                )
                `,
                [
                    name,
                    email,
                    hashedPassword
                ]
            );


            console.log(
                "✅ Admin created successfully."
            );
        }


        /*
        ==========================================
        DISPLAY LOGIN DETAILS
        ==========================================
        */

        console.log("");
        console.log(
            "================================"
        );

        console.log(
            "ADMIN LOGIN"
        );

        console.log(
            "================================"
        );

        console.log(
            "Email:",
            email
        );

        console.log(
            "Password:",
            password
        );

        console.log(
            "================================"
        );


        await pool.end();

        process.exit(0);

    } catch (error) {

        console.error("");

        console.error(
            "❌ Failed to create admin:"
        );

        console.error(
            error
        );


        try {

            await pool.end();

        } catch (closeError) {

            console.error(
                closeError.message
            );
        }


        process.exit(1);
    }
};


createAdmin();