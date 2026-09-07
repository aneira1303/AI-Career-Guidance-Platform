# 🚀 AI Career Guidance Platform

An **AI-powered Career Guidance Platform** designed to help students and job seekers explore career opportunities, identify skill gaps, build and analyze resumes, assess their knowledge, follow personalized learning roadmaps, discover jobs, and interact with an AI career assistant.

---

## ✨ Features

### 🎯 Career Recommendations

- Career suggestions based on user interests and skills
- Career descriptions and requirements
- Salary information
- Demand-level indicators
- Career path guidance

### 🧠 Skill Gap Analysis

- Analyze existing skills
- Identify missing skills
- Compare skills with career requirements
- Get recommendations for improving skill proficiency

### 📝 Resume Builder

- Create a professional resume
- Add education, experience, projects, and skills
- Modern resume preview
- Download resume as PDF

### 🔍 Resume Analyzer

- Upload a PDF resume
- Extract resume content
- Analyze important resume sections
- Identify technical skills
- Generate an ATS-style score
- Provide improvement suggestions
- Generate an analysis report

### 📊 Assessments

- Career-specific assessments
- Full Stack Developer assessment
- Data Scientist assessment
- Software Engineer assessment
- Timed assessments
- Question navigation
- Mark questions for review
- Instant explanations
- Skill-wise performance analysis
- Strength and weakness detection
- Assessment history
- XP and learning streaks

### 🗺️ Learning Roadmap

- Personalized career learning paths
- Stage-based learning
- Skill completion tracking
- Learning progress tracking
- Learning streak
- Milestones and challenges
- Practical projects
- Learning resources
- Personal notes
- Achievement system

### 💼 Job Matching

- Search jobs
- Filter by location
- Filter by job type
- Job match percentage
- Save jobs
- Apply links
- Career-based job recommendations

### 🤖 AI Career Assistant

- Career-related questions
- Skill guidance
- Resume guidance
- Interview preparation
- Learning recommendations
- Quick career questions

### 👨‍💼 Admin Dashboard

- Admin authentication
- User management
- Career management
- Skill management
- Career recommendations
- Reports
- System settings

---

# 🛠️ Technology Stack

## 🎨 Frontend

- **React.js**
- **Vite**
- **React Router**
- **HTML5**
- **CSS3**
- **JavaScript**
- **html2pdf.js**
- **pdfjs-dist**

## ⚙️ Backend

- **Node.js**
- **Express.js**
- **REST API**
- **JWT Authentication**
- **CORS**

## 🗄️ Database

- **MySQL**
- **MySQL Workbench**
- **phpMyAdmin**

## 🔧 Development Tools

- **Visual Studio Code**
- **Android Studio**
- **Git**
- **GitHub**

---

# 📂 Project Structure

```text
AI-Career-Guidance-Platform/
│
├── client/
│   ├── src/
│   │   ├── admin/
│   │   │   ├── components/
│   │   │   └── pages/
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Careers.jsx
│   │   │   ├── ResumeBuilder.jsx
│   │   │   ├── ResumeAnalyzer.jsx
│   │   │   ├── SkillGap.jsx
│   │   │   ├── Assessments.jsx
│   │   │   ├── LearningRoadmap.jsx
│   │   │   ├── Jobs.jsx
│   │   │   └── Assistant.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server/
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   └── userModel.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── careerRoutes.js
│   │   ├── skillRoutes.js
│   │   └── adminRoutes.js
│   │
│   ├── app.js
│   ├── db.js
│   └── package.json
│
├── .gitignore
└── README.md
