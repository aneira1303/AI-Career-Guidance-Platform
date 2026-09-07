import React, { useEffect, useState } from "react";
import "../styles/AdminCareers.css";

const API_URL = "http://localhost:5000/api/admin/careers";

const emptyForm = {
    title: "",
    category: "",
    demand: "Medium",
    min_salary: "",
    max_salary: "",
    description: "",
    education_required: "",
    responsibilities: ""
};

const AdminCareers = () => {

    const [careers, setCareers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");

    const [showModal, setShowModal] = useState(false);

    const [editingCareer, setEditingCareer] = useState(null);

    const [form, setForm] = useState(emptyForm);

    const [search, setSearch] = useState("");


    // =====================================================
    // GET TOKEN
    // =====================================================

    const getToken = () => {
        return localStorage.getItem("token");
    };


    // =====================================================
    // LOAD CAREERS
    // =====================================================

    const loadCareers = async () => {

        try {

            setLoading(true);
            setError("");

            const token = getToken();

            const response = await fetch(API_URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            const text = await response.text();

            let data;

            try {
                data = JSON.parse(text);
            } catch {
                throw new Error(
                    `Server returned invalid JSON (${response.status})`
                );
            }

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to load careers"
                );
            }

            if (data.success) {

                setCareers(
                    Array.isArray(data.careers)
                        ? data.careers
                        : Array.isArray(data.data)
                            ? data.data
                            : []
                );

            } else {

                throw new Error(
                    data.message || "Failed to load careers"
                );
            }

        } catch (err) {

            console.error("Career loading error:", err);

            setError(err.message);

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
    // INPUT CHANGE
    // =====================================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setForm((previous) => ({
            ...previous,
            [name]: value
        }));
    };


    // =====================================================
    // OPEN ADD MODAL
    // =====================================================

    const openAddModal = () => {

        setEditingCareer(null);

        setForm({
            ...emptyForm
        });

        setError("");

        setShowModal(true);
    };


    // =====================================================
    // OPEN EDIT MODAL
    // =====================================================

    const openEditModal = (career) => {

        setEditingCareer(career);

        setForm({
            title:
                career.title ||
                career.name ||
                "",

            category:
                career.category ||
                "",

            demand:
                career.demand ||
                "Medium",

            min_salary:
                career.min_salary ??
                career.minimum_salary ??
                "",

            max_salary:
                career.max_salary ??
                career.maximum_salary ??
                "",

            description:
                career.description ||
                "",

            education_required:
                career.education_required ||
                "",

            responsibilities:
                career.responsibilities ||
                ""
        });

        setError("");

        setShowModal(true);
    };


    // =====================================================
    // CLOSE MODAL
    // =====================================================

    const closeModal = () => {

        if (saving) {
            return;
        }

        setShowModal(false);

        setEditingCareer(null);

        setForm({
            ...emptyForm
        });

        setError("");
    };


    // =====================================================
    // CREATE / UPDATE CAREER
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setSaving(true);
        setError("");

        try {

            const token = getToken();

            const payload = {
                title: form.title.trim(),
                category: form.category.trim(),
                demand: form.demand,
                min_salary:
                    form.min_salary === ""
                        ? null
                        : Number(form.min_salary),
                max_salary:
                    form.max_salary === ""
                        ? null
                        : Number(form.max_salary),
                description:
                    form.description.trim(),
                education_required:
                    form.education_required.trim(),
                responsibilities:
                    form.responsibilities.trim()
            };


            if (!payload.title) {
                throw new Error("Career title is required");
            }

            if (!payload.category) {
                throw new Error("Category is required");
            }


            // -------------------------------------------------
            // UPDATE
            // -------------------------------------------------

            if (editingCareer) {

                const response = await fetch(
                    `${API_URL}/${editingCareer.id}`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type": "application/json",
                            Authorization:
                                `Bearer ${token}`
                        },

                        body: JSON.stringify(payload)
                    }
                );

                const text = await response.text();

                let data;

                try {
                    data = JSON.parse(text);
                } catch {
                    throw new Error(
                        `Server returned invalid JSON (${response.status})`
                    );
                }

                if (!response.ok) {
                    throw new Error(
                        data.message ||
                        "Failed to update career"
                    );
                }

            }


            // -------------------------------------------------
            // CREATE
            // -------------------------------------------------

            else {

                const response = await fetch(
                    API_URL,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json",
                            Authorization:
                                `Bearer ${token}`
                        },

                        body: JSON.stringify(payload)
                    }
                );

                const text = await response.text();

                let data;

                try {
                    data = JSON.parse(text);
                } catch {
                    throw new Error(
                        `Server returned invalid JSON (${response.status})`
                    );
                }

                if (!response.ok) {
                    throw new Error(
                        data.message ||
                        "Failed to create career"
                    );
                }
            }


            closeModal();

            await loadCareers();

        } catch (err) {

            console.error(
                "Career save error:",
                err
            );

            setError(err.message);

        } finally {

            setSaving(false);

        }
    };


    // =====================================================
    // DELETE CAREER
    // =====================================================

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this career?"
        );

        if (!confirmed) {
            return;
        }

        try {

            setError("");

            const token = getToken();

            const response = await fetch(
                `${API_URL}/${id}`,
                {
                    method: "DELETE",

                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            const text = await response.text();

            let data;

            try {
                data = JSON.parse(text);
            } catch {
                throw new Error(
                    `Server returned invalid JSON (${response.status})`
                );
            }

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to delete career"
                );
            }

            await loadCareers();

        } catch (err) {

            console.error(
                "Career delete error:",
                err
            );

            setError(err.message);
        }
    };


    // =====================================================
    // SEARCH
    // =====================================================

    const filteredCareers = careers.filter((career) => {

        const title =
            career.title ||
            career.name ||
            "";

        const category =
            career.category ||
            "";

        const query =
            search.toLowerCase().trim();

        return (
            title
                .toLowerCase()
                .includes(query) ||

            category
                .toLowerCase()
                .includes(query)
        );
    });


    // =====================================================
    // FORMAT SALARY
    // =====================================================

    const formatSalary = (value) => {

        if (
            value === null ||
            value === undefined ||
            value === ""
        ) {
            return "—";
        }

        return `₹${Number(value).toLocaleString("en-IN")}`;
    };


    // =====================================================
    // DEMAND CLASS
    // =====================================================

    const getDemandClass = (demand) => {

        const value =
            String(demand || "")
                .toLowerCase();

        if (value === "high") {
            return "demand-high";
        }

        if (value === "low") {
            return "demand-low";
        }

        return "demand-medium";
    };


    // =====================================================
    // RENDER
    // =====================================================

    return (
        <div className="admin-page">

            {/* ============================================
                HEADER
            ============================================ */}

            <div className="page-header">

                <div>

                    <h1>
                        Career Management
                    </h1>

                    <p>
                        Add, edit and manage careers.
                    </p>

                </div>

                <button
                    type="button"
                    className="primary-button"
                    onClick={openAddModal}
                >
                    + Add Career
                </button>

            </div>


            {/* ============================================
                ERROR
            ============================================ */}

            {error && !showModal && (
                <div className="error-state">
                    {error}
                </div>
            )}


            {/* ============================================
                PANEL
            ============================================ */}

            <div className="admin-panel">

                <div className="panel-header">

                    <div>

                        <h3>
                            Career Management
                        </h3>

                        <p>
                            {careers.length} career
                            {careers.length !== 1 ? "s" : ""}
                            {" "}available
                        </p>

                    </div>

                    <button
                        type="button"
                        className="primary-button"
                        onClick={loadCareers}
                        disabled={loading}
                    >
                        {loading
                            ? "Loading..."
                            : "↻ Refresh"}
                    </button>

                </div>


                {/* ========================================
                    SEARCH
                ======================================== */}

                <input
                    type="text"
                    className="admin-search"
                    placeholder="Search careers or categories..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />


                {/* ========================================
                    LOADING
                ======================================== */}

                {loading && (
                    <div className="loading-state">
                        Loading careers...
                    </div>
                )}


                {/* ========================================
                    EMPTY
                ======================================== */}

                {!loading &&
                    filteredCareers.length === 0 && (
                        <div className="empty-state">

                            <div className="empty-icon">
                                💼
                            </div>

                            <h3>
                                No careers found
                            </h3>

                            <p>
                                {search
                                    ? "Try another search."
                                    : "Add your first career to the platform."}
                            </p>

                        </div>
                    )}


                {/* ========================================
                    TABLE
                ======================================== */}

                {!loading &&
                    filteredCareers.length > 0 && (

                        <div className="admin-table-wrapper">

                            <table className="admin-table">

                                <thead>

                                    <tr>

                                        <th>
                                            #
                                        </th>

                                        <th>
                                            Career
                                        </th>

                                        <th>
                                            Category
                                        </th>

                                        <th>
                                            Demand
                                        </th>

                                        <th>
                                            Salary
                                        </th>

                                        <th>
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {filteredCareers.map(
                                        (career, index) => {

                                            const title =
                                                career.title ||
                                                career.name ||
                                                "Untitled Career";

                                            return (
                                                <tr
                                                    key={
                                                        career.id ||
                                                        index
                                                    }
                                                >

                                                    <td>
                                                        {index + 1}
                                                    </td>

                                                    <td>
                                                        <span className="career-title">
                                                            {title}
                                                        </span>
                                                    </td>

                                                    <td>

                                                        <span className="category-badge">
                                                            {
                                                                career.category ||
                                                                "General"
                                                            }
                                                        </span>

                                                    </td>

                                                    <td>

                                                        <span
                                                            className={
                                                                getDemandClass(
                                                                    career.demand
                                                                )
                                                            }
                                                        >
                                                            {
                                                                career.demand ||
                                                                "Medium"
                                                            }
                                                        </span>

                                                    </td>

                                                    <td>

                                                        <span className="salary">

                                                            {formatSalary(
                                                                career.min_salary ??
                                                                career.minimum_salary
                                                            )}

                                                            {" - "}

                                                            {formatSalary(
                                                                career.max_salary ??
                                                                career.maximum_salary
                                                            )}

                                                        </span>

                                                    </td>

                                                    <td>

                                                        <button
                                                            type="button"
                                                            className="action-button edit"
                                                            onClick={() =>
                                                                openEditModal(
                                                                    career
                                                                )
                                                            }
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className="action-button delete"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    career.id
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>

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


            {/* =================================================
                ADD / EDIT MODAL
            ================================================= */}

            {showModal && (

                <div
                    className="modal-overlay"
                    onMouseDown={(e) => {

                        if (
                            e.target === e.currentTarget &&
                            !saving
                        ) {
                            closeModal();
                        }

                    }}
                >

                    <div className="career-modal">

                        {/* ==================================
                            MODAL HEADER
                        ================================== */}

                        <div className="modal-header">

                            <div>

                                <h2>
                                    {editingCareer
                                        ? "Edit Career"
                                        : "Add Career"}
                                </h2>

                                <p>
                                    {editingCareer
                                        ? "Update career information."
                                        : "Create a new career for CareerAI."}
                                </p>

                            </div>


                            <button
                                type="button"
                                className="modal-close"
                                onClick={closeModal}
                                disabled={saving}
                            >
                                ×
                            </button>

                        </div>


                        {/* ==================================
                            FORM
                        ================================== */}

                        <form
                            className="career-form"
                            onSubmit={handleSubmit}
                        >

                            {error && (
                                <div className="error-state">
                                    {error}
                                </div>
                            )}


                            <div className="form-grid">

                                {/* TITLE */}

                                <div className="form-group full-width">

                                    <label>
                                        Career Title *
                                    </label>

                                    <input
                                        type="text"
                                        name="title"
                                        value={form.title}
                                        onChange={handleChange}
                                        placeholder="e.g. AI Engineer"
                                        required
                                    />

                                </div>


                                {/* CATEGORY */}

                                <div className="form-group">

                                    <label>
                                        Category *
                                    </label>

                                    <input
                                        type="text"
                                        name="category"
                                        value={form.category}
                                        onChange={handleChange}
                                        placeholder="e.g. Artificial Intelligence"
                                        required
                                    />

                                </div>


                                {/* DEMAND */}

                                <div className="form-group">

                                    <label>
                                        Demand
                                    </label>

                                    <select
                                        name="demand"
                                        value={form.demand}
                                        onChange={handleChange}
                                    >
                                        <option value="High">
                                            High
                                        </option>

                                        <option value="Medium">
                                            Medium
                                        </option>

                                        <option value="Low">
                                            Low
                                        </option>

                                    </select>

                                </div>


                                {/* MIN SALARY */}

                                <div className="form-group">

                                    <label>
                                        Minimum Salary (₹)
                                    </label>

                                    <div className="salary-input">

                                        <span>
                                            ₹
                                        </span>

                                        <input
                                            type="number"
                                            name="min_salary"
                                            value={
                                                form.min_salary
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="500000"
                                            min="0"
                                        />

                                    </div>

                                </div>


                                {/* MAX SALARY */}

                                <div className="form-group">

                                    <label>
                                        Maximum Salary (₹)
                                    </label>

                                    <div className="salary-input">

                                        <span>
                                            ₹
                                        </span>

                                        <input
                                            type="number"
                                            name="max_salary"
                                            value={
                                                form.max_salary
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="1500000"
                                            min="0"
                                        />

                                    </div>

                                </div>


                                {/* DESCRIPTION */}

                                <div className="form-group full-width">

                                    <label>
                                        Description
                                    </label>

                                    <textarea
                                        name="description"
                                        value={
                                            form.description
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Describe this career..."
                                    />

                                </div>


                                {/* EDUCATION */}

                                <div className="form-group full-width">

                                    <label>
                                        Education Required
                                    </label>

                                    <textarea
                                        name="education_required"
                                        value={
                                            form.education_required
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="e.g. Bachelor's degree in Computer Science, AI or related field."
                                    />

                                </div>


                                {/* RESPONSIBILITIES */}

                                <div className="form-group full-width">

                                    <label>
                                        Responsibilities
                                    </label>

                                    <textarea
                                        name="responsibilities"
                                        value={
                                            form.responsibilities
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Describe the key responsibilities..."
                                    />

                                </div>

                            </div>


                            {/* ==================================
                                ACTIONS
                            ================================== */}

                            <div className="modal-actions">

                                <button
                                    type="button"
                                    className="cancel-button"
                                    onClick={closeModal}
                                    disabled={saving}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="save-button"
                                    disabled={saving}
                                >
                                    {saving
                                        ? "Saving..."
                                        : editingCareer
                                            ? "Update Career"
                                            : "Save Career"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
};


export default AdminCareers;