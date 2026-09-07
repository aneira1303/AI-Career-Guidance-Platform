import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const storedUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [profile, setProfile] = useState({
    name: storedUser.name || "",
    email: storedUser.email || "",
    education: "",
    skills: "",
    interests: "",
    certifications: "",
    projects: "",
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem("careerProfile");

    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch (error) {
        console.error("Invalid profile data:", error);
      }
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSaved(false);
  };

  const handleSave = (event) => {
    event.preventDefault();

    localStorage.setItem(
      "careerProfile",
      JSON.stringify(profile)
    );

    setSaved(true);
  };

  return (
    <div style={styles.page}>

      <header style={styles.header}>
        <button
          type="button"
          style={styles.logo}
          onClick={() => navigate("/dashboard")}
        >
          CareerAI
        </button>

        <button
          type="button"
          style={styles.backButton}
          onClick={() => navigate("/dashboard")}
        >
          ← Dashboard
        </button>
      </header>

      <main style={styles.container}>

        <div style={styles.titleSection}>
          <h1 style={styles.title}>
            My Profile
          </h1>

          <p style={styles.subtitle}>
            Manage your education, skills, interests,
            certifications and projects.
          </p>
        </div>

        <form
          onSubmit={handleSave}
          style={styles.card}
        >

          <div style={styles.grid}>

            <div style={styles.field}>
              <label>Name</label>

              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>

            <div style={styles.field}>
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={profile.email}
                disabled
              />
            </div>

            <div style={styles.field}>
              <label>Education</label>

              <input
                type="text"
                name="education"
                value={profile.education}
                onChange={handleChange}
                placeholder="B.Tech Computer Science"
              />
            </div>

            <div style={styles.field}>
              <label>Skills</label>

              <input
                type="text"
                name="skills"
                value={profile.skills}
                onChange={handleChange}
                placeholder="React, JavaScript, Python"
              />
            </div>

            <div style={styles.field}>
              <label>Interests</label>

              <input
                type="text"
                name="interests"
                value={profile.interests}
                onChange={handleChange}
                placeholder="AI, Web Development"
              />
            </div>

            <div style={styles.field}>
              <label>Certifications</label>

              <input
                type="text"
                name="certifications"
                value={profile.certifications}
                onChange={handleChange}
                placeholder="AWS, Google, Microsoft"
              />
            </div>

            <div
              style={{
                ...styles.field,
                gridColumn: "1 / -1",
              }}
            >
              <label>Projects</label>

              <textarea
                name="projects"
                value={profile.projects}
                onChange={handleChange}
                placeholder="Describe your projects..."
                rows="6"
              />
            </div>

          </div>

          <div style={styles.actions}>

            {saved && (
              <span style={styles.success}>
                ✓ Profile saved successfully
              </span>
            )}

            <button
              type="submit"
              style={styles.primaryButton}
            >
              Save Profile
            </button>

          </div>

        </form>

      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#faf8f3",
    color: "#071b33",
  },

  header: {
    height: "90px",
    padding: "0 52px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#faf8f3",
    borderBottom: "1px solid #e5dccd",
    boxSizing: "border-box",
  },

  logo: {
    border: "none",
    background: "transparent",
    color: "#2c63ae",
    fontSize: "32px",
    fontWeight: "800",
    cursor: "pointer",
  },

  backButton: {
    border: "none",
    background: "#fbe9e7",
    color: "#ad3428",
    padding: "12px 20px",
    borderRadius: "10px",
    fontWeight: "700",
    cursor: "pointer",
  },

  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "45px 30px",
  },

  titleSection: {
    marginBottom: "28px",
  },

  title: {
    margin: 0,
    fontSize: "34px",
    fontWeight: "800",
    color: "#071b33",
  },

  subtitle: {
    color: "#786c60",
    fontSize: "17px",
    marginTop: "10px",
  },

  card: {
    background: "#ffffff",
    padding: "32px",
    borderRadius: "20px",
    border: "1px solid #e5dccf",
    boxShadow: "0 8px 28px rgba(57,45,31,.06)",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "22px",
  },

  field: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  actions: {
    marginTop: "28px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "20px",
  },

  success: {
    color: "#16803c",
    fontWeight: "600",
  },

  primaryButton: {
    border: "none",
    background: "linear-gradient(135deg,#4169ad,#bd413d)",
    color: "#ffffff",
    padding: "14px 25px",
    borderRadius: "10px",
    fontWeight: "700",
    cursor: "pointer",
  },
};

export default Profile;