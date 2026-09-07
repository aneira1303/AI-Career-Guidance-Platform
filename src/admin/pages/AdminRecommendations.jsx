import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./AdminRecommendations.css";

const API_URL =
  "http://localhost:5000/api/admin/recommendations";

const REFRESH_INTERVAL = 30000;

function AdminRecommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  const [search, setSearch] = useState("");
  const [scoreFilter, setScoreFilter] = useState("all");

  const getToken = () => localStorage.getItem("token");

  const getHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  });

  const normalizeRecommendations = (result) => {
    if (Array.isArray(result)) {
      return result;
    }

    if (Array.isArray(result.data)) {
      return result.data;
    }

    if (Array.isArray(result.recommendations)) {
      return result.recommendations;
    }

    return [];
  };

  const loadRecommendations = useCallback(async (manual = false) => {
    try {
      if (manual) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await fetch(API_URL, {
        method: "GET",
        headers: getHeaders(),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to load recommendations"
        );
      }

      const data = normalizeRecommendations(result);

      setRecommendations(data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Recommendations error:", err);

      setError(
        err.message ||
          "Unable to connect to the recommendations API"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadRecommendations();

    const interval = setInterval(() => {
      loadRecommendations();
    }, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [loadRecommendations]);

  const getScore = (item) => {
    const value =
      item.match_score ??
      item.score ??
      item.confidence ??
      item.match_percentage ??
      0;

    return Number(value) || 0;
  };

  const filteredRecommendations = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return recommendations.filter((item) => {
      const userName =
        item.user_name ||
        item.name ||
        item.user ||
        "";

      const email = item.email || "";

      const career =
        item.career_title ||
        item.career_name ||
        item.title ||
        "";

      const skill =
        item.skill_name ||
        item.skill ||
        "";

      const matchesSearch =
        !searchValue ||
        String(userName).toLowerCase().includes(searchValue) ||
        String(email).toLowerCase().includes(searchValue) ||
        String(career).toLowerCase().includes(searchValue) ||
        String(skill).toLowerCase().includes(searchValue);

      const score = getScore(item);

      let matchesScore = true;

      if (scoreFilter === "high") {
        matchesScore = score >= 80;
      }

      if (scoreFilter === "medium") {
        matchesScore = score >= 50 && score < 80;
      }

      if (scoreFilter === "low") {
        matchesScore = score < 50;
      }

      return matchesSearch && matchesScore;
    });
  }, [recommendations, search, scoreFilter]);

  const highMatches = recommendations.filter(
    (item) => getScore(item) >= 80
  ).length;

  const mediumMatches = recommendations.filter(
    (item) => {
      const score = getScore(item);
      return score >= 50 && score < 80;
    }
  ).length;

  const lowMatches = recommendations.filter(
    (item) => getScore(item) < 50
  ).length;

  const handleDelete = async (id) => {
    if (!id) return;

    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this recommendation?"
    );

    if (!confirmed) return;

    try {
      setError("");

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to delete recommendation"
        );
      }

      setRecommendations((current) =>
        current.filter((item) => item.id !== id)
      );

      setLastUpdated(new Date());
    } catch (err) {
      console.error("Delete recommendation error:", err);

      setError(
        err.message || "Unable to delete recommendation"
      );
    }
  };

  const formatDate = (date) => {
    if (!date) return "—";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return "—";
    }

    return parsed.toLocaleString();
  };

  const scoreClass = (score) => {
    if (score >= 80) return "score-high";
    if (score >= 50) return "score-medium";
    return "score-low";
  };

  return (
    <div className="admin-recommendations-page">

      {/* HEADER */}
      <div className="recommendations-header">
        <div>
          <h1>Career Recommendations</h1>

          <p>
            Real-time AI career recommendation activity
          </p>

          {lastUpdated && (
            <small className="last-updated">
              Last updated: {formatDate(lastUpdated)}
            </small>
          )}
        </div>

        <button
          className="recommendations-refresh-btn"
          onClick={() => loadRecommendations(true)}
          disabled={refreshing}
        >
          {refreshing ? "Refreshing..." : "↻ Refresh"}
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="recommendations-error">
          <strong>API Error:</strong> {error}
        </div>
      )}

      {/* LIVE STATUS */}
      <div className="live-status">
        <span className="live-dot"></span>
        <span>LIVE DATA</span>
        <small>
          Automatically refreshes every 30 seconds
        </small>
      </div>

      {/* STATISTICS */}
      <div className="recommendation-stats">

        <div className="recommendation-stat">
          <div className="stat-icon">🎯</div>

          <div>
            <span>Total Recommendations</span>
            <strong>{recommendations.length}</strong>
          </div>
        </div>

        <div className="recommendation-stat">
          <div className="stat-icon">🚀</div>

          <div>
            <span>High Match</span>
            <strong>{highMatches}</strong>
          </div>
        </div>

        <div className="recommendation-stat">
          <div className="stat-icon">📊</div>

          <div>
            <span>Medium Match</span>
            <strong>{mediumMatches}</strong>
          </div>
        </div>

        <div className="recommendation-stat">
          <div className="stat-icon">⚠️</div>

          <div>
            <span>Low Match</span>
            <strong>{lowMatches}</strong>
          </div>
        </div>

      </div>

      {/* TABLE CARD */}
      <div className="recommendations-card">

        <div className="recommendations-toolbar">

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search user, email, career or skill..."
          />

          <select
            value={scoreFilter}
            onChange={(e) =>
              setScoreFilter(e.target.value)
            }
          >
            <option value="all">All Matches</option>
            <option value="high">High Match — 80%+</option>
            <option value="medium">
              Medium Match — 50–79%
            </option>
            <option value="low">Low Match — Below 50%</option>
          </select>

        </div>

        {loading ? (
          <div className="recommendations-loading">
            <div className="recommendations-spinner"></div>
            <p>Loading live recommendations...</p>
          </div>
        ) : filteredRecommendations.length === 0 ? (
          <div className="recommendations-empty">
            <div className="empty-icon">🎯</div>

            <h3>No recommendations found</h3>

            <p>
              There are no recommendation records matching
              your current filters.
            </p>
          </div>
        ) : (
          <div className="recommendations-table-wrapper">

            <table className="recommendations-table">

              <thead>
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Career</th>
                  <th>Skill</th>
                  <th>Match Score</th>
                  <th>Created</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredRecommendations.map(
                  (item, index) => {
                    const score = getScore(item);

                    return (
                      <tr key={item.id || index}>

                        <td>{index + 1}</td>

                        <td className="recommendation-user">
                          {item.user_name ||
                            item.name ||
                            "Unknown User"}
                        </td>

                        <td>
                          {item.email || "—"}
                        </td>

                        <td className="recommendation-career">
                          {item.career_title ||
                            item.career_name ||
                            item.title ||
                            "—"}
                        </td>

                        <td>
                          {item.skill_name ||
                            item.skill ||
                            "—"}
                        </td>

                        <td>
                          <span
                            className={`recommendation-score ${scoreClass(
                              score
                            )}`}
                          >
                            {score}%
                          </span>
                        </td>

                        <td>
                          {formatDate(
                            item.created_at
                          )}
                        </td>

                        <td>
                          {item.id ? (
                            <button
                              className="recommendation-delete"
                              onClick={() =>
                                handleDelete(item.id)
                              }
                            >
                              Delete
                            </button>
                          ) : (
                            "—"
                          )}
                        </td>

                      </tr>
                    );
                  }
                )}
              </tbody>

            </table>

          </div>
        )}

      </div>
    </div>
  );
}

export default AdminRecommendations;