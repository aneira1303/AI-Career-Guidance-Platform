import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SkillGap.css";

function SkillGap() {
  const [targetCareer, setTargetCareer] =
    useState("Software Engineer");

  const [skills, setSkills] = useState([
    "JavaScript",
    "React",
    "HTML",
    "CSS",
    "Git",
  ]);

  const [skillInput, setSkillInput] = useState("");

  const careerSkills = {
    "Software Engineer": [
      "JavaScript",
      "React",
      "Node.js",
      "Express.js",
      "SQL",
      "Git",
      "Data Structures",
      "Algorithms",
      "REST API",
      "System Design",
    ],

    "Data Scientist": [
      "Python",
      "Pandas",
      "NumPy",
      "SQL",
      "Statistics",
      "Machine Learning",
      "Data Visualization",
      "Scikit-learn",
      "Deep Learning",
      "Power BI",
    ],

    "AI / ML Engineer": [
      "Python",
      "NumPy",
      "Pandas",
      "Machine Learning",
      "Deep Learning",
      "TensorFlow",
      "PyTorch",
      "NLP",
      "Computer Vision",
      "MLOps",
    ],

    "Full Stack Developer": [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "SQL",
      "REST API",
      "Git",
    ],

    "Cloud Engineer": [
      "Linux",
      "Networking",
      "AWS",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Terraform",
      "Python",
      "Git",
      "Cloud Security",
    ],

    "Data Analyst": [
      "Excel",
      "SQL",
      "Python",
      "Pandas",
      "Statistics",
      "Power BI",
      "Tableau",
      "Data Visualization",
      "Data Cleaning",
      "Business Analysis",
    ],
  };

  const requiredSkills = careerSkills[targetCareer];

  const matchedSkills = requiredSkills.filter((skill) =>
    skills.some(
      (userSkill) =>
        userSkill.toLowerCase() === skill.toLowerCase()
    )
  );

  const missingSkills = requiredSkills.filter(
    (skill) =>
      !skills.some(
        (userSkill) =>
          userSkill.toLowerCase() === skill.toLowerCase()
      )
  );

  const matchPercentage = Math.round(
    (matchedSkills.length / requiredSkills.length) * 100
  );

  const addSkill = () => {
    const newSkill = skillInput.trim();

    if (!newSkill) {
      return;
    }

    const exists = skills.some(
      (skill) =>
        skill.toLowerCase() === newSkill.toLowerCase()
    );

    if (!exists) {
      setSkills((previousSkills) => [
        ...previousSkills,
        newSkill,
      ]);
    }

    setSkillInput("");
  };

  const removeSkill = (skillToRemove) => {
    setSkills((previousSkills) =>
      previousSkills.filter(
        (skill) => skill !== skillToRemove
      )
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addSkill();
    }
  };

  const getPriority = (index) => {
    if (index < 3) {
      return "High";
    }

    if (index < 6) {
      return "Medium";
    }

    return "Low";
  };

  return (
    <div className="skill-gap-page">

      {/* NAVBAR */}

      <nav className="skill-gap-navbar">

        <Link
          to="/dashboard"
          className="skill-gap-logo"
        >
          Career<span>AI</span>
        </Link>

        <div className="skill-gap-nav-links">
          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/profile">
            Profile
          </Link>

          <Link to="/careers">
            Careers
          </Link>
        </div>

      </nav>


      {/* MAIN */}

      <main className="skill-gap-container">

        {/* HEADER */}

        <section className="skill-gap-header">

          <span className="skill-gap-badge">
            AI CAREER INTELLIGENCE
          </span>

          <h1>
            Skill Gap Analysis
          </h1>

          <p>
            Compare your current skills with your
            target career requirements and discover
            exactly what you need to learn.
          </p>

        </section>


        {/* CAREER SELECTOR */}

        <section className="career-selector-card">

          <div className="selector-content">

            <div className="selector-icon">
              🎯
            </div>

            <div>
              <h2>
                Target Career
              </h2>

              <p>
                Select the career you want to prepare for.
              </p>
            </div>

          </div>

          <select
            className="career-select"
            value={targetCareer}
            onChange={(event) =>
              setTargetCareer(event.target.value)
            }
          >
            {Object.keys(careerSkills).map((career) => (
              <option
                key={career}
                value={career}
              >
                {career}
              </option>
            ))}
          </select>

        </section>


        {/* CURRENT SKILLS */}

        <section className="current-skills-card">

          <div className="section-title-row">

            <div>
              <span className="small-label">
                YOUR CURRENT PROFILE
              </span>

              <h2>
                Current Skills
              </h2>

              <p>
                Add the skills you already have.
              </p>
            </div>

            <div className="skill-count">
              {skills.length} Skills
            </div>

          </div>


          <div className="skill-input-row">

            <input
              type="text"
              value={skillInput}
              onChange={(event) =>
                setSkillInput(event.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder="Enter a skill, e.g. Python"
            />

            <button
              type="button"
              onClick={addSkill}
            >
              + Add Skill
            </button>

          </div>


          <div className="skill-tags">

            {skills.map((skill) => (
              <div
                className="skill-tag"
                key={skill}
              >
                <span>
                  {skill}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    removeSkill(skill)
                  }
                >
                  ×
                </button>
              </div>
            ))}

          </div>

        </section>


        {/* SCORE */}

        <section className="skill-score-section">

          <div className="score-card">

            <div
              className="score-circle"
              style={{
                "--score": matchPercentage,
              }}
            >
              <div>
                <strong>
                  {matchPercentage}%
                </strong>

                <span>
                  Match
                </span>
              </div>
            </div>

            <div className="score-content">

              <span className="small-label">
                CAREER READINESS
              </span>

              <h2>
                {targetCareer}
              </h2>

              <p>
                {matchPercentage >= 80
                  ? "Excellent match! Focus on advanced concepts, projects and interview preparation."
                  : matchPercentage >= 60
                  ? "Good foundation. Strengthen your missing skills and build practical projects."
                  : matchPercentage >= 40
                  ? "You have a starting foundation. Follow a structured learning path for your missing skills."
                  : "Start with the high-priority skills and build small projects as you learn."}
              </p>

            </div>

          </div>


          <div className="score-stat">

            <div>
              <strong>
                {matchedSkills.length}
              </strong>

              <span>
                Skills Matched
              </span>
            </div>

            <div>
              <strong>
                {missingSkills.length}
              </strong>

              <span>
                Skills Missing
              </span>
            </div>

            <div>
              <strong>
                {requiredSkills.length}
              </strong>

              <span>
                Skills Required
              </span>
            </div>

          </div>

        </section>


        {/* ANALYSIS */}

        <section className="analysis-grid">

          {/* MATCHED */}

          <div className="analysis-card">

            <div className="analysis-card-header">

              <div className="analysis-icon matched">
                ✓
              </div>

              <div>
                <h2>
                  Your Strengths
                </h2>

                <p>
                  Skills you already have
                </p>
              </div>

            </div>


            <div className="analysis-skills">

              {matchedSkills.length > 0 ? (
                matchedSkills.map((skill) => (
                  <div
                    className="analysis-skill matched-skill"
                    key={skill}
                  >
                    ✓ {skill}
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  No matching skills found yet.
                </div>
              )}

            </div>

          </div>


          {/* MISSING */}

          <div className="analysis-card">

            <div className="analysis-card-header">

              <div className="analysis-icon missing">
                !
              </div>

              <div>
                <h2>
                  Skill Gaps
                </h2>

                <p>
                  Skills recommended for your career
                </p>
              </div>

            </div>


            <div className="missing-skill-list">

              {missingSkills.length > 0 ? (
                missingSkills.map((skill, index) => {

                  const priority = getPriority(index);

                  return (
                    <div
                      className="missing-skill"
                      key={skill}
                    >

                      <div className="missing-skill-name">

                        <span>
                          {skill}
                        </span>

                        <small
                          className={`priority ${priority.toLowerCase()}`}
                        >
                          {priority}
                        </small>

                      </div>

                      <div className="skill-progress">

                        <div
                          className="skill-progress-bar"
                          style={{
                            width:
                              priority === "High"
                                ? "25%"
                                : priority === "Medium"
                                ? "50%"
                                : "70%",
                          }}
                        />

                      </div>

                    </div>
                  );
                })
              ) : (
                <div className="empty-state">
                  No skill gaps detected.
                </div>
              )}

            </div>

          </div>

        </section>


        {/* LEARNING PATH */}

        <section className="learning-card">

          <div className="learning-header">

            <div className="learning-icon">
              📚
            </div>

            <div>

              <span className="small-label">
                PERSONALIZED DEVELOPMENT
              </span>

              <h2>
                Recommended Learning Path
              </h2>

              <p>
                Focus on these skills to become
                career-ready.
              </p>

            </div>

          </div>


          <div className="learning-list">

            {missingSkills
              .slice(0, 6)
              .map((skill, index) => (

                <div
                  className="learning-item"
                  key={skill}
                >

                  <div className="learning-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="learning-info">

                    <h3>
                      Learn {skill}
                    </h3>

                    <p>
                      Build practical knowledge
                      and complete a project using {skill}.
                    </p>

                  </div>

                  <span className="learning-arrow">
                    →
                  </span>

                </div>

              ))}

            {missingSkills.length === 0 && (
              <div className="learning-complete">
                🎉 You have covered all the
                required skills for this career!
              </div>
            )}

          </div>

        </section>


        {/* ACTIONS */}

        <section className="skill-gap-actions">

          <Link
            to="/roadmap"
            className="primary-action"
          >
            📚 Build Learning Roadmap
          </Link>

          <Link
            to="/careers"
            className="secondary-action"
          >
            🎯 Explore Careers
          </Link>

          <Link
            to="/dashboard"
            className="back-action"
          >
            ← Back to Dashboard
          </Link>

        </section>

      </main>

    </div>
  );
}

export default SkillGap;