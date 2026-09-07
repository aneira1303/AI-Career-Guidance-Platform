import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
    const location = useLocation();

    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    let user;

    try {
        user = JSON.parse(userData);
    } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    if (
        requiredRole &&
        user.role !== requiredRole
    ) {
        return (
            <Navigate
                to="/dashboard"
                replace
            />
        );
    }

    return children;
};

export default ProtectedRoute;