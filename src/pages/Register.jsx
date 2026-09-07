import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Register.css";

const API_URL = "http://localhost:5000/api";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        // Validation
        if (!name.trim()) {
            setError("Please enter your full name.");
            return;
        }

        if (!email.trim()) {
            setError("Please enter your email.");
            return;
        }

        if (!email.includes("@")) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!password) {
            setError("Please enter a password.");
            return;
        }

        if (password.length < 6) {
            setError("Password must contain at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {

            setLoading(true);

            console.log("Sending registration request...");

            const response = await axios.post(
                `${API_URL}/auth/register`,
                {
                    name: name.trim(),
                    email: email.trim().toLowerCase(),
                    password: password
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            );

            console.log(
                "Registration response:",
                response.data
            );

            if (response.data.success) {

                setSuccess(
                    "Registration successful! Redirecting to login..."
                );

                // Clear form
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");

                setTimeout(() => {
                    navigate("/login");
                }, 1500);

            } else {

                setError(
                    response.data.message ||
                    "Registration failed."
                );
            }

        } catch (error) {

            console.error(
                "❌ Registration error:",
                error
            );

            console.log(
                "Backend response:",
                error.response?.data
            );

            if (error.response) {

                setError(
                    error.response.data?.message ||
                    error.response.data?.error ||
                    "Registration failed."
                );

            } else if (error.request) {

                setError(
                    "Cannot connect to the backend. Make sure the server is running on port 5000."
                );

            } else {

                setError(
                    "Something went wrong. Please try again."
                );
            }

        } finally {

            setLoading(false);

        }
    };


    return (
        <div className="auth-page">

            <div className="auth-container">

                {/* LEFT SIDE */}
                <div className="auth-left">

                    <div className="brand">
                        <div className="brand-icon">
                            AI
                        </div>

                        <span>
                            CareerAI
                        </span>
                    </div>

                    <div className="auth-content">

                        <h1>
                            Start Your
                            <span>
                                Career Journey
                            </span>
                        </h1>

                        <p>
                            Create your account and let AI help
                            you discover the right career,
                            identify your skill gaps and build
                            your personalized learning roadmap.
                        </p>

                        <div className="feature-list">

                            <div className="feature-item">
                                <span>✓</span>
                                AI Career Recommendations
                            </div>

                            <div className="feature-item">
                                <span>✓</span>
                                Skill Gap Analysis
                            </div>

                            <div className="feature-item">
                                <span>✓</span>
                                Personalized Learning Roadmap
                            </div>

                            <div className="feature-item">
                                <span>✓</span>
                                AI Resume Builder
                            </div>

                        </div>

                    </div>

                </div>


                {/* RIGHT SIDE */}
                <div className="auth-right">

                    <div className="auth-card">

                        <div className="auth-header">

                            <h2>
                                Create Account
                            </h2>

                            <p>
                                Join CareerAI and build your future
                            </p>

                        </div>


                        {/* ERROR */}
                        {error && (
                            <div className="error-message">
                                ❌ {error}
                            </div>
                        )}


                        {/* SUCCESS */}
                        {success && (
                            <div className="success-message">
                                ✅ {success}
                            </div>
                        )}


                        <form onSubmit={handleSubmit}>

                            {/* NAME */}
                            <div className="form-group">

                                <label>
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                    disabled={loading}
                                />

                            </div>


                            {/* EMAIL */}
                            <div className="form-group">

                                <label>
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    disabled={loading}
                                />

                            </div>


                            {/* PASSWORD */}
                            <div className="form-group">

                                <label>
                                    Password
                                </label>

                                <input
                                    type="password"
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    disabled={loading}
                                />

                            </div>


                            {/* CONFIRM PASSWORD */}
                            <div className="form-group">

                                <label>
                                    Confirm Password
                                </label>

                                <input
                                    type="password"
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(
                                            e.target.value
                                        )
                                    }
                                    disabled={loading}
                                />

                            </div>


                            {/* TERMS */}
                            <div className="terms">

                                <input
                                    type="checkbox"
                                    required
                                    disabled={loading}
                                />

                                <span>
                                    I agree to the Terms &
                                    Conditions and Privacy Policy.
                                </span>

                            </div>


                            {/* BUTTON */}
                            <button
                                type="submit"
                                className="register-btn"
                                disabled={loading}
                            >

                                {loading ? (
                                    <>
                                        Creating Account...
                                    </>
                                ) : (
                                    <>
                                        Create Account →
                                    </>
                                )}

                            </button>

                        </form>


                        {/* LOGIN */}
                        <div className="auth-footer">

                            Already have an account?

                            <Link to="/login">
                                Login
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Register;