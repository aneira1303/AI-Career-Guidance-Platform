import React from "react";
import { Outlet } from "react-router-dom";
import "../styles/AdminLayout.css";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

function AdminLayout() {

    return (
        <div className="admin-layout">

            <AdminSidebar />

            <div className="admin-main">

                <AdminNavbar />

                <main className="admin-content">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default AdminLayout;