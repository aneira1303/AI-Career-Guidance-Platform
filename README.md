AI Career Guidance Platform

An AI-powered Career Guidance Platform designed to help students and job seekers explore career opportunities, identify skill gaps, build and analyze resumes, assess their knowledge, follow personalized learning roadmaps, discover jobs, and interact with an AI career assistant.

🚀 Features
🎯 Career Recommendations
Career suggestions based on user interests and skills
Career descriptions and requirements
Salary information
Demand-level indicators
Career path guidance
🧠 Skill Gap Analysis
Analyze existing skills
Identify missing skills
Compare skills with career requirements
Get recommendations for improving skill proficiency
📝 Resume Builder
Create a professional resume
Add education, experience, projects and skills
Modern resume preview
Download resume as PDF
🔍 Resume Analyzer
Upload a PDF resume
Extract resume content
Analyze important sections
Identify technical skills
Generate an ATS-style score
Provide improvement suggestions
Generate an analysis report
📊 Assessments
Career-specific assessments
Full Stack Developer
Data Scientist
Software Engineer
Timed assessments
Question navigation
Mark questions for review
Instant explanations
Skill-wise performance analysis
Strength and weakness detection
Assessment history
XP and learning streaks
🗺️ Learning Roadmap
Personalized career learning paths
Stage-based learning
Skill completion tracking
Learning progress
Learning streak
Milestones and challenges
Practical projects
Learning resources
Personal notes
Achievement system
💼 Job Matching
Search jobs
Filter by location
Filter by job type
Job match percentage
Save jobs
Apply links
Career-based job recommendations
🤖 AI Career Assistant
Career-related questions
Skill guidance
Resume guidance
Interview preparation
Learning recommendations
Quick career questions
👨‍💼 Admin Dashboard
Admin authentication
User management
Career management
Skill management
Career recommendations
Reports
System settings
🛠️ Technology Stack
Frontend
React.js
Vite
React Router
HTML5
CSS3
JavaScript
html2pdf.js
pdfjs-dist
Backend
Node.js
Express.js
REST API
JWT Authentication
CORS
Database
MySQL
MySQL Workbench / phpMyAdmin
Development Tools
Visual Studio Code
Android Studio
Git
GitHub
npm
📁 Project Structure
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
⚙️ Installation
1. Clone the repository
git clone https://github.com/aneira1303/AI-Career-Guidance-Platform.git
cd AI-Career-Guidance-Platform
2. Install frontend dependencies
cd client
npm install
3. Install backend dependencies
cd ../server
npm install
🗄️ Database Setup
Open MySQL / phpMyAdmin.
Create the required database.
Import or execute the project's SQL tables.
Configure the database credentials in the backend .env file.

Example:

PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=careerai

JWT_SECRET=your_secret_key

Important: Never upload your .env file or database passwords to GitHub.

▶️ Running the Project
Start Backend

Open a terminal:

cd C:\AI-Career-Guidance-Platform\server
npm start

Backend:

http://localhost:5000

Health check:

http://localhost:5000/api/health
Start Frontend

Open another terminal:

cd C:\AI-Career-Guidance-Platform\client
npm run dev

Frontend:

http://localhost:5173
🔐 Authentication

The platform supports:

User registration
User login
JWT-based authentication
Protected routes
Admin authentication
Role-based access control

User information and authentication tokens are stored locally for the frontend session.

👨‍💻 Admin Panel

Admin users can access:

http://localhost:5173/admin

Admin features include:

Dashboard
Users
Careers
Skills
Recommendations
Reports
Settings
📌 Main Routes
Page	Route
Login	/login
Register	/register
Dashboard	/dashboard
Profile	/profile
Resume Builder	/resume-builder
Resume Analyzer	/resume-analyzer
Careers	/careers
Skill Gap	/skill-gap
Assessments	/assessments
Learning Roadmap	/roadmap
Jobs	/jobs
AI Assistant	/assistant
Admin Dashboard	/admin
🔌 API Endpoints
Authentication
POST /api/auth/register
POST /api/auth/login
Careers
GET /api/careers
GET /api/careers/:id
Skills
GET /api/skills
Admin
GET /api/admin/users
GET /api/admin/careers
GET /api/admin/skills
GET /api/admin/recommendations
GET /api/admin/reports
🎨 UI Design

The application uses a modern dark navy, blue and red visual theme with:

Responsive layouts
Dashboard cards
Progress indicators
Interactive assessments
Modern navigation
Career analytics
Mobile-friendly design
🔮 Future Enhancements
Real AI/LLM-powered career recommendations
RAG-based career knowledge assistant
Live job APIs
LinkedIn integration
Advanced ATS resume scoring
AI-generated resumes
AI interview simulator
Skill recommendation using machine learning
Personalized course recommendations
Real-time career analytics
Email notifications
Cloud deployment
