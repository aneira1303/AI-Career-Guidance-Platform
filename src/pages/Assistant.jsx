import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Assistant.css";

const quickQuestions = [
  "What career is best for my skills?",
  "How can I improve my resume?",
  "What skills should I learn next?",
  "How should I prepare for interviews?",
];

function Assistant() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text:
        "Hello! I'm your CareerAI Assistant. I can help you with careers, skills, resumes, interviews and learning. What would you like to know?",
    },
  ]);

  const generateResponse = (question) => {
    const text = question.toLowerCase();

    if (
      text.includes("career") ||
      text.includes("job")
    ) {
      return (
        "To choose the right career, consider your technical skills, interests, education and long-term goals. Start with Career Recommendations and Skill Gap Analysis to identify suitable career paths."
      );
    }

    if (
      text.includes("resume") ||
      text.includes("cv")
    ) {
      return (
        "To improve your resume, use a clear professional summary, measurable achievements, relevant technical skills and strong project descriptions. Keep the format simple and ATS-friendly."
      );
    }

    if (
      text.includes("skill") ||
      text.includes("learn")
    ) {
      return (
        "Start with the skills required for your target career. Learn the fundamentals first, then build practical projects to demonstrate your knowledge."
      );
    }

    if (
      text.includes("interview") ||
      text.includes("prepare")
    ) {
      return (
        "For interview preparation, practice technical fundamentals, Data Structures and Algorithms, project-based questions, system design and behavioral questions."
      );
    }

    if (
      text.includes("project") ||
      text.includes("portfolio")
    ) {
      return (
        "A strong portfolio should contain 2–4 practical projects. Explain the problem, technologies used, your contribution and measurable results for every project."
      );
    }

    return (
      "That's a great career question. Try using your Profile, Resume Analyzer, Skill Gap Analysis and Learning Roadmap together to create a stronger career plan."
    );
  };

  const sendMessage = (textToSend) => {
    const currentMessage =
      textToSend || message.trim();

    if (!currentMessage) {
      return;
    }

    const userMessage = {
      sender: "user",
      text: currentMessage,
    };

    const aiMessage = {
      sender: "ai",
      text: generateResponse(currentMessage),
    };

    setMessages((previous) => [
      ...previous,
      userMessage,
      aiMessage,
    ]);

    setMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  return (
    <div className="assistant-page">

      {/* =========================================
          NAVBAR
      ========================================= */}

      <nav className="assistant-navbar">

        <Link
          to="/dashboard"
          className="assistant-logo"
        >
          Career<span>AI</span>
        </Link>

        <div className="assistant-nav-links">

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


      {/* =========================================
          MAIN CONTENT
      ========================================= */}

      <main className="assistant-container">

        {/* HEADER */}

        <section className="assistant-header">

          <span className="assistant-badge">
            AI CAREER INTELLIGENCE
          </span>

          <h1>
            AI Career Assistant
          </h1>

          <p>
            Your intelligent career companion for
            career planning, skills, resumes,
            interviews and learning.
          </p>

        </section>


        {/* =========================================
            ASSISTANT LAYOUT
        ========================================= */}

        <section className="assistant-layout">

          {/* SIDEBAR */}

          <aside className="assistant-sidebar">

            <div className="assistant-profile">

              <div className="assistant-avatar">
                🤖
              </div>

              <div>
                <strong>
                  CareerAI Assistant
                </strong>

                <span>
                  ● Online
                </span>
              </div>

            </div>


            <div className="assistant-sidebar-title">
              QUICK ACTIONS
            </div>


            <Link
              to="/careers"
              className="assistant-side-action"
            >
              🎯 Career Recommendations
            </Link>

            <Link
              to="/skill-gap"
              className="assistant-side-action"
            >
              🔍 Analyze Skill Gap
            </Link>

            <Link
              to="/resume-analyzer"
              className="assistant-side-action"
            >
              📄 Analyze Resume
            </Link>

            <Link
              to="/roadmap"
              className="assistant-side-action"
            >
              📚 Learning Roadmap
            </Link>

            <Link
              to="/jobs"
              className="assistant-side-action"
            >
              💼 Find Jobs
            </Link>


            <div className="assistant-help-card">

              <span>
                💡
              </span>

              <strong>
                Career Tip
              </strong>

              <p>
                Keep your resume and skills
                updated as you complete new
                projects.
              </p>

            </div>

          </aside>


          {/* =========================================
              CHAT
          ========================================= */}

          <div className="assistant-chat">

            {/* CHAT HEADER */}

            <div className="chat-header">

              <div className="chat-header-icon">
                🤖
              </div>

              <div>

                <h2>
                  CareerAI Assistant
                </h2>

                <span>
                  Ask me anything about your career
                </span>

              </div>

            </div>


            {/* MESSAGES */}

            <div className="chat-messages">

              {messages.map((item, index) => (

                <div
                  key={index}
                  className={`chat-message ${
                    item.sender === "user"
                      ? "user-message"
                      : "ai-message"
                  }`}
                >

                  <div className="message-avatar">
                    {item.sender === "user"
                      ? "👤"
                      : "🤖"}
                  </div>

                  <div className="message-content">
                    {item.text}
                  </div>

                </div>

              ))}

            </div>


            {/* QUICK QUESTIONS */}

            <div className="quick-questions">

              <span>
                TRY ASKING
              </span>

              <div>

                {quickQuestions.map(
                  (question) => (

                    <button
                      type="button"
                      key={question}
                      onClick={() =>
                        sendMessage(question)
                      }
                    >
                      {question}
                    </button>

                  )
                )}

              </div>

            </div>


            {/* MESSAGE INPUT */}

            <form
              className="assistant-input"
              onSubmit={handleSubmit}
            >

              <input
                type="text"
                value={message}
                onChange={(event) =>
                  setMessage(event.target.value)
                }
                placeholder="Ask about careers, skills, resumes or interviews..."
              />

              <button type="submit">
                Send →
              </button>

            </form>


            <div className="assistant-disclaimer">
              CareerAI provides guidance for
              educational and career-planning purposes.
            </div>

          </div>

        </section>


        {/* =========================================
            FEATURES
        ========================================= */}

        <section className="assistant-features">

          <div className="assistant-feature">

            <span>
              🎯
            </span>

            <h3>
              Career Guidance
            </h3>

            <p>
              Explore careers based on your
              interests, education and skills.
            </p>

          </div>


          <div className="assistant-feature">

            <span>
              🧠
            </span>

            <h3>
              Skill Development
            </h3>

            <p>
              Identify the skills you need to
              develop for your target career.
            </p>

          </div>


          <div className="assistant-feature">

            <span>
              📄
            </span>

            <h3>
              Resume Guidance
            </h3>

            <p>
              Improve your resume structure,
              content and ATS readiness.
            </p>

          </div>


          <div className="assistant-feature">

            <span>
              💼
            </span>

            <h3>
              Interview Preparation
            </h3>

            <p>
              Prepare for technical and
              behavioral interviews.
            </p>

          </div>

        </section>

      </main>

    </div>
  );
}

/* IMPORTANT */
export default Assistant;