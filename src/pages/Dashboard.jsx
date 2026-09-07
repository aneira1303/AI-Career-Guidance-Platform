import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  // Safely get logged-in user
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user") || "null");
  } catch (error) {
    console.error("Unable to read user data:", error);
    user = null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard-page">
      {/* ================================
          NAVBAR
      ================================= */}

      <nav className="dashboard-navbar">
        <Link to="/dashboard" className="logo">
          CareerAI
        </Link>

        <div className="dashboard-nav-right">
          <span>
            Welcome, {user?.name || "Student"}
          </span>

          <button
            type="button"
            onClick={handleLogout}
            className="logout-button"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* ================================
          MAIN CONTENT
      ================================= */}

      <main className="dashboard-content">
        {/* HEADER */}

        <div className="dashboard-heading">
          <span className="section-badge">
            AI CAREER INTELLIGENCE
          </span>

          <h1>
            Welcome back, {user?.name || "Student"}!
          </h1>

          <p>
            Let's analyze your skills and build your career path.
          </p>
        </div>

        {/* ================================
            AI CAREER INTELLIGENCE
        ================================= */}

        <div className="intelligence-dashboard-card">
          <div className="intelligence-dashboard-icon">
            🤖
          </div>

          <div>
            <h2>
              AI Career & Skill-Gap Intelligence
            </h2>

            <p>
              Analyze your resume, academic performance,
              projects, skills and target jobs to discover
              your career path.
            </p>
          </div>

          <Link
            to="/profile"
            className="primary-btn"
          >
            Start Analysis
          </Link>
        </div>

        {/* ================================
            DASHBOARD MODULES
        ================================= */}
{/* ================================
    DASHBOARD MODULES
================================= */}
<div className="dashboard-grid">
          {/* PROFILE */}
          <Link
            to="/profile"
            className="dashboard-card"
          >
            <span className="card-icon">
              👤
            </span>
            <h2>
              My Profile
            </h2>
            <p>
              Manage your education, skills, interests,
              certifications and projects.
            </p>
            <span className="card-link">
              Manage Profile →
            </span>
          </Link>
          {/* RESUME BUILDER */}
          <Link
            to="/resume-builder"
            className="dashboard-card"
          >
            <span className="card-icon">
              📄
            </span>
            <h2>
              AI Resume Builder
            </h2>
            <p>
              Build a professional, ATS-friendly resume
              using your education, skills, projects
              and experience.
            </p>
            <span className="card-link">
              Build Resume →
            </span>
          </Link>
          {/* RESUME ANALYZER */}
          <Link
            to="/resume-analyzer"
            className="dashboard-card"
          >
            <span className="card-icon">
              🔎
            </span>
            <h2>
              Resume Analyzer
            </h2>
            <p>
              Analyze your resume, identify missing skills
              and improve your career profile with AI.
            </p>
            <span className="card-link">
              Analyze Resume →
            </span>
          </Link>


  {/* 1. CAREER RECOMMENDATIONS */}
  <Link
    to="/careers"
    className="dashboard-card career-card"
  >
    <span className="card-icon">
      🎯
    </span>

    <div className="card-content">
      <h2>
        Career Recommendations
      </h2>

      <p>
        Discover careers that match your skills,
        interests and goals.
      </p>
    </div>

    <span className="card-link">
      View Careers →
    </span>
  </Link>


  {/* 2. SKILL GAP ANALYSIS */}
  <Link
    to="/skill-gap"
    className="dashboard-card skill-card"
  >
    <span className="card-icon">
      🔍
    </span>

    <div className="card-content">
      <h2>
        Skill Gap Analysis
      </h2>

      <p>
        Identify the skills you need to develop
        for your target career.
      </p>
    </div>

    <span className="card-link">
      Analyze Skills →
    </span>
  </Link>


  {/* 3. ASSESSMENTS */}
  <Link
    to="/assessments"
    className="dashboard-card assessment-card"
  >
    <span className="card-icon">
      🧠
    </span>

    <div className="card-content">
      <h2>
        Assessments
      </h2>

      <p>
        Test your technical, aptitude and
        soft skills.
      </p>
    </div>

    <span className="card-link">
      Take Assessment →
    </span>
  </Link>


  {/* 4. LEARNING ROADMAP */}
  <Link
    to="/roadmap"
    className="dashboard-card roadmap-card"
  >
    <span className="card-icon">
      📚
    </span>

    <div className="card-content">
      <h2>
        Learning Roadmap
      </h2>

      <p>
        Follow a personalized learning path
        based on your skill gaps.
      </p>
    </div>

    <span className="card-link">
      View Roadmap →
    </span>
  </Link>


  {/* 5. JOB MATCHING */}
  <Link
    to="/jobs"
    className="dashboard-card jobs-card"
  >
    <span className="card-icon">
      💼
    </span>

    <div className="card-content">
      <h2>
        Job Matching
      </h2>

      <p>
        Find jobs that match your skills,
        resume and target career.
      </p>
    </div>

    <span className="card-link">
      Find Jobs →
    </span>
  </Link>


  {/* 6. AI CAREER ASSISTANT */}
  <Link
    to="/assistant"
    className="dashboard-card assistant-card"
  >
    <span className="card-icon">
      🤖
    </span>

    <div className="card-content">
      <h2>
        AI Career Assistant
      </h2>

      <p>
        Ask AI about careers, skills, interviews,
        resumes and learning.
      </p>
    </div>

    <span className="card-link">
      Ask AI →
    </span>
  </Link>

</div>
     
        {/* ================================
            CAREER INTELLIGENCE PIPELINE
        ================================= */}

        <section className="dashboard-pipeline">
          <div className="dashboard-section-heading">
            <span className="section-badge">
              AI PIPELINE
            </span>

            <h2>
              Your Career Intelligence Pipeline
            </h2>

            <p>
              CareerAI combines your profile, resume,
              academic performance and job data to
              generate personalized career guidance.
            </p>
          </div>

          <div className="pipeline-dashboard-grid">
            {/* 01 */}

            <div className="pipeline-dashboard-step">
              <span>01</span>

              <div>📄</div>

              <h3>
                Profile + Resume
              </h3>

              <p>
                Resume, education, projects and skills.
              </p>
            </div>

            <div className="pipeline-dashboard-arrow">
              →
            </div>

            {/* 02 */}

            <div className="pipeline-dashboard-step">
              <span>02</span>

              <div>🧠</div>

              <h3>
                Current Skills
              </h3>

              <p>
                Extract and analyze your current skills.
              </p>
            </div>

            <div className="pipeline-dashboard-arrow">
              →
            </div>

            {/* 03 */}

            <div className="pipeline-dashboard-step">
              <span>03</span>

              <div>🔍</div>

              <h3>
                Skill Gap
              </h3>

              <p>
                Find missing skills for target careers.
              </p>
            </div>

            <div className="pipeline-dashboard-arrow">
              →
            </div>

            {/* 04 */}

            <div className="pipeline-dashboard-step">
              <span>04</span>

              <div>💼</div>

              <h3>
                Job Market
              </h3>

              <p>
                Compare skills with job requirements.
              </p>
            </div>

            <div className="pipeline-dashboard-arrow">
              →
            </div>

            {/* 05 */}

            <div className="pipeline-dashboard-step">
              <span>05</span>

              <div>🎯</div>

              <h3>
                Career Match
              </h3>

              <p>
                Rank suitable career opportunities.
              </p>
            </div>

            <div className="pipeline-dashboard-arrow">
              →
            </div>

            {/* 06 */}

            <div className="pipeline-dashboard-step">
              <span>06</span>

              <div>📚</div>

              <h3>
                Learning Path
              </h3>

              <p>
                Generate personalized courses and projects.
              </p>
            </div>
          </div>
        </section>

        {/* ================================
            RESUME → CAREER CTA
        ================================= */}

        <section className="resume-career-cta">
          <div>
            <span className="section-badge">
              BUILD YOUR FUTURE
            </span>

            <h2>
              Build Your Resume.
              <br />
              Find Your Career.
            </h2>

            <p>
              Create your resume with CareerAI and let
              our intelligence engine identify your
              skills, gaps and suitable career
              opportunities.
            </p>
          </div>

          <div className="resume-career-actions">
            <Link
              to="/resume-builder"
              className="primary-btn"
            >
              📄 Build Resume
            </Link>

            <Link
              to="/careers"
              className="secondary-btn"
            >
              🎯 Explore Careers
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;