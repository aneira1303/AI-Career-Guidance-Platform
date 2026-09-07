import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Assessments.css";

const assessmentData = {
  Technical: {
    icon: "💻",
    description:
      "Test your programming, development and technical problem-solving skills.",
    color: "blue",
    questions: [
      {
        question: "Which data structure follows the LIFO principle?",
        options: [
          "Queue",
          "Stack",
          "Linked List",
          "Tree",
        ],
        answer: "Stack",
      },
      {
        question:
          "Which HTTP status code indicates a successful request?",
        options: [
          "200",
          "404",
          "500",
          "301",
        ],
        answer: "200",
      },
      {
        question:
          "Which language is primarily used for React development?",
        options: [
          "JavaScript",
          "SQL",
          "Python",
          "C",
        ],
        answer: "JavaScript",
      },
      {
        question:
          "Which SQL command is used to retrieve data?",
        options: [
          "INSERT",
          "UPDATE",
          "SELECT",
          "DELETE",
        ],
        answer: "SELECT",
      },
      {
        question:
          "What does API stand for?",
        options: [
          "Application Programming Interface",
          "Advanced Program Integration",
          "Application Process Integration",
          "Automated Programming Interface",
        ],
        answer: "Application Programming Interface",
      },
    ],
  },

  Aptitude: {
    icon: "🧮",
    description:
      "Measure your logical reasoning, numerical ability and problem-solving skills.",
    color: "red",
    questions: [
      {
        question:
          "If 5 workers complete a task in 10 days, how many days will 10 workers take?",
        options: [
          "2 days",
          "5 days",
          "10 days",
          "20 days",
        ],
        answer: "5 days",
      },
      {
        question:
          "What is 25% of 240?",
        options: [
          "40",
          "50",
          "60",
          "80",
        ],
        answer: "60",
      },
      {
        question:
          "Find the next number: 2, 4, 8, 16, ?",
        options: [
          "20",
          "24",
          "30",
          "32",
        ],
        answer: "32",
      },
      {
        question:
          "If CAT is coded as DBU, how is DOG coded?",
        options: [
          "EPH",
          "EOG",
          "FPH",
          "DPH",
        ],
        answer: "EPH",
      },
      {
        question:
          "A train travels 60 km in 1 hour. How far will it travel in 3 hours?",
        options: [
          "120 km",
          "150 km",
          "180 km",
          "240 km",
        ],
        answer: "180 km",
      },
    ],
  },

  "Soft Skills": {
    icon: "🧠",
    description:
      "Evaluate communication, teamwork, leadership and workplace behavior.",
    color: "pink",
    questions: [
      {
        question:
          "Which is most important during effective communication?",
        options: [
          "Interrupting",
          "Active listening",
          "Speaking quickly",
          "Avoiding questions",
        ],
        answer: "Active listening",
      },
      {
        question:
          "What is the best response when receiving constructive feedback?",
        options: [
          "Ignore it",
          "Argue immediately",
          "Listen and identify improvements",
          "Blame someone else",
        ],
        answer: "Listen and identify improvements",
      },
      {
        question:
          "Which quality is important for effective teamwork?",
        options: [
          "Poor communication",
          "Collaboration",
          "Avoiding responsibility",
          "Competition within the team",
        ],
        answer: "Collaboration",
      },
      {
        question:
          "What should you do when you disagree with a teammate?",
        options: [
          "Stop communicating",
          "Discuss the issue professionally",
          "Ignore the teammate",
          "Escalate immediately",
        ],
        answer: "Discuss the issue professionally",
      },
      {
        question:
          "Which skill helps resolve workplace conflicts?",
        options: [
          "Active listening",
          "Avoidance",
          "Aggression",
          "Silence",
        ],
        answer: "Active listening",
      },
    ],
  },

  "Career Readiness": {
    icon: "🎯",
    description:
      "Measure your overall readiness for internships, jobs and professional growth.",
    color: "purple",
    questions: [
      {
        question:
          "What should you research before a job interview?",
        options: [
          "Only the salary",
          "The company and role",
          "Only the interviewer",
          "Nothing",
        ],
        answer: "The company and role",
      },
      {
        question:
          "Which document presents your professional experience?",
        options: [
          "Resume",
          "Invoice",
          "Receipt",
          "Timetable",
        ],
        answer: "Resume",
      },
      {
        question:
          "What is important when answering an interview question?",
        options: [
          "Giving unrelated answers",
          "Being clear and relevant",
          "Avoiding examples",
          "Speaking as quickly as possible",
        ],
        answer: "Being clear and relevant",
      },
      {
        question:
          "Which activity improves employability?",
        options: [
          "Avoiding projects",
          "Building practical projects",
          "Ignoring industry trends",
          "Avoiding learning",
        ],
        answer: "Building practical projects",
      },
      {
        question:
          "What should you do after completing an interview?",
        options: [
          "Send a professional follow-up",
          "Ignore the company",
          "Delete your resume",
          "Contact the interviewer repeatedly",
        ],
        answer: "Send a professional follow-up",
      },
    ],
  },
};

function Assessments() {
  const [selectedAssessment, setSelectedAssessment] =
    useState(null);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [selectedAnswer, setSelectedAnswer] =
    useState("");

  const [score, setScore] = useState(0);

  const [showResult, setShowResult] =
    useState(false);

  const [answers, setAnswers] = useState([]);

  const startAssessment = (type) => {
    setSelectedAssessment(type);
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setAnswers([]);
    setShowResult(false);
  };

  const submitAnswer = () => {
    if (!selectedAnswer) {
      return;
    }

    const questions =
      assessmentData[selectedAssessment].questions;

    const isCorrect =
      selectedAnswer ===
      questions[currentQuestion].answer;

    const newScore =
      isCorrect ? score + 1 : score;

    setScore(newScore);

    setAnswers((previousAnswers) => [
      ...previousAnswers,
      {
        question:
          questions[currentQuestion].question,

        selected: selectedAnswer,

        correct:
          questions[currentQuestion].answer,

        isCorrect,
      },
    ]);

    if (
      currentQuestion ===
      questions.length - 1
    ) {
      setShowResult(true);
      return;
    }

    setCurrentQuestion(
      (previousQuestion) =>
        previousQuestion + 1
    );

    setSelectedAnswer("");
  };

  const resetAssessment = () => {
    setSelectedAssessment(null);
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setAnswers([]);
    setShowResult(false);
  };

  const questions = selectedAssessment
    ? assessmentData[selectedAssessment].questions
    : [];

  const percentage = questions.length
    ? Math.round(
        (score / questions.length) * 100
      )
    : 0;

  const getResultMessage = () => {
    if (percentage >= 80) {
      return "Excellent performance! You are showing strong readiness in this area.";
    }

    if (percentage >= 60) {
      return "Good performance! Strengthen the areas where you made mistakes.";
    }

    return "Keep learning and practicing. Use your results to identify areas for improvement.";
  };

  /* =========================================
     RESULT SCREEN
  ========================================= */

  if (
    selectedAssessment &&
    showResult
  ) {
    return (
      <div className="assessment-page">

        <nav className="assessment-navbar">

          <Link
            to="/dashboard"
            className="assessment-logo"
          >
            Career<span>AI</span>
          </Link>

          <div className="assessment-nav-links">

            <Link to="/dashboard">
              Dashboard
            </Link>

            <Link to="/careers">
              Careers
            </Link>

            <Link to="/profile">
              Profile
            </Link>

          </div>

        </nav>


        <main className="assessment-container">

          <section className="result-card">

            <div className="result-icon">
              {percentage >= 80
                ? "🏆"
                : percentage >= 60
                ? "⭐"
                : "📚"}
            </div>

            <span className="assessment-badge">
              ASSESSMENT COMPLETE
            </span>

            <h1>
              {selectedAssessment} Assessment
            </h1>

            <p className="result-message">
              {getResultMessage()}
            </p>


            <div className="result-score">

              <div className="result-circle">

                <strong>
                  {percentage}%
                </strong>

                <span>
                  Score
                </span>

              </div>

            </div>


            <div className="result-stats">

              <div>
                <strong>
                  {score}
                </strong>

                <span>
                  Correct
                </span>
              </div>

              <div>
                <strong>
                  {questions.length - score}
                </strong>

                <span>
                  Incorrect
                </span>
              </div>

              <div>
                <strong>
                  {questions.length}
                </strong>

                <span>
                  Questions
                </span>
              </div>

            </div>


            {/* ANSWER REVIEW */}

            <div className="answer-review">

              <h2>
                Answer Review
              </h2>

              {answers.map(
                (item, index) => (
                  <div
                    className={`review-item ${
                      item.isCorrect
                        ? "review-correct"
                        : "review-wrong"
                    }`}
                    key={index}
                  >

                    <div className="review-number">
                      {index + 1}
                    </div>

                    <div className="review-content">

                      <h3>
                        {item.question}
                      </h3>

                      <p>
                        Your answer:{" "}
                        <strong>
                          {item.selected}
                        </strong>
                      </p>

                      {!item.isCorrect && (
                        <p>
                          Correct answer:{" "}
                          <strong>
                            {item.correct}
                          </strong>
                        </p>
                      )}

                    </div>

                    <span>
                      {item.isCorrect
                        ? "✓"
                        : "×"}
                    </span>

                  </div>
                )
              )}

            </div>


            <div className="result-actions">

              <button
                type="button"
                onClick={() =>
                  startAssessment(
                    selectedAssessment
                  )
                }
                className="primary-assessment-btn"
              >
                ↻ Retake Assessment
              </button>

              <button
                type="button"
                onClick={resetAssessment}
                className="secondary-assessment-btn"
              >
                ← All Assessments
              </button>

              <Link
                to="/dashboard"
                className="back-dashboard-btn"
              >
                Dashboard
              </Link>

            </div>

          </section>

        </main>

      </div>
    );
  }


  /* =========================================
     QUIZ SCREEN
  ========================================= */

  if (selectedAssessment) {

    const assessment =
      assessmentData[selectedAssessment];

    const question =
      assessment.questions[currentQuestion];

    const progress =
      ((currentQuestion + 1) /
        assessment.questions.length) *
      100;

    return (
      <div className="assessment-page">

        <nav className="assessment-navbar">

          <Link
            to="/dashboard"
            className="assessment-logo"
          >
            Career<span>AI</span>
          </Link>

          <button
            type="button"
            className="exit-assessment"
            onClick={resetAssessment}
          >
            Exit Assessment
          </button>

        </nav>


        <main className="quiz-container">

          <div className="quiz-top">

            <div>

              <span className="assessment-badge">
                {assessment.icon}{" "}
                {selectedAssessment.toUpperCase()}
              </span>

              <h1>
                {selectedAssessment} Assessment
              </h1>

            </div>

            <div className="question-count">
              Question{" "}
              <strong>
                {currentQuestion + 1}
              </strong>{" "}
              of {questions.length}
            </div>

          </div>


          {/* PROGRESS */}

          <div className="quiz-progress">

            <div
              className="quiz-progress-bar"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>


          {/* QUESTION */}

          <section className="question-card">

            <span className="question-label">
              QUESTION {currentQuestion + 1}
            </span>

            <h2>
              {question.question}
            </h2>


            <div className="answer-options">

              {question.options.map(
                (option, index) => (
                  <button
                    type="button"
                    key={option}
                    className={`answer-option ${
                      selectedAnswer === option
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      setSelectedAnswer(option)
                    }
                  >

                    <span className="option-letter">
                      {String.fromCharCode(
                        65 + index
                      )}
                    </span>

                    <span>
                      {option}
                    </span>

                    <span className="option-check">
                      {selectedAnswer === option
                        ? "✓"
                        : ""}
                    </span>

                  </button>
                )
              )}

            </div>


            <button
              type="button"
              className="submit-answer-btn"
              disabled={!selectedAnswer}
              onClick={submitAnswer}
            >
              {currentQuestion ===
              questions.length - 1
                ? "Finish Assessment"
                : "Next Question →"}
            </button>

          </section>


          <div className="quiz-tip">
            💡 Take your time and choose the
            answer that best matches the question.
          </div>

        </main>

      </div>
    );
  }


  /* =========================================
     ASSESSMENT SELECTION
  ========================================= */

  return (
    <div className="assessment-page">

      {/* NAVBAR */}

      <nav className="assessment-navbar">

        <Link
          to="/dashboard"
          className="assessment-logo"
        >
          Career<span>AI</span>
        </Link>

        <div className="assessment-nav-links">

          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/careers">
            Careers
          </Link>

          <Link to="/profile">
            Profile
          </Link>

        </div>

      </nav>


      {/* MAIN */}

      <main className="assessment-container">

        <section className="assessment-header">

          <span className="assessment-badge">
            AI CAREER INTELLIGENCE
          </span>

          <h1>
            Assessments
          </h1>

          <p>
            Test your technical, aptitude, soft
            skills and overall career readiness
            to understand where you stand and
            what you need to improve.
          </p>

        </section>


        {/* OVERVIEW */}

        <section className="assessment-overview">

          <div className="overview-icon">
            🧠
          </div>

          <div>
            <h2>
              Discover Your Career Strengths
            </h2>

            <p>
              Complete assessments to identify
              your strengths, improve your
              weaknesses and become more
              career-ready.
            </p>
          </div>

          <div className="overview-stat">

            <strong>
              4
            </strong>

            <span>
              Assessments
            </span>

          </div>

        </section>


        {/* ASSESSMENT CARDS */}

        <section className="assessment-grid">

          {Object.entries(
            assessmentData
          ).map(
            ([type, assessment]) => (

              <article
                className={`assessment-card ${assessment.color}`}
                key={type}
              >

                <div className="assessment-card-top">

                  <div className="assessment-card-icon">
                    {assessment.icon}
                  </div>

                  <span className="assessment-level">
                    5 Questions
                  </span>

                </div>


                <h2>
                  {type}
                </h2>

                <p>
                  {assessment.description}
                </p>


                <div className="assessment-card-meta">

                  <span>
                    ⏱ 5–10 min
                  </span>

                  <span>
                    📊 Instant Result
                  </span>

                </div>


                <button
                  type="button"
                  onClick={() =>
                    startAssessment(type)
                  }
                  className="start-assessment-btn"
                >
                  Start Assessment →
                </button>

              </article>

            )
          )}

        </section>


        {/* HOW IT WORKS */}

        <section className="how-assessment-works">

          <div className="how-header">

            <span className="assessment-badge">
              HOW IT WORKS
            </span>

            <h2>
              From Assessment to Career Growth
            </h2>

          </div>


          <div className="how-grid">

            <div className="how-step">

              <span>
                01
              </span>

              <div>
                🎯
              </div>

              <h3>
                Choose
              </h3>

              <p>
                Select an assessment based
                on your career goals.
              </p>

            </div>


            <div className="how-arrow">
              →
            </div>


            <div className="how-step">

              <span>
                02
              </span>

              <div>
                🧠
              </div>

              <h3>
                Assess
              </h3>

              <p>
                Answer questions designed
                to measure your abilities.
              </p>

            </div>


            <div className="how-arrow">
              →
            </div>


            <div className="how-step">

              <span>
                03
              </span>

              <div>
                📊
              </div>

              <h3>
                Analyze
              </h3>

              <p>
                Get your score and identify
                improvement areas.
              </p>

            </div>


            <div className="how-arrow">
              →
            </div>


            <div className="how-step">

              <span>
                04
              </span>

              <div>
                🚀
              </div>

              <h3>
                Improve
              </h3>

              <p>
                Use your results to build
                your career learning path.
              </p>

            </div>

          </div>

        </section>


        {/* BOTTOM CTA */}

        <section className="assessment-cta">

          <div>

            <span className="assessment-badge">
              BUILD YOUR FUTURE
            </span>

            <h2>
              Know Your Skills.
              <br />
              Improve Your Career.
            </h2>

            <p>
              Your assessment results can help
              CareerAI understand your strengths
              and recommend your next steps.
            </p>

          </div>

          <Link
            to="/skill-gap"
            className="assessment-cta-btn"
          >
            🔍 Analyze Skill Gap
          </Link>

        </section>

      </main>

    </div>
  );
}

export default Assessments;