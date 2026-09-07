import React, { useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import "./ResumeBuilder.css";

function ResumeBuilder() {
  const resumeRef = useRef(null);

  const [resume, setResume] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    portfolio: "",

    summary: "",

    skills: "",

    education: [
      {
        degree: "",
        institution: "",
        location: "",
        year: "",
        details: "",
      },
    ],

    experience: [
      {
        position: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],

    projects: [
      {
        title: "",
        technologies: "",
        description: "",
        link: "",
      },
    ],

    certifications: [
      {
        name: "",
        issuer: "",
        year: "",
      },
    ],
  });

  /* =========================================================
     BASIC FIELD HANDLER
  ========================================================= */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setResume((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* =========================================================
     EDUCATION
  ========================================================= */

  const handleEducationChange = (index, field, value) => {
    setResume((previous) => {
      const education = [...previous.education];

      education[index] = {
        ...education[index],
        [field]: value,
      };

      return {
        ...previous,
        education,
      };
    });
  };

  const addEducation = () => {
    setResume((previous) => ({
      ...previous,
      education: [
        ...previous.education,
        {
          degree: "",
          institution: "",
          location: "",
          year: "",
          details: "",
        },
      ],
    }));
  };

  const removeEducation = (index) => {
    setResume((previous) => ({
      ...previous,
      education: previous.education.filter(
        (_, educationIndex) => educationIndex !== index
      ),
    }));
  };

  /* =========================================================
     EXPERIENCE
  ========================================================= */

  const handleExperienceChange = (index, field, value) => {
    setResume((previous) => {
      const experience = [...previous.experience];

      experience[index] = {
        ...experience[index],
        [field]: value,
      };

      return {
        ...previous,
        experience,
      };
    });
  };

  const addExperience = () => {
    setResume((previous) => ({
      ...previous,
      experience: [
        ...previous.experience,
        {
          position: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }));
  };

  const removeExperience = (index) => {
    setResume((previous) => ({
      ...previous,
      experience: previous.experience.filter(
        (_, experienceIndex) => experienceIndex !== index
      ),
    }));
  };

  /* =========================================================
     PROJECTS
  ========================================================= */

  const handleProjectChange = (index, field, value) => {
    setResume((previous) => {
      const projects = [...previous.projects];

      projects[index] = {
        ...projects[index],
        [field]: value,
      };

      return {
        ...previous,
        projects,
      };
    });
  };

  const addProject = () => {
    setResume((previous) => ({
      ...previous,
      projects: [
        ...previous.projects,
        {
          title: "",
          technologies: "",
          description: "",
          link: "",
        },
      ],
    }));
  };

  const removeProject = (index) => {
    setResume((previous) => ({
      ...previous,
      projects: previous.projects.filter(
        (_, projectIndex) => projectIndex !== index
      ),
    }));
  };

  /* =========================================================
     CERTIFICATIONS
  ========================================================= */

  const handleCertificationChange = (index, field, value) => {
    setResume((previous) => {
      const certifications = [...previous.certifications];

      certifications[index] = {
        ...certifications[index],
        [field]: value,
      };

      return {
        ...previous,
        certifications,
      };
    });
  };

  const addCertification = () => {
    setResume((previous) => ({
      ...previous,
      certifications: [
        ...previous.certifications,
        {
          name: "",
          issuer: "",
          year: "",
        },
      ],
    }));
  };

  const removeCertification = (index) => {
    setResume((previous) => ({
      ...previous,
      certifications: previous.certifications.filter(
        (_, certificationIndex) =>
          certificationIndex !== index
      ),
    }));
  };

  /* =========================================================
     DOWNLOAD PDF
  ========================================================= */

  const downloadResume = () => {
    if (!resumeRef.current) {
      alert("Resume preview is not available.");
      return;
    }

    if (!resume.name.trim()) {
      alert("Please enter your name before downloading the resume.");
      return;
    }

    const element = resumeRef.current;

    const options = {
      margin: 0,
      filename: `${resume.name
        .trim()
        .replace(/[^a-z0-9]/gi, "-")
        .toLowerCase()}-resume.pdf`,

      image: {
        type: "jpeg",
        quality: 0.98,
      },

      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      },

      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },

      pagebreak: {
        mode: ["css", "legacy"],
      },
    };

    html2pdf()
      .set(options)
      .from(element)
      .save();
  };

  /* =========================================================
     CLEAR FORM
  ========================================================= */

  const clearResume = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear your resume?"
    );

    if (!confirmed) {
      return;
    }

    setResume({
      name: "",
      role: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      portfolio: "",

      summary: "",

      skills: "",

      education: [
        {
          degree: "",
          institution: "",
          location: "",
          year: "",
          details: "",
        },
      ],

      experience: [
        {
          position: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],

      projects: [
        {
          title: "",
          technologies: "",
          description: "",
          link: "",
        },
      ],

      certifications: [
        {
          name: "",
          issuer: "",
          year: "",
        },
      ],
    });
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="resume-builder-page">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="resume-builder-header">
        <div>
          <span className="resume-builder-badge">
            CAREERAI
          </span>

          <h1>
            AI Resume Builder
          </h1>

          <p>
            Create a professional, ATS-friendly resume
            and download it as a PDF.
          </p>
        </div>

        <div className="resume-builder-header-actions">
          <button
            type="button"
            className="clear-resume-btn"
            onClick={clearResume}
          >
            Clear
          </button>

          <button
            type="button"
            className="download-resume-btn"
            onClick={downloadResume}
          >
            ↓ Download PDF
          </button>
        </div>
      </header>

      {/* =====================================================
          BUILDER LAYOUT
      ===================================================== */}

      <div className="resume-builder-layout">

        {/* ===================================================
            FORM
        =================================================== */}

        <section className="resume-form-panel">

          {/* PERSONAL INFORMATION */}

          <div className="resume-form-section">
            <div className="form-section-heading">
              <span>01</span>

              <div>
                <h2>
                  Personal Information
                </h2>

                <p>
                  Add your contact and professional details.
                </p>
              </div>
            </div>

            <div className="form-grid">

              <div className="form-group full-width">
                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={resume.name}
                  onChange={handleChange}
                  placeholder="e.g. Aneira Patricio"
                />
              </div>

              <div className="form-group">
                <label>
                  Professional Title
                </label>

                <input
                  type="text"
                  name="role"
                  value={resume.role}
                  onChange={handleChange}
                  placeholder="e.g. Software Engineer"
                />
              </div>

              <div className="form-group">
                <label>
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={resume.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />
              </div>

              <div className="form-group">
                <label>
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  value={resume.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                />
              </div>

              <div className="form-group">
                <label>
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={resume.location}
                  onChange={handleChange}
                  placeholder="Mumbai, India"
                />
              </div>

              <div className="form-group">
                <label>
                  LinkedIn
                </label>

                <input
                  type="text"
                  name="linkedin"
                  value={resume.linkedin}
                  onChange={handleChange}
                  placeholder="linkedin.com/in/yourname"
                />
              </div>

              <div className="form-group">
                <label>
                  GitHub
                </label>

                <input
                  type="text"
                  name="github"
                  value={resume.github}
                  onChange={handleChange}
                  placeholder="github.com/yourname"
                />
              </div>

              <div className="form-group">
                <label>
                  Portfolio
                </label>

                <input
                  type="text"
                  name="portfolio"
                  value={resume.portfolio}
                  onChange={handleChange}
                  placeholder="yourportfolio.com"
                />
              </div>

            </div>
          </div>

          {/* SUMMARY */}

          <div className="resume-form-section">
            <div className="form-section-heading">
              <span>02</span>

              <div>
                <h2>
                  Professional Summary
                </h2>

                <p>
                  Write a concise summary of your profile.
                </p>
              </div>
            </div>

            <div className="form-group">
              <textarea
                name="summary"
                value={resume.summary}
                onChange={handleChange}
                rows="6"
                placeholder="Example: Results-driven software engineer with experience in React, Node.js, Python and AI-powered applications..."
              />
            </div>
          </div>

          {/* SKILLS */}

          <div className="resume-form-section">
            <div className="form-section-heading">
              <span>03</span>

              <div>
                <h2>
                  Skills
                </h2>

                <p>
                  Separate your skills using commas.
                </p>
              </div>
            </div>

            <div className="form-group">
              <label>
                Technical & Professional Skills
              </label>

              <textarea
                name="skills"
                value={resume.skills}
                onChange={handleChange}
                rows="4"
                placeholder="React, JavaScript, TypeScript, Node.js, Python, SQL, MongoDB, Git, AWS"
              />
            </div>
          </div>

          {/* EDUCATION */}

          <div className="resume-form-section">
            <div className="form-section-heading">
              <span>04</span>

              <div>
                <h2>
                  Education
                </h2>

                <p>
                  Add your academic qualifications.
                </p>
              </div>
            </div>

            {resume.education.map((education, index) => (
              <div
                className="dynamic-form-card"
                key={index}
              >
                <div className="dynamic-form-header">
                  <h3>
                    Education {index + 1}
                  </h3>

                  {resume.education.length > 1 && (
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() =>
                        removeEducation(index)
                      }
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="form-grid">

                  <div className="form-group">
                    <label>
                      Degree
                    </label>

                    <input
                      type="text"
                      value={education.degree}
                      onChange={(event) =>
                        handleEducationChange(
                          index,
                          "degree",
                          event.target.value
                        )
                      }
                      placeholder="B.Tech Computer Science"
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Institution
                    </label>

                    <input
                      type="text"
                      value={education.institution}
                      onChange={(event) =>
                        handleEducationChange(
                          index,
                          "institution",
                          event.target.value
                        )
                      }
                      placeholder="ABC University"
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Location
                    </label>

                    <input
                      type="text"
                      value={education.location}
                      onChange={(event) =>
                        handleEducationChange(
                          index,
                          "location",
                          event.target.value
                        )
                      }
                      placeholder="Mumbai, India"
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Graduation Year
                    </label>

                    <input
                      type="text"
                      value={education.year}
                      onChange={(event) =>
                        handleEducationChange(
                          index,
                          "year",
                          event.target.value
                        )
                      }
                      placeholder="2026"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>
                      Details
                    </label>

                    <textarea
                      value={education.details}
                      onChange={(event) =>
                        handleEducationChange(
                          index,
                          "details",
                          event.target.value
                        )
                      }
                      rows="3"
                      placeholder="CGPA, relevant coursework, achievements..."
                    />
                  </div>

                </div>
              </div>
            ))}

            <button
              type="button"
              className="add-section-btn"
              onClick={addEducation}
            >
              + Add Education
            </button>
          </div>

          {/* EXPERIENCE */}

          <div className="resume-form-section">
            <div className="form-section-heading">
              <span>05</span>

              <div>
                <h2>
                  Experience
                </h2>

                <p>
                  Add internships, jobs or professional experience.
                </p>
              </div>
            </div>

            {resume.experience.map((experience, index) => (
              <div
                className="dynamic-form-card"
                key={index}
              >
                <div className="dynamic-form-header">
                  <h3>
                    Experience {index + 1}
                  </h3>

                  {resume.experience.length > 1 && (
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() =>
                        removeExperience(index)
                      }
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="form-grid">

                  <div className="form-group">
                    <label>
                      Position
                    </label>

                    <input
                      type="text"
                      value={experience.position}
                      onChange={(event) =>
                        handleExperienceChange(
                          index,
                          "position",
                          event.target.value
                        )
                      }
                      placeholder="Software Engineering Intern"
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Company
                    </label>

                    <input
                      type="text"
                      value={experience.company}
                      onChange={(event) =>
                        handleExperienceChange(
                          index,
                          "company",
                          event.target.value
                        )
                      }
                      placeholder="ABC Technologies"
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Location
                    </label>

                    <input
                      type="text"
                      value={experience.location}
                      onChange={(event) =>
                        handleExperienceChange(
                          index,
                          "location",
                          event.target.value
                        )
                      }
                      placeholder="Bangalore, India"
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Start Date
                    </label>

                    <input
                      type="text"
                      value={experience.startDate}
                      onChange={(event) =>
                        handleExperienceChange(
                          index,
                          "startDate",
                          event.target.value
                        )
                      }
                      placeholder="Jan 2025"
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      End Date
                    </label>

                    <input
                      type="text"
                      value={experience.endDate}
                      onChange={(event) =>
                        handleExperienceChange(
                          index,
                          "endDate",
                          event.target.value
                        )
                      }
                      placeholder="Jun 2025 / Present"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>
                      Responsibilities & Achievements
                    </label>

                    <textarea
                      value={experience.description}
                      onChange={(event) =>
                        handleExperienceChange(
                          index,
                          "description",
                          event.target.value
                        )
                      }
                      rows="5"
                      placeholder="Describe your responsibilities, achievements and measurable results..."
                    />
                  </div>

                </div>
              </div>
            ))}

            <button
              type="button"
              className="add-section-btn"
              onClick={addExperience}
            >
              + Add Experience
            </button>
          </div>

          {/* PROJECTS */}

          <div className="resume-form-section">
            <div className="form-section-heading">
              <span>06</span>

              <div>
                <h2>
                  Projects
                </h2>

                <p>
                  Showcase your strongest technical projects.
                </p>
              </div>
            </div>

            {resume.projects.map((project, index) => (
              <div
                className="dynamic-form-card"
                key={index}
              >
                <div className="dynamic-form-header">
                  <h3>
                    Project {index + 1}
                  </h3>

                  {resume.projects.length > 1 && (
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() =>
                        removeProject(index)
                      }
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="form-grid">

                  <div className="form-group">
                    <label>
                      Project Name
                    </label>

                    <input
                      type="text"
                      value={project.title}
                      onChange={(event) =>
                        handleProjectChange(
                          index,
                          "title",
                          event.target.value
                        )
                      }
                      placeholder="AI Career Guidance Platform"
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Technologies
                    </label>

                    <input
                      type="text"
                      value={project.technologies}
                      onChange={(event) =>
                        handleProjectChange(
                          index,
                          "technologies",
                          event.target.value
                        )
                      }
                      placeholder="React, Node.js, MySQL, Python"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>
                      Project Description
                    </label>

                    <textarea
                      value={project.description}
                      onChange={(event) =>
                        handleProjectChange(
                          index,
                          "description",
                          event.target.value
                        )
                      }
                      rows="4"
                      placeholder="Explain what you built, the problem it solves and your contribution..."
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>
                      Project Link
                    </label>

                    <input
                      type="text"
                      value={project.link}
                      onChange={(event) =>
                        handleProjectChange(
                          index,
                          "link",
                          event.target.value
                        )
                      }
                      placeholder="github.com/yourname/project"
                    />
                  </div>

                </div>
              </div>
            ))}

            <button
              type="button"
              className="add-section-btn"
              onClick={addProject}
            >
              + Add Project
            </button>
          </div>

          {/* CERTIFICATIONS */}

          <div className="resume-form-section">
            <div className="form-section-heading">
              <span>07</span>

              <div>
                <h2>
                  Certifications
                </h2>

                <p>
                  Add relevant professional certifications.
                </p>
              </div>
            </div>

            {resume.certifications.map(
              (certification, index) => (
                <div
                  className="dynamic-form-card"
                  key={index}
                >
                  <div className="dynamic-form-header">
                    <h3>
                      Certification {index + 1}
                    </h3>

                    {resume.certifications.length > 1 && (
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() =>
                          removeCertification(index)
                        }
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="form-grid">

                    <div className="form-group">
                      <label>
                        Certification
                      </label>

                      <input
                        type="text"
                        value={certification.name}
                        onChange={(event) =>
                          handleCertificationChange(
                            index,
                            "name",
                            event.target.value
                          )
                        }
                        placeholder="AWS Certified Cloud Practitioner"
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        Issuing Organization
                      </label>

                      <input
                        type="text"
                        value={certification.issuer}
                        onChange={(event) =>
                          handleCertificationChange(
                            index,
                            "issuer",
                            event.target.value
                          )
                        }
                        placeholder="Amazon Web Services"
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        Year
                      </label>

                      <input
                        type="text"
                        value={certification.year}
                        onChange={(event) =>
                          handleCertificationChange(
                            index,
                            "year",
                            event.target.value
                          )
                        }
                        placeholder="2026"
                      />
                    </div>

                  </div>
                </div>
              )
            )}

            <button
              type="button"
              className="add-section-btn"
              onClick={addCertification}
            >
              + Add Certification
            </button>
          </div>

          {/* BOTTOM DOWNLOAD */}

          <div className="form-bottom-actions">
            <button
              type="button"
              className="download-resume-btn large"
              onClick={downloadResume}
            >
              📄 Download My Resume
            </button>
          </div>
        </section>

        {/* ===================================================
            LIVE PREVIEW
        =================================================== */}

        <aside className="resume-preview-panel">

          <div className="preview-header">
            <div>
              <span>
                LIVE PREVIEW
              </span>

              <h2>
                Resume
              </h2>
            </div>

            <button
              type="button"
              className="preview-download-btn"
              onClick={downloadResume}
            >
              ↓ PDF
            </button>
          </div>

          <div className="resume-preview-wrapper">

            <div
              className="resume-paper"
              ref={resumeRef}
            >

              {/* RESUME HEADER */}

              <div className="resume-paper-header">

                <h1>
                  {resume.name || "Your Name"}
                </h1>

                {resume.role && (
                  <h2>
                    {resume.role}
                  </h2>
                )}

                <div className="resume-contact">
                  {resume.email && (
                    <span>
                      {resume.email}
                    </span>
                  )}

                  {resume.phone && (
                    <span>
                      {resume.phone}
                    </span>
                  )}

                  {resume.location && (
                    <span>
                      {resume.location}
                    </span>
                  )}
                </div>

                <div className="resume-links">
                  {resume.linkedin && (
                    <span>
                      {resume.linkedin}
                    </span>
                  )}

                  {resume.github && (
                    <span>
                      {resume.github}
                    </span>
                  )}

                  {resume.portfolio && (
                    <span>
                      {resume.portfolio}
                    </span>
                  )}
                </div>

              </div>

              {/* SUMMARY */}

              {resume.summary.trim() && (
                <div className="resume-paper-section">
                  <h3>
                    PROFILE
                  </h3>

                  <p>
                    {resume.summary}
                  </p>
                </div>
              )}

              {/* SKILLS */}

              {resume.skills.trim() && (
                <div className="resume-paper-section">
                  <h3>
                    SKILLS
                  </h3>

                  <div className="resume-skills">
                    {resume.skills
                      .split(",")
                      .map((skill, index) => {
                        const cleanedSkill =
                          skill.trim();

                        if (!cleanedSkill) {
                          return null;
                        }

                        return (
                          <span key={index}>
                            {cleanedSkill}
                          </span>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* EXPERIENCE */}

              {resume.experience.some(
                (item) =>
                  item.position ||
                  item.company ||
                  item.description
              ) && (
                <div className="resume-paper-section">
                  <h3>
                    EXPERIENCE
                  </h3>

                  {resume.experience.map(
                    (experience, index) => {
                      if (
                        !experience.position &&
                        !experience.company &&
                        !experience.description
                      ) {
                        return null;
                      }

                      return (
                        <div
                          className="resume-experience-item"
                          key={index}
                        >
                          <div className="resume-item-heading">
                            <div>
                              <h4>
                                {experience.position ||
                                  "Position"}
                              </h4>

                              {experience.company && (
                                <strong>
                                  {experience.company}
                                </strong>
                              )}
                            </div>

                            <div className="resume-item-meta">
                              {experience.location && (
                                <span>
                                  {experience.location}
                                </span>
                              )}

                              {(experience.startDate ||
                                experience.endDate) && (
                                <span>
                                  {experience.startDate}
                                  {experience.startDate &&
                                  experience.endDate
                                    ? " – "
                                    : ""}
                                  {experience.endDate}
                                </span>
                              )}
                            </div>
                          </div>

                          {experience.description && (
                            <p>
                              {experience.description}
                            </p>
                          )}
                        </div>
                      );
                    }
                  )}
                </div>
              )}

              {/* PROJECTS */}

              {resume.projects.some(
                (item) =>
                  item.title ||
                  item.description ||
                  item.technologies
              ) && (
                <div className="resume-paper-section">
                  <h3>
                    PROJECTS
                  </h3>

                  {resume.projects.map(
                    (project, index) => {
                      if (
                        !project.title &&
                        !project.description &&
                        !project.technologies
                      ) {
                        return null;
                      }

                      return (
                        <div
                          className="resume-project-item"
                          key={index}
                        >
                          <div className="resume-item-heading">
                            <div>
                              <h4>
                                {project.title ||
                                  "Project"}
                              </h4>

                              {project.technologies && (
                                <strong>
                                  {project.technologies}
                                </strong>
                              )}
                            </div>

                            {project.link && (
                              <span className="project-link">
                                {project.link}
                              </span>
                            )}
                          </div>

                          {project.description && (
                            <p>
                              {project.description}
                            </p>
                          )}
                        </div>
                      );
                    }
                  )}
                </div>
              )}

              {/* EDUCATION */}

              {resume.education.some(
                (item) =>
                  item.degree ||
                  item.institution ||
                  item.details
              ) && (
                <div className="resume-paper-section">
                  <h3>
                    EDUCATION
                  </h3>

                  {resume.education.map(
                    (education, index) => {
                      if (
                        !education.degree &&
                        !education.institution &&
                        !education.details
                      ) {
                        return null;
                      }

                      return (
                        <div
                          className="resume-education-item"
                          key={index}
                        >
                          <div className="resume-item-heading">
                            <div>
                              <h4>
                                {education.degree ||
                                  "Degree"}
                              </h4>

                              {education.institution && (
                                <strong>
                                  {education.institution}
                                </strong>
                              )}
                            </div>

                            <div className="resume-item-meta">
                              {education.location && (
                                <span>
                                  {education.location}
                                </span>
                              )}

                              {education.year && (
                                <span>
                                  {education.year}
                                </span>
                              )}
                            </div>
                          </div>

                          {education.details && (
                            <p>
                              {education.details}
                            </p>
                          )}
                        </div>
                      );
                    }
                  )}
                </div>
              )}

              {/* CERTIFICATIONS */}

              {resume.certifications.some(
                (item) =>
                  item.name ||
                  item.issuer ||
                  item.year
              ) && (
                <div className="resume-paper-section">
                  <h3>
                    CERTIFICATIONS
                  </h3>

                  {resume.certifications.map(
                    (certification, index) => {
                      if (
                        !certification.name &&
                        !certification.issuer &&
                        !certification.year
                      ) {
                        return null;
                      }

                      return (
                        <div
                          className="resume-certification-item"
                          key={index}
                        >
                          <strong>
                            {certification.name}
                          </strong>

                          {certification.issuer && (
                            <span>
                              {" "}
                              — {certification.issuer}
                            </span>
                          )}

                          {certification.year && (
                            <span>
                              {" "}
                              ({certification.year})
                            </span>
                          )}
                        </div>
                      );
                    }
                  )}
                </div>
              )}

            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default ResumeBuilder;