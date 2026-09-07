import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// =====================================================
// STUDENT PAGES
// =====================================================

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Careers from "./pages/Careers";
import ResumeBuilder from "./pages/ResumeBuilder";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import SkillGap from "./pages/SkillGap";
import Assessments from "./pages/Assessments";
import LearningRoadmap from "./pages/LearningRoadmap";
import Jobs from "./pages/Jobs";
import Assistant from "./pages/Assistant";

// =====================================================
// ADMIN LAYOUT
// =====================================================

import AdminLayout from "./admin/components/AdminLayout";

// =====================================================
// ADMIN PAGES
// =====================================================

import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminUsers from "./admin/pages/AdminUsers";
import AdminCareers from "./admin/pages/AdminCareers";
import AdminSkills from "./admin/pages/AdminSkills";
import AdminRecommendations from "./admin/pages/AdminRecommendations";
import AdminReports from "./admin/pages/AdminReports";
import AdminSettings from "./admin/pages/AdminSettings";

// =====================================================
// ADMIN PROTECTION
// =====================================================

function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");

  // User is not logged in
  if (!token || !userData) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(userData);

    // User is logged in but is not an admin
    if (user?.role !== "admin") {
      return <Navigate to="/dashboard" replace />;
    }

    // Admin is allowed
    return children;
  } catch (error) {
    console.error("Invalid user data:", error);

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return <Navigate to="/login" replace />;
  }
}

// =====================================================
// APP
// =====================================================

function App() {
  return (
    <Routes>

      {/* =================================================
          HOME
      ================================================= */}

      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />


      {/* =================================================
          AUTHENTICATION
      ================================================= */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />


      {/* =================================================
          STUDENT DASHBOARD
      ================================================= */}

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />


      {/* =================================================
          STUDENT PROFILE
      ================================================= */}

      <Route
        path="/profile"
        element={<Profile />}
      />


      {/* =================================================
          RESUME
      ================================================= */}

      <Route
        path="/resume-builder"
        element={<ResumeBuilder />}
      />

      <Route
        path="/resume-analyzer"
        element={<ResumeAnalyzer />}
      />


      {/* =================================================
          CAREER RECOMMENDATIONS
      ================================================= */}

      <Route
        path="/careers"
        element={<Careers />}
      />


      {/* =================================================
          SKILL GAP
      ================================================= */}

      <Route
        path="/skill-gap"
        element={<SkillGap />}
      />


      {/* =================================================
          ASSESSMENTS
      ================================================= */}

      <Route
        path="/assessments"
        element={<Assessments />}
      />


      {/* =================================================
          LEARNING ROADMAP
      ================================================= */}

      <Route
        path="/roadmap"
        element={<LearningRoadmap />}
      />


      {/* =================================================
          JOB MATCHING
      ================================================= */}

      <Route
        path="/jobs"
        element={<Jobs />}
      />


      {/* =================================================
          AI CAREER ASSISTANT
      ================================================= */}

      <Route
        path="/assistant"
        element={<Assistant />}
      />


      {/* =================================================
          ADMIN
      ================================================= */}

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >

        {/* /admin */}
        <Route
          index
          element={<AdminDashboard />}
        />

        {/* /admin/users */}
        <Route
          path="users"
          element={<AdminUsers />}
        />

        {/* /admin/careers */}
        <Route
          path="careers"
          element={<AdminCareers />}
        />

        {/* /admin/skills */}
        <Route
          path="skills"
          element={<AdminSkills />}
        />

        {/* /admin/recommendations */}
        <Route
          path="recommendations"
          element={<AdminRecommendations />}
        />

        {/* /admin/reports */}
        <Route
          path="reports"
          element={<AdminReports />}
        />

        {/* /admin/settings */}
        <Route
          path="settings"
          element={<AdminSettings />}
        />

      </Route>


      {/* =================================================
          404
      ================================================= */}

      <Route
        path="*"
        element={<Navigate to="/dashboard" replace />}
      />

    </Routes>
  );
}

export default App;