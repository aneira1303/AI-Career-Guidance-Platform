import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home-page">

            {/* =====================================
                NAVBAR
            ====================================== */}

            <nav className="navbar">

                <div className="navbar-container">

                    {/* LOGO */}

                    <Link
                        to="/"
                        className="logo"
                    >
                        CareerAI
                    </Link>


                    {/* NAVIGATION */}

                    <div className="nav-links">

                        <Link to="/">
                            Home
                        </Link>

                        <Link to="/login">
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="nav-register"
                        >
                            Register
                        </Link>

                    </div>

                </div>

            </nav>


            {/* =====================================
                HERO SECTION
            ====================================== */}

            <section className="hero">

                {/* LEFT SIDE */}

                <div className="hero-content">

                    <span className="hero-badge">
                        AI-POWERED CAREER GUIDANCE
                    </span>


                    <h1>

                        Discover Your

                        <span>
                            Perfect Career
                        </span>

                    </h1>


                    <p>

                        CareerAI helps students discover
                        suitable careers based on their
                        education, skills, interests and
                        career goals using Artificial
                        Intelligence and Machine Learning.

                    </p>


                    {/* =================================
                        BUTTONS
                    ================================= */}

                    <div className="hero-buttons">

                        {/* GET STARTED */}

                        <Link
                            to="/register"
                            className="primary-btn"
                        >
                            Get Started
                        </Link>


                        {/* LOGIN */}

                        <Link
                            to="/login"
                            className="secondary-btn"
                        >
                            Login
                        </Link>

                    </div>

                </div>


                {/* =====================================
                    RIGHT SIDE AI CARD
                ====================================== */}

                <div className="hero-card">

                    <div className="ai-circle">
                        AI
                    </div>


                    <h2>
                        AI Career Match
                    </h2>


                    <p>
                        Discover careers that match
                        your skills, interests and
                        education.
                    </p>


                    {/* CAREER MATCHES */}

                    <div className="match-box">

                        {/* SOFTWARE ENGINEER */}

                        <div>

                            <span>
                                Software Engineer
                            </span>

                            <strong>
                                94%
                            </strong>

                        </div>


                        {/* DATA SCIENTIST */}

                        <div>

                            <span>
                                Data Scientist
                            </span>

                            <strong>
                                88%
                            </strong>

                        </div>


                        {/* AI ENGINEER */}

                        <div>

                            <span>
                                AI Engineer
                            </span>

                            <strong>
                                91%
                            </strong>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================
                FEATURES SECTION
            ====================================== */}

            <section className="features">

                <h2>
                    Everything You Need
                    For Your Career
                </h2>


                <div className="feature-grid">

                    {/* FEATURE 1 */}

                    <div className="feature-card">

                        <div className="feature-icon">
                            🎯
                        </div>

                        <h3>
                            Career Recommendations
                        </h3>

                        <p>
                            Get AI-powered career
                            recommendations based
                            on your education,
                            skills and interests.
                        </p>

                    </div>


                    {/* FEATURE 2 */}

                    <div className="feature-card">

                        <div className="feature-icon">
                            🧠
                        </div>

                        <h3>
                            Skill Assessment
                        </h3>

                        <p>
                            Evaluate your technical
                            and soft skills and identify
                            areas that need improvement.
                        </p>

                    </div>


                    {/* FEATURE 3 */}

                    <div className="feature-card">

                        <div className="feature-icon">
                            📚
                        </div>

                        <h3>
                            Learning Roadmap
                        </h3>

                        <p>
                            Follow a personalized
                            learning roadmap to reach
                            your desired career.
                        </p>

                    </div>


                    {/* FEATURE 4 */}

                    <div className="feature-card">

                        <div className="feature-icon">
                            📄
                        </div>

                        <h3>
                            Resume Analysis
                        </h3>

                        <p>
                            Analyze your resume and
                            improve your chances of
                            getting shortlisted.
                        </p>

                    </div>

                </div>

            </section>


            {/* =====================================
                HOW IT WORKS
            ====================================== */}

            <section className="how-it-works">

                <h2>
                    How CareerAI Works
                </h2>


                <div className="steps-grid">

                    {/* STEP 1 */}

                    <div className="step-card">

                        <div className="step-number">
                            1
                        </div>

                        <h3>
                            Create Your Profile
                        </h3>

                        <p>
                            Add your education,
                            skills, interests,
                            certifications and
                            projects.
                        </p>

                    </div>


                    {/* STEP 2 */}

                    <div className="step-card">

                        <div className="step-number">
                            2
                        </div>

                        <h3>
                            Take Assessments
                        </h3>

                        <p>
                            Complete aptitude,
                            technical and personality
                            assessments.
                        </p>

                    </div>


                    {/* STEP 3 */}

                    <div className="step-card">

                        <div className="step-number">
                            3
                        </div>

                        <h3>
                            Get AI Recommendations
                        </h3>

                        <p>
                            Our ML system analyzes
                            your profile and recommends
                            suitable careers.
                        </p>

                    </div>


                    {/* STEP 4 */}

                    <div className="step-card">

                        <div className="step-number">
                            4
                        </div>

                        <h3>
                            Follow Your Roadmap
                        </h3>

                        <p>
                            Learn the required skills
                            through a personalized
                            career roadmap.
                        </p>

                    </div>

                </div>

            </section>


            {/* =====================================
                CALL TO ACTION
            ====================================== */}

            <section className="cta-section">

                <h2>
                    Ready to Discover Your Career?
                </h2>


                <p>
                    Start your personalized career
                    journey today.
                </p>


                <Link
                    to="/register"
                    className="primary-btn cta-button"
                >
                    Create Your Account
                </Link>

            </section>


            {/* =====================================
                FOOTER
            ====================================== */}

            <footer className="footer">

                <div className="footer-content">

                    <div>

                        <h3>
                            CareerAI
                        </h3>

                        <p>
                            AI-powered career guidance
                            for students.
                        </p>

                    </div>


                    <div>

                        <h4>
                            Quick Links
                        </h4>

                        <Link to="/">
                            Home
                        </Link>

                        <Link to="/login">
                            Login
                        </Link>

                        <Link to="/register">
                            Register
                        </Link>

                    </div>


                    <div>

                        <h4>
                            Platform
                        </h4>

                        <p>
                            Career Recommendations
                        </p>

                        <p>
                            Skill Assessment
                        </p>

                        <p>
                            Learning Roadmap
                        </p>

                        <p>
                            Resume Analysis
                        </p>

                    </div>

                </div>


                <div className="footer-bottom">

                    <p>
                        © 2026 CareerAI.
                        All rights reserved.
                    </p>

                </div>

            </footer>

        </div>
    );
}

export default Home;