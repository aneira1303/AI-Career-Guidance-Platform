import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "./ResumeAnalyzer.css";

/*
  PDF.js worker
  This allows the browser to read PDF files.
*/
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [analysis, setAnalysis] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* =========================================================
     COMMON SKILLS
  ========================================================= */

  const skillsDatabase = [
    "JavaScript",
    "TypeScript",
    "React",
    "React.js",
    "Angular",
    "Vue",
    "Node.js",
    "Express",
    "Python",
    "Java",
    "C++",
    "C#",
    "Kotlin",
    "PHP",
    "HTML",
    "CSS",
    "SQL",
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "AWS",
    "Azure",
    "GCP",
    "Docker",
    "Kubernetes",
    "Git",
    "GitHub",
    "REST API",
    "GraphQL",
    "Machine Learning",
    "Deep Learning",
    "Artificial Intelligence",
    "AI",
    "NLP",
    "LLM",
    "Data Science",
    "Data Analysis",
    "Power BI",
    "Tableau",
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "Pandas",
    "NumPy",
    "Figma",
    "Agile",
    "Scrum",
    "Jira",
    "DevOps",
    "CI/CD",
    "Linux",
    "Cybersecurity",
    "Cloud Computing",
  ];

  /* =========================================================
     IMPORTANT RESUME SECTIONS
  ========================================================= */

  const sectionKeywords = {
    contact: [
      "email",
      "phone",
      "mobile",
      "linkedin",
      "github",
    ],

    summary: [
      "summary",
      "professional summary",
      "profile",
      "objective",
      "career objective",
    ],

    experience: [
      "experience",
      "work experience",
      "professional experience",
      "employment",
      "internship",
      "internships",
    ],

    education: [
      "education",
      "academic",
      "qualification",
      "degree",
      "university",
      "college",
    ],

    skills: [
      "skills",
      "technical skills",
      "core skills",
      "technologies",
      "technical expertise",
    ],

    projects: [
      "projects",
      "academic projects",
      "personal projects",
      "key projects",
    ],

    certifications: [
      "certifications",
      "certificates",
      "licenses",
    ],

    achievements: [
      "achievements",
      "awards",
      "honors",
      "accomplishments",
    ],
  };

  /* =========================================================
     HANDLE FILE SELECTION
  ========================================================= */

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];

    setError("");
    setAnalysis(null);
    setResumeText("");

    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (selectedFile.type !== "application/pdf") {
      setError("Please upload a PDF resume.");
      setFile(null);
      return;
    }

    const maxSize = 10 * 1024 * 1024;

    if (selectedFile.size > maxSize) {
      setError("PDF size must be less than 10 MB.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  /* =========================================================
     EXTRACT TEXT FROM PDF
  ========================================================= */

  const extractPdfText = async (pdfFile) => {
    const arrayBuffer = await pdfFile.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({
      data: arrayBuffer,
    }).promise;

    let completeText = "";

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);

      const textContent = await page.getTextContent();

      const pageText = textContent.items
        .map((item) => item.str)
        .join(" ");

      completeText += `\n${pageText}`;
    }

    return completeText
      .replace(/\s+/g, " ")
      .trim();
  };

  /* =========================================================
     DETECT SECTION
  ========================================================= */

  const detectSection = (text, keywords) => {
    const lowerText = text.toLowerCase();

    return keywords.some((keyword) =>
      lowerText.includes(keyword.toLowerCase())
    );
  };

  /* =========================================================
     DETECT SKILLS
  ========================================================= */

  const detectSkills = (text) => {
    const lowerText = text.toLowerCase();

    const foundSkills = [];

    skillsDatabase.forEach((skill) => {
      if (lowerText.includes(skill.toLowerCase())) {
        if (!foundSkills.includes(skill)) {
          foundSkills.push(skill);
        }
      }
    });

    return foundSkills;
  };

  /* =========================================================
     ATS ANALYSIS
  ========================================================= */

  const calculateATSScore = ({
    text,
    sections,
    skills,
  }) => {
    let score = 0;

    const wordCount = text
      .split(/\s+/)
      .filter(Boolean).length;

    /*
      Contact information
    */
    if (sections.contact) {
      score += 10;
    }

    /*
      Summary
    */
    if (sections.summary) {
      score += 10;
    }

    /*
      Experience
    */
    if (sections.experience) {
      score += 15;
    }

    /*
      Education
    */
    if (sections.education) {
      score += 10;
    }

    /*
      Skills
    */
    if (sections.skills) {
      score += 15;
    }

    /*
      Projects
    */
    if (sections.projects) {
      score += 10;
    }

    /*
      Certifications
    */
    if (sections.certifications) {
      score += 5;
    }

    /*
      Achievements
    */
    if (sections.achievements) {
      score += 5;
    }

    /*
      Skills diversity
    */
    if (skills.length >= 5) {
      score += 5;
    }

    if (skills.length >= 10) {
      score += 5;
    }

    /*
      Resume length
    */
    if (wordCount >= 250 && wordCount <= 1500) {
      score += 5;
    }

    return Math.min(score, 100);
  };

  /* =========================================================
     GENERATE SUGGESTIONS
  ========================================================= */

  const generateSuggestions = ({
    sections,
    skills,
    text,
  }) => {
    const suggestions = [];

    if (!sections.contact) {
      suggestions.push(
        "Add clear contact information such as email, phone, LinkedIn and GitHub."
      );
    }

    if (!sections.summary) {
      suggestions.push(
        "Add a concise professional summary describing your experience, strengths and career goal."
      );
    }

    if (!sections.experience) {
      suggestions.push(
        "Add an Experience or Internship section with measurable achievements."
      );
    }

    if (!sections.education) {
      suggestions.push(
        "Add your education details including degree, institution and graduation year."
      );
    }

    if (!sections.skills) {
      suggestions.push(
        "Add a dedicated Technical Skills section using job-relevant keywords."
      );
    }

    if (!sections.projects) {
      suggestions.push(
        "Add 2–4 relevant projects and mention technologies, your contribution and outcomes."
      );
    }

    if (!sections.certifications) {
      suggestions.push(
        "Consider adding relevant certifications if you have completed any."
      );
    }

    if (!sections.achievements) {
      suggestions.push(
        "Add achievements, awards or measurable accomplishments where relevant."
      );
    }

    if (skills.length < 5) {
      suggestions.push(
        "Include more relevant technical and professional skills that match your target jobs."
      );
    }

    if (text.length < 1200) {
      suggestions.push(
        "Your resume appears short. Add relevant projects, experience, achievements or technical details."
      );
    }

    /*
      Detect weak action language
    */

    const weakWords = [
      "responsible for",
      "worked on",
      "helped with",
      "did",
    ];

    const hasWeakLanguage = weakWords.some((word) =>
      text.toLowerCase().includes(word)
    );

    if (hasWeakLanguage) {
      suggestions.push(
        "Replace generic phrases such as 'worked on' or 'responsible for' with strong action verbs and measurable results."
      );
    }

    /*
      Numbers and metrics
    */

    const hasNumbers = /\b\d+%|\b\d+\+|\b\d+\s?(users|projects|clients|customers)\b/i.test(
      text
    );

    if (!hasNumbers) {
      suggestions.push(
        "Add measurable results such as percentages, performance improvements, users, revenue, time saved or project scale."
      );
    }

    return suggestions;
  };

  /* =========================================================
     ANALYZE RESUME
  ========================================================= */

  const analyzeResume = async () => {
    if (!file) {
      setError("Please upload a PDF resume first.");
      return;
    }

    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const extractedText = await extractPdfText(file);

      if (!extractedText || extractedText.length < 50) {
        throw new Error(
          "No readable text was found in this PDF. If this is a scanned/image-only resume, OCR is required."
        );
      }

      setResumeText(extractedText);

      const sections = {
        contact: detectSection(
          extractedText,
          sectionKeywords.contact
        ),

        summary: detectSection(
          extractedText,
          sectionKeywords.summary
        ),

        experience: detectSection(
          extractedText,
          sectionKeywords.experience
        ),

        education: detectSection(
          extractedText,
          sectionKeywords.education
        ),

        skills: detectSection(
          extractedText,
          sectionKeywords.skills
        ),

        projects: detectSection(
          extractedText,
          sectionKeywords.projects
        ),

        certifications: detectSection(
          extractedText,
          sectionKeywords.certifications
        ),

        achievements: detectSection(
          extractedText,
          sectionKeywords.achievements
        ),
      };

      const skills = detectSkills(extractedText);

      const wordCount = extractedText
        .split(/\s+/)
        .filter(Boolean).length;

      const characterCount = extractedText.length;

      const atsScore = calculateATSScore({
        text: extractedText,
        sections,
        skills,
      });

      const suggestions = generateSuggestions({
        sections,
        skills,
        text: extractedText,
      });

      const presentSections = Object.values(sections).filter(
        Boolean
      ).length;

      const totalSections =
        Object.keys(sections).length;

      const analysisResult = {
        atsScore,

        wordCount,

        characterCount,

        pageEstimate: Math.max(
          1,
          Math.ceil(wordCount / 500)
        ),

        skills,

        sections,

        presentSections,

        totalSections,

        suggestions,

        fileName: file.name,

        fileSize: (
          file.size /
          1024 /
          1024
        ).toFixed(2),
      };

      setAnalysis(analysisResult);
    } catch (err) {
      console.error("Resume analysis error:", err);

      setError(
        err.message ||
          "Unable to analyze the uploaded resume."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     RESET
  ========================================================= */

  const resetAnalyzer = () => {
    setFile(null);
    setResumeText("");
    setAnalysis(null);
    setError("");

    const input =
      document.getElementById("resume-upload");

    if (input) {
      input.value = "";
    }
  };

  /* =========================================================
     DOWNLOAD ANALYSIS REPORT
  ========================================================= */

  const downloadReport = () => {
    if (!analysis) {
      return;
    }

    const report = `
CAREERAI RESUME ANALYSIS REPORT
================================

Resume:
${analysis.fileName}

ATS SCORE:
${analysis.atsScore}/100

RESUME STATISTICS
-----------------
Words: ${analysis.wordCount}
Characters: ${analysis.characterCount}
Estimated Pages: ${analysis.pageEstimate}

DETECTED SKILLS
---------------
${analysis.skills.length > 0
  ? analysis.skills.join(", ")
  : "No recognized skills detected."}

RESUME SECTIONS
---------------
${Object.entries(analysis.sections)
  .map(
    ([section, present]) =>
      `${section.toUpperCase()}: ${
        present ? "Present" : "Missing"
      }`
  )
  .join("\n")}

IMPROVEMENT SUGGESTIONS
-----------------------
${
  analysis.suggestions.length > 0
    ? analysis.suggestions
        .map(
          (suggestion, index) =>
            `${index + 1}. ${suggestion}`
        )
        .join("\n")
    : "No major suggestions."
}

Generated by CareerAI
`;

    const blob = new Blob([report], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "CareerAI-Resume-Analysis.txt";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  /* =========================================================
     SCORE LABEL
  ========================================================= */

  const getScoreLabel = (score) => {
    if (score >= 85) {
      return "Excellent";
    }

    if (score >= 70) {
      return "Good";
    }

    if (score >= 50) {
      return "Needs Improvement";
    }

    return "Needs Major Improvement";
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="resume-analyzer-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="resume-analyzer-header">

        <div>
          <span className="resume-analyzer-badge">
            CAREERAI
          </span>

          <h1>
            Resume Analyzer
          </h1>

          <p>
            Upload your PDF resume and analyze its
            structure, skills, keywords and ATS readiness.
          </p>
        </div>

      </header>

      {/* =====================================================
          UPLOAD CARD
      ===================================================== */}

      <section className="resume-upload-card">

        <div className="upload-icon">
          📄
        </div>

        <h2>
          Upload Your Resume
        </h2>

        <p>
          Upload a PDF resume up to 10 MB.
        </p>

        <label
          htmlFor="resume-upload"
          className="upload-label"
        >
          Choose PDF Resume
        </label>

        <input
          id="resume-upload"
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileChange}
          hidden
        />

        {file && (
          <div className="selected-file">

            <div>
              <strong>
                {file.name}
              </strong>

              <span>
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </span>
            </div>

            <button
              type="button"
              onClick={resetAnalyzer}
            >
              Remove
            </button>

          </div>
        )}

        {error && (
          <div className="analyzer-error">
            ⚠ {error}
          </div>
        )}

        <button
          type="button"
          className="analyze-button"
          onClick={analyzeResume}
          disabled={!file || loading}
        >
          {loading
            ? "Analyzing Resume..."
            : "🔎 Analyze Resume"}
        </button>

      </section>

      {/* =====================================================
          ANALYSIS RESULTS
      ===================================================== */}

      {analysis && (
        <section className="analysis-results">

          {/* SCORE */}

          <div className="analysis-score-card">

            <div>
              <span className="result-label">
                ATS READINESS
              </span>

              <h2>
                {getScoreLabel(analysis.atsScore)}
              </h2>

              <p>
                Your resume received an ATS readiness
                score based on its structure, sections,
                skills and content.
              </p>
            </div>

            <div className="score-circle">
              <strong>
                {analysis.atsScore}
              </strong>

              <span>
                / 100
              </span>
            </div>

          </div>

          {/* STATISTICS */}

          <div className="analysis-stats">

            <div className="analysis-stat">
              <span>
                📝
              </span>

              <strong>
                {analysis.wordCount}
              </strong>

              <small>
                Words
              </small>
            </div>

            <div className="analysis-stat">
              <span>
                📄
              </span>

              <strong>
                {analysis.pageEstimate}
              </strong>

              <small>
                Est. Pages
              </small>
            </div>

            <div className="analysis-stat">
              <span>
                🧠
              </span>

              <strong>
                {analysis.skills.length}
              </strong>

              <small>
                Skills Found
              </small>
            </div>

            <div className="analysis-stat">
              <span>
                ✓
              </span>

              <strong>
                {analysis.presentSections}
                /
                {analysis.totalSections}
              </strong>

              <small>
                Sections
              </small>
            </div>

          </div>

          {/* TWO COLUMN RESULTS */}

          <div className="analysis-grid">

            {/* SECTIONS */}

            <div className="analysis-card">

              <div className="analysis-card-header">
                <div>
                  <span>
                    STRUCTURE
                  </span>

                  <h2>
                    Resume Sections
                  </h2>
                </div>
              </div>

              <div className="section-check-list">

                {Object.entries(
                  analysis.sections
                ).map(
                  ([section, present]) => (
                    <div
                      className="section-check-item"
                      key={section}
                    >
                      <span
                        className={
                          present
                            ? "check-icon present"
                            : "check-icon missing"
                        }
                      >
                        {present ? "✓" : "!"}
                      </span>

                      <span>
                        {section
                          .charAt(0)
                          .toUpperCase() +
                          section.slice(1)}
                      </span>

                      <strong
                        className={
                          present
                            ? "present-text"
                            : "missing-text"
                        }
                      >
                        {present
                          ? "Present"
                          : "Missing"}
                      </strong>
                    </div>
                  )
                )}

              </div>
            </div>

            {/* SKILLS */}

            <div className="analysis-card">

              <div className="analysis-card-header">
                <div>
                  <span>
                    KEYWORDS
                  </span>

                  <h2>
                    Detected Skills
                  </h2>
                </div>
              </div>

              {analysis.skills.length > 0 ? (
                <div className="detected-skills">

                  {analysis.skills.map(
                    (skill) => (
                      <span
                        key={skill}
                      >
                        {skill}
                      </span>
                    )
                  )}

                </div>
              ) : (
                <div className="empty-result">
                  No recognized skills found.
                </div>
              )}

            </div>

          </div>

          {/* SUGGESTIONS */}

          <div className="analysis-card suggestions-card">

            <div className="analysis-card-header">
              <div>
                <span>
                  CAREERAI INSIGHTS
                </span>

                <h2>
                  Resume Improvements
                </h2>
              </div>
            </div>

            {analysis.suggestions.length > 0 ? (
              <div className="suggestions-list">

                {analysis.suggestions.map(
                  (suggestion, index) => (
                    <div
                      className="suggestion-item"
                      key={index}
                    >
                      <span>
                        {index + 1}
                      </span>

                      <p>
                        {suggestion}
                      </p>
                    </div>
                  )
                )}

              </div>
            ) : (
              <div className="success-message">
                ✓ Your resume has a strong basic structure.
              </div>
            )}

          </div>

          {/* EXTRACTED TEXT */}

          <div className="analysis-card">

            <div className="analysis-card-header">
              <div>
                <span>
                  PDF EXTRACTION
                </span>

                <h2>
                  Extracted Resume Text
                </h2>
              </div>
            </div>

            <div className="extracted-text">
              {resumeText}
            </div>

          </div>

          {/* ACTIONS */}

          <div className="analysis-actions">

            <button
              type="button"
              className="secondary-analysis-button"
              onClick={resetAnalyzer}
            >
              ↻ Analyze Another Resume
            </button>

            <button
              type="button"
              className="download-analysis-button"
              onClick={downloadReport}
            >
              ↓ Download Analysis Report
            </button>

          </div>

        </section>
      )}

      {/* =====================================================
          INFORMATION
      ===================================================== */}

      <section className="analyzer-info">

        <div>
          <strong>
            🔒 Your Resume
          </strong>

          <p>
            PDF text extraction is performed in your
            browser by this page. This component does not
            automatically upload the PDF to your server.
          </p>
        </div>

        <div>
          <strong>
            🤖 CareerAI Analysis
          </strong>

          <p>
            The current analyzer checks resume structure,
            common skills, keywords, content length and
            common improvement areas.
          </p>
        </div>

      </section>

    </div>
  );
}

export default ResumeAnalyzer;