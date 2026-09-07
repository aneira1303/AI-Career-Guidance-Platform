import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Jobs.css";

const jobsData = [
  {
    id: 1,
    title: "Junior Full Stack Developer",
    company: "TechNova Solutions",
    location: "Bengaluru, India",
    type: "Full Time",
    experience: "0–2 Years",
    salary: "₹5–8 LPA",
    match: 94,
    skills: ["React", "Node.js", "JavaScript", "MySQL"],
    description:
      "Build modern web applications and work with frontend and backend technologies.",
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "Innovate Labs",
    location: "Hyderabad, India",
    type: "Full Time",
    experience: "0–2 Years",
    salary: "₹4–7 LPA",
    match: 91,
    skills: ["React", "HTML", "CSS", "JavaScript"],
    description:
      "Develop responsive user interfaces and collaborate with product and design teams.",
  },
  {
    id: 3,
    title: "Software Engineer",
    company: "Digital Systems",
    location: "Pune, India",
    type: "Full Time",
    experience: "0–2 Years",
    salary: "₹6–10 LPA",
    match: 88,
    skills: ["Java", "Python", "DSA", "Git"],
    description:
      "Design, develop and maintain scalable software applications.",
  },
  {
    id: 4,
    title: "Data Analyst",
    company: "Analytics Hub",
    location: "Mumbai, India",
    type: "Full Time",
    experience: "0–2 Years",
    salary: "₹4–7 LPA",
    match: 86,
    skills: ["Python", "SQL", "Excel", "Power BI"],
    description:
      "Analyze business data and create dashboards to support data-driven decisions.",
  },
  {
    id: 5,
    title: "Junior Data Scientist",
    company: "AI Research Labs",
    location: "Chennai, India",
    type: "Full Time",
    experience: "0–2 Years",
    salary: "₹6–11 LPA",
    match: 83,
    skills: ["Python", "Machine Learning", "Pandas", "Scikit-learn"],
    description:
      "Develop machine learning models and analyze large datasets.",
  },
  {
    id: 6,
    title: "React Developer Intern",
    company: "NextGen Technologies",
    location: "Remote",
    type: "Internship",
    experience: "Fresher",
    salary: "₹20K–30K/month",
    match: 81,
    skills: ["React", "JavaScript", "Git", "CSS"],
    description:
      "Work on real-world React applications with an experienced engineering team.",
  },
];

function Jobs() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [jobType, setJobType] = useState("All Types");

  const filteredJobs = useMemo(() => {
    return jobsData.filter((job) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        job.title.toLowerCase().includes(searchText) ||
        job.company.toLowerCase().includes(searchText) ||
        job.skills.some((skill) =>
          skill.toLowerCase().includes(searchText)
        );

      const matchesLocation =
        location === "All Locations" ||
        job.location === location;

      const matchesType =
        jobType === "All Types" ||
        job.type === jobType;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesType
      );
    });
  }, [search, location, jobType]);

  return (
    <div className="jobs-page">

      {/* NAVBAR */}
      <nav className="jobs-navbar">

        <Link
          to="/dashboard"
          className="jobs-logo"
        >
          Career<span>AI</span>
        </Link>

        <div className="jobs-nav-links">
          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/careers">
            Careers
          </Link>

          <Link to="/roadmap">
            Roadmap
          </Link>

          <Link to="/profile">
            Profile
          </Link>
        </div>

      </nav>


      {/* MAIN */}
      <main className="jobs-container">

        {/* HEADER */}
        <section className="jobs-header">

          <span className="jobs-badge">
            AI JOB MATCHING
          </span>

          <h1>
            Find Jobs That Match You
          </h1>

          <p>
            Discover opportunities based on your
            skills, resume, experience and target
            career.
          </p>

        </section>


        {/* SEARCH */}
        <section className="jobs-search-card">

          <div className="search-box">

            <span>🔎</span>

            <input
              type="text"
              placeholder="Search jobs, companies or skills..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

          </div>


          <select
            value={location}
            onChange={(event) =>
              setLocation(event.target.value)
            }
          >
            <option>All Locations</option>
            <option>Bengaluru, India</option>
            <option>Hyderabad, India</option>
            <option>Pune, India</option>
            <option>Mumbai, India</option>
            <option>Chennai, India</option>
            <option>Remote</option>
          </select>


          <select
            value={jobType}
            onChange={(event) =>
              setJobType(event.target.value)
            }
          >
            <option>All Types</option>
            <option>Full Time</option>
            <option>Internship</option>
          </select>


          <button
            type="button"
            className="jobs-search-button"
            onClick={() => {}}
          >
            Search Jobs
          </button>

        </section>


        {/* INSIGHTS */}
        <section className="jobs-insights">

          <div className="job-insight-card">

            <span className="insight-icon">
              🎯
            </span>

            <div>
              <strong>94%</strong>
              <span>Best Match</span>
            </div>

          </div>


          <div className="job-insight-card">

            <span className="insight-icon">
              💼
            </span>

            <div>
              <strong>
                {filteredJobs.length}
              </strong>

              <span>
                Jobs Found
              </span>
            </div>

          </div>


          <div className="job-insight-card">

            <span className="insight-icon">
              🧠
            </span>

            <div>
              <strong>12</strong>

              <span>
                Skills Matched
              </span>
            </div>

          </div>


          <div className="job-insight-card">

            <span className="insight-icon">
              🚀
            </span>

            <div>
              <strong>6</strong>

              <span>
                Recommended
              </span>
            </div>

          </div>

        </section>


        {/* JOBS */}
        <section className="jobs-section">

          <div className="jobs-section-header">

            <div>

              <span className="jobs-badge">
                RECOMMENDED FOR YOU
              </span>

              <h2>
                Job Opportunities
              </h2>

            </div>

          </div>


          <div className="job-list">

            {filteredJobs.length === 0 ? (

              <div className="no-jobs">

                <div>
                  🔎
                </div>

                <h3>
                  No matching jobs found
                </h3>

                <p>
                  Try changing your search or filters.
                </p>

              </div>

            ) : (

              filteredJobs.map((job) => (

                <article
                  className="job-card"
                  key={job.id}
                >

                  <div className="job-company-logo">
                    {job.company.charAt(0)}
                  </div>


                  <div className="job-main">

                    <div className="job-title-row">

                      <div>

                        <h3>
                          {job.title}
                        </h3>

                        <p className="job-company">
                          {job.company}
                        </p>

                      </div>


                      <div className="match-score">

                        <strong>
                          {job.match}%
                        </strong>

                        <span>
                          Match
                        </span>

                      </div>

                    </div>


                    <div className="job-meta">

                      <span>
                        📍 {job.location}
                      </span>

                      <span>
                        💼 {job.type}
                      </span>

                      <span>
                        ⏱ {job.experience}
                      </span>

                      <span>
                        💰 {job.salary}
                      </span>

                    </div>


                    <p className="job-description">
                      {job.description}
                    </p>


                    <div className="job-skills">

                      {job.skills.map((skill) => (

                        <span key={skill}>
                          {skill}
                        </span>

                      ))}

                    </div>


                    <div className="job-actions">

                      <button
                        type="button"
                        className="apply-job-button"
                        onClick={() =>
                          alert(
                            `Application started for ${job.title}`
                          )
                        }
                      >
                        Apply Now
                      </button>


                      <button
                        type="button"
                        className="save-job-button"
                        onClick={() =>
                          alert(
                            `${job.title} saved`
                          )
                        }
                      >
                        ♡ Save Job
                      </button>

                    </div>

                  </div>

                </article>

              ))

            )}

          </div>

        </section>


        {/* AI JOB INTELLIGENCE */}
        <section className="ai-job-card">

          <div className="ai-job-icon">
            🤖
          </div>


          <div className="ai-job-content">

            <span className="jobs-badge">
              AI JOB INTELLIGENCE
            </span>

            <h2>
              Improve Your Job Match Score
            </h2>

            <p>
              Update your profile, analyze your resume
              and complete your skill-gap assessment
              to receive more accurate job recommendations.
            </p>

          </div>


          <div className="ai-job-actions">

            <Link
              to="/profile"
              className="ai-job-primary"
            >
              Update Profile
            </Link>

            <Link
              to="/resume-analyzer"
              className="ai-job-secondary"
            >
              Analyze Resume
            </Link>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Jobs;