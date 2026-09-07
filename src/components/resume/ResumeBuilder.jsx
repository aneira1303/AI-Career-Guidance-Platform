import { useState } from "react";
import { Link } from "react-router-dom";

function ResumeBuilder() {

    const [resume, setResume] = useState({
        name: "",
        email: "",
        phone: "",
        location: "",
        summary: "",
        education: "",
        skills: "",
        projects: "",
        experience: "",
        certifications: "",
        achievements: "",
        linkedin: "",
        github: ""
    });

    const [generated, setGenerated] =
        useState(false);


    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;

        setResume({
            ...resume,
            [name]: value
        });

        setGenerated(false);
    };


    const generateResume = (event) => {

        event.preventDefault();

        localStorage.setItem(
            "careerAIResume",
            JSON.stringify(resume)
        );

        setGenerated(true);
    };


    return (

        <div className="resume-page">

            <nav className="dashboard-navbar">

                <Link
                    to="/dashboard"
                    className="logo"
                >
                    CareerAI
                </Link>

                <div className="dashboard-nav-right">

                    <Link
                        to="/dashboard"
                        className="profile-nav-link"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/careers"
                        className="profile-nav-link"
                    >
                        Careers
                    </Link>

                </div>

            </nav>


            <main className="resume-builder-container">

                <div className="resume-builder-header">

                    <span className="section-badge">
                        AI RESUME BUILDER
                    </span>

                    <h1>
                        Build Your Professional Resume
                    </h1>

                    <p>
                        Create an ATS-friendly resume
                        using your education, skills,
                        projects and experience.
                    </p>

                </div>


                <div className="resume-builder-layout">


                    {/* FORM */}

                    <form
                        className="resume-form"
                        onSubmit={generateResume}
                    >

                        <section className="resume-section">

                            <h2>
                                👤 Personal Information
                            </h2>

                            <div className="resume-grid">

                                <div className="form-group">

                                    <label>
                                        Full Name
                                    </label>

                                    <input
                                        name="name"
                                        value={resume.name}
                                        onChange={handleChange}
                                        placeholder="Your full name"
                                        required
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
                                        required
                                    />

                                </div>


                                <div className="form-group">

                                    <label>
                                        Phone
                                    </label>

                                    <input
                                        name="phone"
                                        value={resume.phone}
                                        onChange={handleChange}
                                        placeholder="+91 XXXXX XXXXX"
                                    />

                                </div>


                                <div className="form-group">

                                    <label>
                                        Location
                                    </label>

                                    <input
                                        name="location"
                                        value={resume.location}
                                        onChange={handleChange}
                                        placeholder="Mumbai, India"
                                    />

                                </div>

                            </div>

                        </section>


                        <section className="resume-section">

                            <h2>
                                📝 Professional Summary
                            </h2>

                            <div className="form-group">

                                <textarea
                                    name="summary"
                                    value={resume.summary}
                                    onChange={handleChange}
                                    placeholder="Write a short professional summary..."
                                    rows="5"
                                />

                            </div>

                        </section>


                        <section className="resume-section">

                            <h2>
                                🎓 Education
                            </h2>

                            <div className="form-group">

                                <textarea
                                    name="education"
                                    value={resume.education}
                                    onChange={handleChange}
                                    placeholder="Degree | University | Year | CGPA"
                                    rows="5"
                                />

                            </div>

                        </section>


                        <section className="resume-section">

                            <h2>
                                🧠 Skills
                            </h2>

                            <div className="form-group">

                                <textarea
                                    name="skills"
                                    value={resume.skills}
                                    onChange={handleChange}
                                    placeholder="Python, Java, React, Node.js, SQL, Machine Learning..."
                                    rows="4"
                                />

                            </div>

                        </section>


                        <section className="resume-section">

                            <h2>
                                💻 Projects
                            </h2>

                            <div className="form-group">

                                <textarea
                                    name="projects"
                                    value={resume.projects}
                                    onChange={handleChange}
                                    placeholder="Project name, technologies used, description and achievements..."
                                    rows="7"
                                />

                            </div>

                        </section>


                        <section className="resume-section">

                            <h2>
                                💼 Experience
                            </h2>

                            <div className="form-group">

                                <textarea
                                    name="experience"
                                    value={resume.experience}
                                    onChange={handleChange}
                                    placeholder="Company | Role | Duration | Responsibilities"
                                    rows="6"
                                />

                            </div>

                        </section>


                        <section className="resume-section">

                            <h2>
                                🏆 Certifications
                            </h2>

                            <div className="form-group">

                                <textarea
                                    name="certifications"
                                    value={resume.certifications}
                                    onChange={handleChange}
                                    placeholder="Certification name | Issuing organization | Year"
                                    rows="4"
                                />

                            </div>

                        </section>


                        <section className="resume-section">

                            <h2>
                                🔗 Professional Links
                            </h2>

                            <div className="resume-grid">

                                <div className="form-group">

                                    <label>
                                        LinkedIn
                                    </label>

                                    <input
                                        name="linkedin"
                                        value={resume.linkedin}
                                        onChange={handleChange}
                                        placeholder="LinkedIn profile"
                                    />

                                </div>


                                <div className="form-group">

                                    <label>
                                        GitHub
                                    </label>

                                    <input
                                        name="github"
                                        value={resume.github}
                                        onChange={handleChange}
                                        placeholder="GitHub profile"
                                    />

                                </div>

                            </div>

                        </section>


                        <button
                            type="submit"
                            className="primary-btn resume-generate-btn"
                        >
                            ✨ Generate Resume
                        </button>


                        {generated && (

                            <Link
                                to="/resume-analysis"
                                className="secondary-btn"
                            >
                                Analyze Resume →
                            </Link>

                        )}

                    </form>


                    {/* PREVIEW */}

                    <div className="resume-preview-wrapper">

                        <div className="resume-preview">

                            <h1>
                                {resume.name ||
                                    "Your Name"}
                            </h1>

                            <p className="resume-contact">

                                {resume.email ||
                                    "email@example.com"}

                                {resume.phone &&
                                    ` | ${resume.phone}`}

                                {resume.location &&
                                    ` | ${resume.location}`}

                            </p>


                            <div className="resume-preview-section">

                                <h3>
                                    PROFESSIONAL SUMMARY
                                </h3>

                                <p>
                                    {resume.summary ||
                                        "Your professional summary will appear here."}
                                </p>

                            </div>


                            <div className="resume-preview-section">

                                <h3>
                                    EDUCATION
                                </h3>

                                <p>
                                    {resume.education ||
                                        "Your education details will appear here."}
                                </p>

                            </div>


                            <div className="resume-preview-section">

                                <h3>
                                    SKILLS
                                </h3>

                                <p>
                                    {resume.skills ||
                                        "Your skills will appear here."}
                                </p>

                            </div>


                            <div className="resume-preview-section">

                                <h3>
                                    PROJECTS
                                </h3>

                                <p>
                                    {resume.projects ||
                                        "Your projects will appear here."}
                                </p>

                            </div>


                            <div className="resume-preview-section">

                                <h3>
                                    EXPERIENCE
                                </h3>

                                <p>
                                    {resume.experience ||
                                        "Your experience will appear here."}
                                </p>

                            </div>


                            <div className="resume-preview-section">

                                <h3>
                                    CERTIFICATIONS
                                </h3>

                                <p>
                                    {resume.certifications ||
                                        "Your certifications will appear here."}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </main>

        </div>

    );
}

export default ResumeBuilder;