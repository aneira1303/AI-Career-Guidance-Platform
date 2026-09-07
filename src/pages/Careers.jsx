import React, { useEffect, useMemo, useState } from "react";
import "./Careers.css";

const API_URL = "http://localhost:5000/api";

function Careers() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [demandFilter, setDemandFilter] = useState("All");

  const [selectedCareer, setSelectedCareer] = useState(null);

  // =====================================================
  // LOAD CAREERS
  // =====================================================

  const loadCareers = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/careers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {}),
        },
      });

      console.log("CAREERS STATUS:", response.status);

      const data = await response.json();

      console.log("CAREERS RESPONSE:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to load careers");
      }

      if (!data.success) {
        throw new Error(data.message || "Failed to load careers");
      }

      setCareers(Array.isArray(data.careers) ? data.careers : []);
    } catch (err) {
      console.error("CAREERS ERROR:", err);
      setError(err.message || "Unable to load careers");
      setCareers([]);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    loadCareers();
  }, []);

  // =====================================================
  // ESCAPE KEY FOR MODAL
  // =====================================================

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedCareer(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // =====================================================
  // CATEGORIES
  // =====================================================

  const categories = useMemo(() => {
    const values = careers
      .map((career) => career.category)
      .filter(Boolean)
      .map((category) => category.trim());

    return ["All", ...new Set(values)];
  }, [careers]);

  // =====================================================
  // FILTER CAREERS
  // =====================================================

  const filteredCareers = useMemo(() => {
    return careers.filter((career) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        career.title?.toLowerCase().includes(searchText) ||
        career.description?.toLowerCase().includes(searchText) ||
        career.category?.toLowerCase().includes(searchText) ||
        career.education_required?.toLowerCase().includes(searchText) ||
        career.responsibilities?.toLowerCase().includes(searchText) ||
        career.career_path?.toLowerCase().includes(searchText);

      const matchesCategory =
        categoryFilter === "All" ||
        career.category === categoryFilter;

      const matchesDemand =
        demandFilter === "All" ||
        career.demand_level === demandFilter;

      return matchesSearch && matchesCategory && matchesDemand;
    });
  }, [careers, search, categoryFilter, demandFilter]);

  // =====================================================
  // FORMAT SALARY
  // =====================================================

  const formatSalary = (value) => {
    if (
      value === null ||
      value === undefined ||
      value === "" ||
      Number(value) === 0
    ) {
      return "Not specified";
    }

    return `₹${Number(value).toLocaleString("en-IN")}`;
  };

  // =====================================================
  // FORMAT DEMAND
  // =====================================================

  const formatDemand = (value) => {
    if (!value) {
      return "Not specified";
    }

    return value
      .replace(/_/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  // =====================================================
  // DEMAND CLASS
  // =====================================================

  const getDemandClass = (value) => {
    if (!value) return "medium";

    const demand = value.toLowerCase();

    if (demand === "very_high") return "very-high";
    if (demand === "high") return "high";
    if (demand === "low") return "low";

    return "medium";
  };

  // =====================================================
  // CLEAR FILTERS
  // =====================================================

  const clearFilters = () => {
    setSearch("");
    setCategoryFilter("All");
    setDemandFilter("All");
  };

  // =====================================================
  // MODAL
  // =====================================================

  const closeModal = () => {
    setSelectedCareer(null);
  };

  // =====================================================
  // LOADING STATE
  // =====================================================

  if (loading) {
    return (
      <div className="careers-page">
        <div className="careers-loading">
          <div className="loading-spinner"></div>

          <h2>Loading Careers...</h2>

          <p>
            Fetching career opportunities from the CareerAI database.
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="careers-page">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="careers-hero">
        <div className="careers-hero-content">

          <div className="career-badge">
            CAREER EXPLORER
          </div>

          <h1>
            Explore Your
            <span> Career Future</span>
          </h1>

          <p>
            Discover career paths, salary ranges, required education,
            responsibilities, and future growth opportunities.
          </p>

        </div>
      </section>


      {/* =================================================
          MAIN CONTAINER
      ================================================= */}

      <main className="careers-container">

        {/* =================================================
            CONTROLS
        ================================================= */}

        <section className="career-controls">

          {/* Search */}

          <div className="career-search-wrapper">
            <span className="search-icon">⌕</span>

            <input
              type="text"
              className="career-search"
              placeholder="Search careers, categories, skills..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>


          {/* Category */}

          <select
            className="career-filter"
            value={categoryFilter}
            onChange={(event) =>
              setCategoryFilter(event.target.value)
            }
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "All"
                  ? "All Categories"
                  : category}
              </option>
            ))}
          </select>


          {/* Demand */}

          <select
            className="career-filter"
            value={demandFilter}
            onChange={(event) =>
              setDemandFilter(event.target.value)
            }
          >
            <option value="All">All Demand Levels</option>
            <option value="low">Low Demand</option>
            <option value="medium">Medium Demand</option>
            <option value="high">High Demand</option>
            <option value="very_high">
              Very High Demand
            </option>
          </select>


          {/* Refresh */}

          <button
            className="career-refresh"
            onClick={loadCareers}
            type="button"
          >
            ↻ Refresh
          </button>

        </section>


        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="career-error">

            <div>
              <strong>Unable to load careers</strong>

              <p>{error}</p>
            </div>

            <button
              type="button"
              onClick={loadCareers}
            >
              Try Again
            </button>

          </div>
        )}


        {/* =================================================
            RESULT HEADER
        ================================================= */}

        <section className="career-result-header">

          <div>
            <h2>Available Careers</h2>

            <p>
              Showing{" "}
              <strong>{filteredCareers.length}</strong>{" "}
              of{" "}
              <strong>{careers.length}</strong>{" "}
              careers
            </p>
          </div>


          {(search ||
            categoryFilter !== "All" ||
            demandFilter !== "All") && (
            <button
              className="clear-filters"
              type="button"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          )}

        </section>


        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {!error && filteredCareers.length === 0 && (
          <div className="career-empty">

            <div className="empty-icon">
              🔎
            </div>

            <h3>No careers found</h3>

            <p>
              Try changing your search or filters.
            </p>

            <button
              type="button"
              onClick={clearFilters}
            >
              Clear Filters
            </button>

          </div>
        )}


        {/* =================================================
            CAREER GRID
        ================================================= */}

        {filteredCareers.length > 0 && (
          <section className="career-grid">

            {filteredCareers.map((career) => (
              <article
                className="career-card"
                key={career.id}
              >

                {/* Card Header */}

                <div className="career-card-top">

                  <div className="career-icon">
                    💼
                  </div>

                  <div className="career-card-title">

                    <h3>
                      {career.title}
                    </h3>

                    <span className="career-category">
                      {career.category ||
                        "General Career"}
                    </span>

                  </div>

                  <span
                    className={`career-demand ${getDemandClass(
                      career.demand_level
                    )}`}
                  >
                    {formatDemand(
                      career.demand_level
                    )}
                  </span>

                </div>


                {/* Description */}

                <p className="career-description">
                  {career.description ||
                    "No description available for this career."}
                </p>


                {/* Salary */}

                <div className="career-salary">

                  <div className="salary-label">
                    💰 Salary Range
                  </div>

                  <strong>
                    {formatSalary(
                      career.salary_min
                    )}

                    <span> – </span>

                    {formatSalary(
                      career.salary_max
                    )}
                  </strong>

                </div>


                {/* Education */}

                <div className="career-card-info">

                  <span>🎓</span>

                  <div>
                    <small>
                      Education Required
                    </small>

                    <p>
                      {career.education_required ||
                        "Not specified"}
                    </p>
                  </div>

                </div>


                {/* Button */}

                <button
                  className="career-details-button"
                  type="button"
                  onClick={() =>
                    setSelectedCareer(career)
                  }
                >
                  View Career Details
                  <span>→</span>
                </button>

              </article>
            ))}

          </section>
        )}

      </main>


      {/* =================================================
          CAREER DETAILS MODAL
      ================================================= */}

      {selectedCareer && (
        <div
          className="career-modal-overlay"
          onClick={closeModal}
        >

          <div
            className="career-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* Close */}

            <button
              className="career-modal-close"
              type="button"
              onClick={closeModal}
              aria-label="Close"
            >
              ×
            </button>


            {/* Modal Header */}

            <div className="career-modal-header">

              <div className="career-modal-icon">
                💼
              </div>

              <div>

                <span className="modal-category">
                  {selectedCareer.category ||
                    "Career"}
                </span>

                <h2>
                  {selectedCareer.title}
                </h2>

                <span
                  className={`career-demand ${getDemandClass(
                    selectedCareer.demand_level
                  )}`}
                >
                  {formatDemand(
                    selectedCareer.demand_level
                  )}
                </span>

              </div>

            </div>


            {/* Description */}

            <div className="modal-section">

              <h3>About This Career</h3>

              <p>
                {selectedCareer.description ||
                  "No description available."}
              </p>

            </div>


            {/* Info Grid */}

            <div className="modal-info-grid">

              {/* Salary */}

              <div className="modal-info-card">

                <span className="modal-info-icon">
                  💰
                </span>

                <div>

                  <small>
                    Salary Range
                  </small>

                  <strong>
                    {formatSalary(
                      selectedCareer.salary_min
                    )}

                    {" – "}

                    {formatSalary(
                      selectedCareer.salary_max
                    )}
                  </strong>

                </div>

              </div>


              {/* Demand */}

              <div className="modal-info-card">

                <span className="modal-info-icon">
                  📈
                </span>

                <div>

                  <small>
                    Demand Level
                  </small>

                  <strong>
                    {formatDemand(
                      selectedCareer.demand_level
                    )}
                  </strong>

                </div>

              </div>


              {/* Education */}

              <div className="modal-info-card">

                <span className="modal-info-icon">
                  🎓
                </span>

                <div>

                  <small>
                    Education Required
                  </small>

                  <strong>
                    {selectedCareer.education_required ||
                      "Not specified"}
                  </strong>

                </div>

              </div>


              {/* Category */}

              <div className="modal-info-card">

                <span className="modal-info-icon">
                  🏷️
                </span>

                <div>

                  <small>
                    Category
                  </small>

                  <strong>
                    {selectedCareer.category ||
                      "Not specified"}
                  </strong>

                </div>

              </div>

            </div>


            {/* Responsibilities */}

            <div className="modal-section">

              <h3>
                Responsibilities
              </h3>

              <p>
                {selectedCareer.responsibilities ||
                  "Not specified"}
              </p>

            </div>


            {/* Career Path */}

            <div className="modal-section">

              <h3>
                Career Path
              </h3>

              <p>
                {selectedCareer.career_path ||
                  "Not specified"}
              </p>

            </div>


            {/* Close Button */}

            <button
              className="modal-close-button"
              type="button"
              onClick={closeModal}
            >
              Close
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default Careers;