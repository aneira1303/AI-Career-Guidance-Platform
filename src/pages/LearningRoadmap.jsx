import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LearningRoadmap.css";

const roadmapData = {
  "Full Stack Developer": [
    {
      number: "01",
      icon: "🌐",
      title: "Web Development Fundamentals",
      duration: "2 Weeks",
      level: "Beginner",
      description:
        "Build a strong foundation in HTML, CSS, JavaScript and responsive web development.",
      skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    },
    {
      number: "02",
      icon: "⚛️",
      title: "Frontend Development",
      duration: "3 Weeks",
      level: "Intermediate",
      description:
        "Learn React and build modern, interactive frontend applications.",
      skills: ["React", "Components", "Hooks", "React Router"],
    },
    {
      number: "03",
      icon: "🟢",
      title: "Backend Development",
      duration: "3 Weeks",
      level: "Intermediate",
      description:
        "Build backend applications using Node.js, Express and REST APIs.",
      skills: ["Node.js", "Express.js", "REST API", "Authentication"],
    },
    {
      number: "04",
      icon: "🗄️",
      title: "Database Engineering",
      duration: "2 Weeks",
      level: "Intermediate",
      description:
        "Learn how to design, query and manage application databases.",
      skills: ["MySQL", "MongoDB", "SQL", "Database Design"],
    },
    {
      number: "05",
      icon: "☁️",
      title: "Deployment & DevOps",
      duration: "2 Weeks",
      level: "Advanced",
      description:
        "Learn Git, Docker, cloud deployment and modern DevOps practices.",
      skills: ["Git", "GitHub", "Docker", "Cloud Deployment"],
    },
    {
      number: "06",
      icon: "🚀",
      title: "Portfolio & Job Preparation",
      duration: "2 Weeks",
      level: "Advanced",
      description:
        "Build real-world projects and prepare for technical interviews.",
      skills: ["Projects", "DSA", "System Design", "Interview Skills"],
    },
  ],

  "Data Scientist": [
    {
      number: "01",
      icon: "🐍",
      title: "Python for Data Science",
      duration: "2 Weeks",
      level: "Beginner",
      description:
        "Learn Python programming concepts required for data analysis.",
      skills: ["Python", "NumPy", "Pandas", "Matplotlib"],
    },
    {
      number: "02",
      icon: "📊",
      title: "Data Analysis & Visualization",
      duration: "3 Weeks",
      level: "Intermediate",
      description:
        "Analyze datasets and communicate insights using visualizations.",
      skills: ["Data Cleaning", "EDA", "Statistics", "Visualization"],
    },
    {
      number: "03",
      icon: "🤖",
      title: "Machine Learning",
      duration: "4 Weeks",
      level: "Intermediate",
      description:
        "Learn supervised and unsupervised machine learning algorithms.",
      skills: ["Regression", "Classification", "Clustering", "Scikit-learn"],
    },
    {
      number: "04",
      icon: "🧠",
      title: "Advanced AI",
      duration: "4 Weeks",
      level: "Advanced",
      description:
        "Explore deep learning, neural networks and modern AI techniques.",
      skills: ["Deep Learning", "Neural Networks", "TensorFlow", "PyTorch"],
    },
    {
      number: "05",
      icon: "☁️",
      title: "ML Deployment",
      duration: "2 Weeks",
      level: "Advanced",
      description:
        "Learn how to deploy machine learning models into production.",
      skills: ["APIs", "Docker", "Cloud", "MLOps"],
    },
  ],

  "Software Engineer": [
    {
      number: "01",
      icon: "💻",
      title: "Programming Fundamentals",
      duration: "3 Weeks",
      level: "Beginner",
      description:
        "Strengthen programming fundamentals and object-oriented programming.",
      skills: ["Java", "Python", "C++", "OOP"],
    },
    {
      number: "02",
      icon: "🧩",
      title: "Data Structures & Algorithms",
      duration: "4 Weeks",
      level: "Intermediate",
      description:
        "Master common data structures and algorithms for interviews.",
      skills: ["Arrays", "Trees", "Graphs", "Algorithms"],
    },
    {
      number: "03",
      icon: "🏗️",
      title: "Software Engineering",
      duration: "3 Weeks",
      level: "Intermediate",
      description:
        "Learn software architecture and engineering best practices.",
      skills: ["Design Patterns", "SOLID", "Git", "Testing"],
    },
    {
      number: "04",
      icon: "🏛️",
      title: "System Design",
      duration: "4 Weeks",
      level: "Advanced",
      description:
        "Understand scalable architectures and distributed systems.",
      skills: ["HLD", "LLD", "Microservices", "Distributed Systems"],
    },
    {
      number: "05",
      icon: "🚀",
      title: "Interview & Career Preparation",
      duration: "2 Weeks",
      level: "Advanced",
      description:
        "Prepare for technical interviews and software engineering roles.",
      skills: ["DSA", "System Design", "Projects", "Communication"],
    },
  ],
};

function LearningRoadmap() {
  const [selectedCareer, setSelectedCareer] = useState(
    "Full Stack Developer"
  );

  const [completedSteps, setCompletedSteps] = useState([]);

  const roadmap = roadmapData[selectedCareer];

  const toggleComplete = (number) => {
    setCompletedSteps((previous) => {
      if (previous.includes(number)) {
        return previous.filter((item) => item !== number);
      }

      return [...previous, number];
    });
  };

  const completedCount = completedSteps.length;

  const progress =
    roadmap.length > 0
      ? Math.round((completedCount / roadmap.length) * 100)
      : 0;

  const totalWeeks = roadmap.reduce((total, item) => {
    return total + parseInt(item.duration, 10);
  }, 0);

  return (
    <div className="roadmap-page">

      {/* NAVBAR */}

      <nav className="roadmap-navbar">

        <Link to="/dashboard" className="roadmap-logo">
          Career<span>AI</span>
        </Link>

        <div className="roadmap-nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/profile">Profile</Link>
        </div>

      </nav>


      {/* MAIN */}

      <main className="roadmap-container">

        {/* HEADER */}

        <section className="roadmap-header">

          <span className="roadmap-badge">
            AI CAREER INTELLIGENCE
          </span>

          <h1>
            Learning Roadmap
          </h1>

          <p>
            Follow a structured learning path designed
            to help you develop the skills required for
            your target career.
          </p>

        </section>


        {/* CAREER SELECTOR */}

        <section className="career-selector-card">

          <div className="selector-content">

            <div className="selector-icon">
              🎯
            </div>

            <div>
              <span>
                SELECT YOUR TARGET CAREER
              </span>

              <h2>
                What do you want to become?
              </h2>
            </div>

          </div>


          <select
            className="career-selector"
            value={selectedCareer}
            onChange={(event) => {
              setSelectedCareer(event.target.value);
              setCompletedSteps([]);
            }}
          >
            {Object.keys(roadmapData).map((career) => (
              <option key={career} value={career}>
                {career}
              </option>
            ))}
          </select>

        </section>


        {/* PROGRESS */}

        <section className="roadmap-progress-card">

          <div className="progress-header">

            <div>
              <span className="roadmap-badge">
                YOUR PROGRESS
              </span>

              <h2>
                {selectedCareer}
              </h2>
            </div>

            <div className="progress-percentage">
              {progress}%
            </div>

          </div>


          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>


          <div className="progress-details">

            <span>
              {completedCount} of {roadmap.length} stages completed
            </span>

            <span>
              Estimated duration: {totalWeeks} weeks
            </span>

          </div>

        </section>


        {/* ROADMAP */}

        <section className="roadmap-section">

          <div className="roadmap-section-header">

            <div>
              <span className="roadmap-badge">
                YOUR LEARNING PATH
              </span>

              <h2>
                Become a {selectedCareer}
              </h2>
            </div>

            <span className="roadmap-stage-count">
              {roadmap.length} Stages
            </span>

          </div>


          <div className="roadmap-timeline">

            {roadmap.map((step, index) => {

              const isCompleted =
                completedSteps.includes(step.number);

              return (
                <div
                  className={`roadmap-step ${
                    isCompleted ? "completed" : ""
                  }`}
                  key={step.number}
                >

                  {/* TIMELINE */}

                  <div className="timeline-column">

                    <div className="timeline-number">
                      {isCompleted ? "✓" : step.number}
                    </div>

                    {index !== roadmap.length - 1 && (
                      <div className="timeline-line" />
                    )}

                  </div>


                  {/* CARD */}

                  <article className="roadmap-step-card">

                    <div className="step-top">

                      <div className="step-icon">
                        {step.icon}
                      </div>

                      <div className="step-meta">

                        <span className="step-duration">
                          ⏱ {step.duration}
                        </span>

                        <span className="step-level">
                          {step.level}
                        </span>

                      </div>

                    </div>


                    <h3>
                      {step.title}
                    </h3>

                    <p>
                      {step.description}
                    </p>


                    <div className="step-skills">

                      <strong>
                        Skills to learn
                      </strong>

                      <div className="skill-tags">

                        {step.skills.map((skill) => (
                          <span key={skill}>
                            {skill}
                          </span>
                        ))}

                      </div>

                    </div>


                    <button
                      type="button"
                      className={`complete-step-btn ${
                        isCompleted
                          ? "completed-button"
                          : ""
                      }`}
                      onClick={() =>
                        toggleComplete(step.number)
                      }
                    >
                      {isCompleted
                        ? "✓ Completed"
                        : "Mark as Complete"}
                    </button>

                  </article>

                </div>
              );
            })}

          </div>

        </section>


        {/* AI SECTION */}

        <section className="ai-roadmap-card">

          <div className="ai-roadmap-icon">
            🤖
          </div>

          <div className="ai-roadmap-content">

            <span className="roadmap-badge">
              AI LEARNING INTELLIGENCE
            </span>

            <h2>
              Your roadmap adapts to your skill gaps.
            </h2>

            <p>
              Complete your profile, resume analysis and
              skill-gap assessment to help CareerAI
              recommend relevant learning topics and
              projects.
            </p>

          </div>


          <div className="ai-roadmap-actions">

            <Link
              to="/skill-gap"
              className="roadmap-primary-btn"
            >
              Analyze Skill Gap
            </Link>

            <Link
              to="/assessments"
              className="roadmap-secondary-btn"
            >
              Take Assessment
            </Link>

          </div>

        </section>


        {/* CTA */}

        <section className="roadmap-cta">

          <div>

            <span className="roadmap-badge">
              KEEP LEARNING
            </span>

            <h2>
              Small Steps.
              <br />
              Big Career Growth.
            </h2>

            <p>
              Build practical skills, complete projects
              and move closer to your target career.
            </p>

          </div>


          <Link
            to="/careers"
            className="roadmap-cta-btn"
          >
            🎯 Explore Careers
          </Link>

        </section>

      </main>

    </div>
  );
}

export default LearningRoadmap;