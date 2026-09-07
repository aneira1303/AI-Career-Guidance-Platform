import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function AdminSidebar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <aside className="admin-sidebar">

            <div className="admin-logo">
                CareerAI
            </div>

            <nav className="admin-nav">

                <NavLink to="/admin">
                    📊 Dashboard
                </NavLink>

                <NavLink to="/admin/users">
                    👥 Users
                </NavLink>

                <NavLink to="/admin/careers">
                    💼 Careers
                </NavLink>

                <NavLink to="/admin/skills">
                    🧠 Skills
                </NavLink>

                <NavLink to="/admin/recommendations">
                    🤖 AI Recommendations
                </NavLink>

                <NavLink to="/admin/reports">
                    📈 Reports
                </NavLink>

                <NavLink to="/admin/settings">
                    ⚙️ Settings
                </NavLink>

            </nav>

            <button
                type="button"
                className="admin-logout"
                onClick={handleLogout}
            >
                🚪 Logout
            </button>

        </aside>
    );
}

export default AdminSidebar;