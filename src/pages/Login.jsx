import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // =========================================
    // HANDLE INPUT
    // =========================================

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

    };

    // =========================================
    // LOGIN
    // =========================================

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setLoading(true);

        try {

            console.log("=================================");
            console.log("🔐 Sending login request...");
            console.log("Email:", formData.email);
            console.log("=================================");

            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email: formData.email.trim(),
                    password: formData.password
                }
            );

            console.log("✅ Login response:");
            console.log(response.data);

            // =========================================
            // GET RESULT
            // =========================================

            const result =
                response.data?.data ||
                response.data;

            const token =
                result?.token;

            const user =
                result?.user;

            console.log("TOKEN:", token ? "FOUND" : "NOT FOUND");
            console.log("USER:", user);

            // =========================================
            // CHECK TOKEN
            // =========================================

            if (!token) {

                console.error(
                    "❌ Token missing from backend response"
                );

                setError(
                    "Login failed: authentication token was not received."
                );

                return;
            }

            // =========================================
            // SAVE TOKEN
            // =========================================

            localStorage.setItem(
                "token",
                token
            );

            // =========================================
            // SAVE USER
            // =========================================

            if (user) {

                localStorage.setItem(
                    "user",
                    JSON.stringify(user)
                );

            }

            console.log("✅ Login successful");

            // =========================================
            // ROLE BASED REDIRECT
            // =========================================

            if (user?.role === "admin") {

                console.log(
                    "👑 Admin login detected"
                );

                navigate("/admin");

            } else {

                console.log(
                    "👤 Student login detected"
                );

                navigate("/dashboard");

            }

        } catch (error) {

            console.error(
                "❌ LOGIN ERROR"
            );

            console.error(
                error
            );

            // =========================================
            // BACKEND RESPONSE
            // =========================================

            console.error(
                "HTTP STATUS:",
                error.response?.status
            );

            console.error(
                "BACKEND RESPONSE:",
                error.response?.data
            );

            console.error(
                "BACKEND MESSAGE:",
                error.response?.data?.message
            );

            console.error(
                "BACKEND ERROR:",
                error.response?.data?.error
            );

            // =========================================
            // DISPLAY ACTUAL BACKEND ERROR
            // =========================================

            const message =
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Login failed. Please check your email and password.";

            setError(message);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="auth-page">

            <div className="auth-card">

                {/* =================================
                    LOGO
                ================================== */}

                <Link
                    to="/"
                    className="auth-logo"
                >
                    CareerAI
                </Link>

                {/* =================================
                    TITLE
                ================================== */}

                <h1>
                    Welcome Back
                </h1>

                <p className="auth-subtitle">
                    Login to continue your career journey.
                </p>

                {/* =================================
                    ERROR
                ================================== */}

                {error && (

                    <div className="error-message">

                        ❌ {error}

                    </div>

                )}

                {/* =================================
                    FORM
                ================================== */}

                <form
                    onSubmit={handleSubmit}
                >

                    {/* EMAIL */}

                    <div className="form-group">

                        <label htmlFor="email">
                            Email Address
                        </label>

                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="email"
                            required
                        />

                    </div>

                    {/* PASSWORD */}

                    <div className="form-group">

                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="current-password"
                            required
                        />

                    </div>

                    {/* FORGOT PASSWORD */}

                    <div className="forgot-password">

                        <Link
                            to="/forgot-password"
                        >
                            Forgot Password?
                        </Link>

                    </div>

                    {/* LOGIN BUTTON */}

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={loading}
                    >

                        {loading
                            ? "Logging in..."
                            : "Login"
                        }

                    </button>

                </form>

                {/* =================================
                    REGISTER
                ================================== */}

                <p className="auth-footer">

                    Don't have an account?

                    {" "}

                    <Link to="/register">
                        Create Account
                    </Link>

                </p>

                {/* =================================
                    HOME
                ================================== */}

                <Link
                    to="/"
                    className="back-home"
                >
                    ← Back to Home
                </Link>

            </div>

        </div>

    );
}

export default Login;