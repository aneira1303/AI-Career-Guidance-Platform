import React from "react";

function AdminNavbar() {
    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    return (
        <header className="admin-navbar">

            <div className="admin-navbar-title">
                CareerAI Admin
            </div>

            <div className="admin-navbar-user">
                👑 {user.name || "Administrator"}
            </div>

        </header>
    );
}

export default AdminNavbar;