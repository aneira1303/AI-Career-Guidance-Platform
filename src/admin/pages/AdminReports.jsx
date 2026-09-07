import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./AdminReports.css";

const API_URL = "http://localhost:5000/api/admin";

const REFRESH_INTERVAL = 30000;

function AdminReports() {
  const [users, setUsers] = useState([]);
  const [careers, setCareers] = useState([]);
  const [skills, setSkills] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  const getToken = () => localStorage.getItem("token");

  const headers = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  });

  const extractArray = (result, keys = []) => {
    if (Array.isArray(result)) {
      return result;
    }

    if (Array.isArray(result.data)) {
      return result.data;
    }

    for (const key of keys) {
      if (Array.isArray(result[key])) {
        return result[key];
      }
    }

    return [];
  };

  const loadReports = useCallback(async (manual = false) => {
    try {
      if (manual) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const [
        usersResponse,
        careersResponse,
        skillsResponse,
        recommendationsResponse,
      ] = await Promise.all([
        fetch(`${API_URL}/users`, {
          headers: headers(),
        }),

        fetch(`${API_URL}/careers`, {
          headers: headers(),
        }),

        fetch(`${API_URL}/skills`, {
          headers: headers(),
        }),

        fetch(`${API_URL}/recommendations`, {
          headers: headers(),
        }),
      ]);

      const [
        usersResult,
        careersResult,
        skillsResult,
        recommendationsResult,
      ] = await Promise.all([
        usersResponse.json(),
        careersResponse.json(),
        skillsResponse.json(),
        recommendationsResponse.json(),
      ]);

      if (!usersResponse.ok) {
        throw new Error(
          usersResult.message ||
            "Unable to load users"
        );
      }

      if (!careersResponse.ok) {
        throw new Error(
          careersResult.message ||
            "Unable to load careers"
        );
      }

      if (!skillsResponse.ok) {
        throw new Error(
          skillsResult.message ||
            "Unable to load skills"
        );
      }

      if (!recommendationsResponse.ok) {
        throw new Error(
          recommendationsResult.message ||
            "Unable to load recommendations"
        );
      }

      const usersData = extractArray(
        usersResult,
        ["users"]
      );

      const careersData = extractArray(
        careersResult,
        ["careers"]
      );

      const skillsData = extractArray(
        skillsResult,
        ["skills"]
      );

      const recommendationsData = extractArray(
        recommendationsResult,
        ["recommendations"]
      );

      setUsers(usersData);
      setCareers(careersData);
      setSkills(skillsData);
      setRecommendations(recommendationsData);

      setLastUpdated(new Date());
    } catch (err) {
      console.error("Reports error:", err);

      setError(
        err.message ||
          "Unable to load real-time report data"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadReports();

    const interval = setInterval(() => {
      loadReports();
    }, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [loadReports]);

  const activeUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.is_active === 1 ||
        user.is_active === true ||
        user.status === "active"
    ).length;
  }, [users]);

  const inactiveUsers = users.length - activeUsers;

  const activePercentage = useMemo(() => {
    if (!users.length) return 0;

    return Math.round(
      (activeUsers / users.length) * 100
    );
  }, [activeUsers, users.length]);

  const getScore = (item) => {
    return Number(
      item.match_score ??
        item.score ??
        item.confidence ??
        item.match_percentage ??
        0
    );
  };

  const averageScore = useMemo(() => {
    if (!recommendations.length) return 0;

    const total = recommendations.reduce(
      (sum, item) => sum + getScore(item),
      0
    );

    return Math.round(
      total / recommendations.length
    );
  }, [recommendations]);

  const highMatchCount = recommendations.filter(
    (item) => getScore(item) >= 80
  ).length;

  const mediumMatchCount = recommendations.filter(
    (item) => {
      const score = getScore(item);

      return score >= 50 && score < 80;
    }
  ).length;

  const lowMatchCount = recommendations.filter(
    (item) => getScore(item) < 50
  ).length;

  const recommendationRate = useMemo(() => {
    if (!users.length) return 0;

    return (
      Math.round(
        (recommendations.length /
          users.length) *
          100
      ) || 0
    );
  }, [recommendations.length, users.length]);

  const formatDate = (date) => {
    if (!date) return "—";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return "—";
    }

    return parsed.toLocaleString();
  };

  return (
    <div className="admin-reports-page">

      {/* HEADER */}
      <div className="reports-header">

        <div>
          <h1>Reports & Analytics</h1>

          <p>
            Real-time CareerAI platform analytics
          </p>

          {lastUpdated && (
            <small className="reports-last-updated">
              Last updated: {formatDate(lastUpdated)}
            </small>
          )}
        </div>

        <button
          className="reports-refresh-btn"
          onClick={() => loadReports(true)}
          disabled={refreshing}
        >
          {refreshing
            ? "Refreshing..."
            : "↻ Refresh"}
        </button>

      </div>

      {/* ERROR */}
      {error && (
        <div className="reports-error">
          <strong>API Error:</strong> {error}
        </div>
      )}

      {/* LIVE INDICATOR */}
      <div className="reports-live-status">
        <span className="reports-live-dot"></span>

        <strong>LIVE</strong>

        <span>
          Data automatically refreshes every
          30 seconds
        </span>
      </div>

      {loading ? (
        <div className="reports-loading">
          <div className="reports-spinner"></div>

          <p>
            Loading real-time analytics...
          </p>
        </div>
      ) : (
        <>
          {/* MAIN STATISTICS */}
          <div className="reports-stats-grid">

            <div className="report-stat-card">
              <div className="report-stat-icon">
                👥
              </div>

              <div>
                <span>Total Users</span>
                <strong>{users.length}</strong>
              </div>
            </div>

            <div className="report-stat-card">
              <div className="report-stat-icon">
                ✓
              </div>

              <div>
                <span>Active Users</span>
                <strong>{activeUsers}</strong>
              </div>
            </div>

            <div className="report-stat-card">
              <div className="report-stat-icon">
                💼
              </div>

              <div>
                <span>Careers</span>
                <strong>{careers.length}</strong>
              </div>
            </div>

            <div className="report-stat-card">
              <div className="report-stat-icon">
                🧠
              </div>

              <div>
                <span>Skills</span>
                <strong>{skills.length}</strong>
              </div>
            </div>

            <div className="report-stat-card">
              <div className="report-stat-icon">
                🎯
              </div>

              <div>
                <span>Recommendations</span>
                <strong>
                  {recommendations.length}
                </strong>
              </div>
            </div>

          </div>

          {/* ANALYTICS */}
          <div className="reports-grid">

            {/* USER ACTIVITY */}
            <div className="report-panel">

              <div className="panel-header">
                <h2>User Activity</h2>

                <span>
                  {activePercentage}% Active
                </span>
              </div>

              <div className="activity-progress">
                <div
                  className="activity-progress-bar"
                  style={{
                    width: `${activePercentage}%`,
                  }}
                ></div>
              </div>

              <div className="activity-details">

                <div>
                  <strong>
                    {activeUsers}
                  </strong>

                  <span>
                    Active Users
                  </span>
                </div>

                <div>
                  <strong>
                    {inactiveUsers}
                  </strong>

                  <span>
                    Inactive Users
                  </span>
                </div>

                <div>
                  <strong>
                    {users.length}
                  </strong>

                  <span>
                    Total Users
                  </span>
                </div>

              </div>

            </div>

            {/* RECOMMENDATION ANALYTICS */}
            <div className="report-panel">

              <div className="panel-header">
                <h2>
                  Recommendation Analytics
                </h2>

                <span>
                  Avg. {averageScore}%
                </span>
              </div>

              <div className="recommendation-bars">

                <div className="recommendation-bar-row">
                  <div>
                    <span>
                      High Match
                    </span>

                    <strong>
                      {highMatchCount}
                    </strong>
                  </div>

                  <div className="bar-background">
                    <div
                      className="bar-high"
                      style={{
                        width: `${
                          recommendations.length
                            ? (highMatchCount /
                                recommendations.length) *
                              100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="recommendation-bar-row">
                  <div>
                    <span>
                      Medium Match
                    </span>

                    <strong>
                      {mediumMatchCount}
                    </strong>
                  </div>

                  <div className="bar-background">
                    <div
                      className="bar-medium"
                      style={{
                        width: `${
                          recommendations.length
                            ? (mediumMatchCount /
                                recommendations.length) *
                              100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="recommendation-bar-row">
                  <div>
                    <span>
                      Low Match
                    </span>

                    <strong>
                      {lowMatchCount}
                    </strong>
                  </div>

                  <div className="bar-background">
                    <div
                      className="bar-low"
                      style={{
                        width: `${
                          recommendations.length
                            ? (lowMatchCount /
                                recommendations.length) *
                              100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* PLATFORM OVERVIEW */}
          <div className="report-panel">

            <div className="panel-header">
              <h2>Platform Overview</h2>
            </div>

            <div className="overview-list">

              <div className="overview-row">
                <span>
                  Registered Users
                </span>

                <strong>
                  {users.length}
                </strong>
              </div>

              <div className="overview-row">
                <span>
                  Active Users
                </span>

                <strong>
                  {activeUsers}
                </strong>
              </div>

              <div className="overview-row">
                <span>
                  Career Profiles
                </span>

                <strong>
                  {careers.length}
                </strong>
              </div>

              <div className="overview-row">
                <span>
                  Available Skills
                </span>

                <strong>
                  {skills.length}
                </strong>
              </div>

              <div className="overview-row">
                <span>
                  AI Recommendations
                </span>

                <strong>
                  {recommendations.length}
                </strong>
              </div>

              <div className="overview-row">
                <span>
                  Recommendation Rate
                </span>

                <strong>
                  {recommendationRate}%
                </strong>
              </div>

            </div>

          </div>

          {/* SUMMARY */}
          <div className="report-summary">

            <div className="summary-card">
              <span>Users</span>
              <strong>{users.length}</strong>
            </div>

            <div className="summary-card">
              <span>Careers</span>
              <strong>{careers.length}</strong>
            </div>

            <div className="summary-card">
              <span>Skills</span>
              <strong>{skills.length}</strong>
            </div>

            <div className="summary-card">
              <span>AI Recommendations</span>
              <strong>
                {recommendations.length}
              </strong>
            </div>

            <div className="summary-card">
              <span>Average Match</span>
              <strong>
                {averageScore}%
              </strong>
            </div>

          </div>
        </>
      )}

    </div>
  );
}

export default AdminReports;