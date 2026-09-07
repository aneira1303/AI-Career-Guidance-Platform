import React from "react";

import {
    Navigate,
    useLocation
} from "react-router-dom";


function ProtectedRoute({
    children,
    adminOnly = false
}) {

    const location = useLocation();

    const token =
        localStorage.getItem("token");

    const userData =
        localStorage.getItem("user");


    // =====================================
    // NOT LOGGED IN
    // =====================================

    if (!token || !userData) {

        return (
            <Navigate
                to="/login"
                replace
                state={{
                    from: location.pathname
                }}
            />
        );

    }


    // =====================================
    // READ USER
    // =====================================

    let user;

    try {

        user = JSON.parse(userData);

    } catch (error) {

        console.error(
            "Invalid user data:",
            error
        );

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }


    // =====================================
    // ADMIN ONLY
    // =====================================

    if (
        adminOnly &&
        user?.role !== "admin"
    ) {

        return (
            <Navigate
                to="/dashboard"
                replace
            />
        );

    }


    return children;
}


export default ProtectedRoute;