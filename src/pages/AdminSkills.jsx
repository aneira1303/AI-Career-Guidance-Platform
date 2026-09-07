import React, { useEffect, useState } from "react";
import "./AdminSkills.css";

const API_URL = "http://localhost:5000/api/admin/skills";

function AdminSkills() {
    const [skills, setSkills] = useState([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const [editingSkill, setEditingSkill] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        category: "",
        description: ""
    });

    const [search, setSearch] = useState("");

    // =====================================================
    // AUTH HEADERS
    // =====================================================

    const getHeaders = () => {
        const token = localStorage.getItem("token");

        return {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        };
    };

    // =====================================================
    // LOAD SKILLS
    // =====================================================

    useEffect(() => {
        loadSkills();
    }, []);

    const loadSkills = async () => {
        try {
            setLoading(true);

            const response = await fetch(API_URL, {
                method: "GET",
                headers: getHeaders()
            });

            const data = await response.json();

            console.log("Skills API:", data);

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to load skills"
                );
            }

            setSkills(data.skills || data.data || []);

        } catch (error) {
            console.error("❌ Skills loading error:", error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    // =====================================================
    // OPEN ADD MODAL
    // =====================================================

    const openAddModal = () => {
        setEditingSkill(null);

        setFormData({
            name: "",
            category: "",
            description: ""
        });

        setShowModal(true);
    };

    // =====================================================
    // OPEN EDIT MODAL
    // =====================================================

    const openEditModal = (skill) => {
        setEditingSkill(skill);

        setFormData({
            name: skill.name || "",
            category: skill.category || "",
            description: skill.description || ""
        });

        setShowModal(true);
    };

    // =====================================================
    // CLOSE MODAL
    // =====================================================

    const closeModal = () => {
        if (saving) return;

        setShowModal(false);
        setEditingSkill(null);

        setFormData({
            name: "",
            category: "",
            description: ""
        });
    };

    // =====================================================
    // FORM CHANGE
    // =====================================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // =====================================================
    // ADD / UPDATE SKILL
    // =====================================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            alert("Please enter a skill name.");
            return;
        }

        try {
            setSaving(true);

            const isEditing = Boolean(editingSkill);

            const url = isEditing
                ? `${API_URL}/${editingSkill.id}`
                : API_URL;

            const method = isEditing ? "PUT" : "POST";

            console.log("Sending skill:", {
                url,
                method,
                data: formData
            });

            const response = await fetch(url, {
                method,
                headers: getHeaders(),
                body: JSON.stringify({
                    name: formData.name.trim(),
                    category: formData.category.trim(),
                    description: formData.description.trim()
                })
            });

            const data = await response.json();

            console.log("Save skill response:", data);

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to save skill"
                );
            }

            alert(
                isEditing
                    ? "Skill updated successfully!"
                    : "Skill added successfully!"
            );

            closeModal();

            await loadSkills();

        } catch (error) {
            console.error("❌ Save skill error:", error);
            alert(error.message);
        } finally {
            setSaving(false);
        }
    };

    // =====================================================
    // DELETE SKILL
    // =====================================================

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this skill?"
        );

        if (!confirmed) return;

        try {
            const response = await fetch(
                `${API_URL}/${id}`,
                {
                    method: "DELETE",
                    headers: getHeaders()
                }
            );

            const data = await response.json();

            console.log("Delete response:", data);

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to delete skill"
                );
            }

            alert("Skill deleted successfully!");

            setSkills((prev) =>
                prev.filter((skill) => skill.id !== id)
            );

        } catch (error) {
            console.error("❌ Delete skill error:", error);
            alert(error.message);
        }
    };

    // =====================================================
    // SEARCH
    // =====================================================

    const filteredSkills = skills.filter((skill) => {
        const searchText = search.toLowerCase();

        return (
            (skill.name || "")
                .toLowerCase()
                .includes(searchText) ||
            (skill.category || "")
                .toLowerCase()
                .includes(searchText) ||
            (skill.description || "")
                .toLowerCase()
                .includes(searchText)
        );
    });

    // =====================================================
    // UI
    // =====================================================

    return (
        <div className="admin-page">

            {/* HEADER */}
            <div className="page-header">

                <div>
                    <h1>Skills</h1>

                    <p>
                        Manage skills used by the AI
                        career recommendation system.
                    </p>
                </div>

                <button
                    className="primary-button"
                    onClick={openAddModal}
                >
                    + Add Skill
                </button>

            </div>

            {/* STATS */}
            <div className="skill-stats">

                <div className="stat-card">
                    <span>Total Skills</span>
                    <strong>{skills.length}</strong>
                </div>

                <div className="stat-card">
                    <span>Technical</span>
                    <strong>
                        {
                            skills.filter(
                                (skill) =>
                                    (skill.category || "")
                                        .toLowerCase() ===
                                    "technical"
                            ).length
                        }
                    </strong>
                </div>

                <div className="stat-card">
                    <span>Professional</span>
                    <strong>
                        {
                            skills.filter(
                                (skill) =>
                                    (skill.category || "")
                                        .toLowerCase() ===
                                    "professional"
                            ).length
                        }
                    </strong>
                </div>

            </div>

            {/* MAIN PANEL */}
            <div className="admin-panel">

                <div className="panel-header">

                    <div>
                        <h3>Skill Management</h3>

                        <p>
                            Add, edit and remove technical
                            and professional skills.
                        </p>
                    </div>

                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search skills..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

                {/* LOADING */}
                {loading && (
                    <div className="loading-state">
                        Loading skills...
                    </div>
                )}

                {/* EMPTY */}
                {!loading &&
                    filteredSkills.length === 0 && (
                        <div className="empty-state">

                            <div className="empty-icon">
                                🛠️
                            </div>

                            <h3>
                                {search
                                    ? "No matching skills"
                                    : "No skills found"}
                            </h3>

                            <p>
                                {search
                                    ? "Try another search."
                                    : "Add your first skill to help the AI generate better career recommendations."}
                            </p>

                            {!search && (
                                <button
                                    className="primary-button"
                                    onClick={openAddModal}
                                >
                                    + Add First Skill
                                </button>
                            )}

                        </div>
                    )}

                {/* TABLE */}
                {!loading &&
                    filteredSkills.length > 0 && (

                        <div className="admin-table-wrapper">

                            <table className="admin-table">

                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Skill</th>
                                        <th>Category</th>
                                        <th>Description</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {filteredSkills.map(
                                        (skill, index) => (

                                            <tr
                                                key={skill.id}
                                            >

                                                <td>
                                                    {index + 1}
                                                </td>

                                                <td>
                                                    <strong>
                                                        {
                                                            skill.name
                                                        }
                                                    </strong>
                                                </td>

                                                <td>
                                                    <span className="category-badge">
                                                        {
                                                            skill.category ||
                                                            "General"
                                                        }
                                                    </span>
                                                </td>

                                                <td>
                                                    <span className="description-cell">
                                                        {
                                                            skill.description ||
                                                            "No description"
                                                        }
                                                    </span>
                                                </td>

                                                <td>

                                                    <div className="action-buttons">

                                                        <button
                                                            className="action-button edit"
                                                            onClick={() =>
                                                                openEditModal(
                                                                    skill
                                                                )
                                                            }
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            className="action-button delete"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    skill.id
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        )
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
                    onClick={closeModal}
                >

                    <div
                        className="skill-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <div className="modal-header">

                            <div>
                                <h2>
                                    {editingSkill
                                        ? "Edit Skill"
                                        : "Add New Skill"}
                                </h2>

                                <p>
                                    Enter the skill
                                    information below.
                                </p>
                            </div>

                            <button
                                className="modal-close"
                                onClick={closeModal}
                            >
                                ×
                            </button>

                        </div>

                        <form
                            onSubmit={handleSubmit}
                        >

                            {/* NAME */}
                            <div className="form-group">

                                <label>
                                    Skill Name *
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="e.g. Python"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            {/* CATEGORY */}
                            <div className="form-group">

                                <label>
                                    Category
                                </label>

                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Select Category
                                    </option>

                                    <option value="Technical">
                                        Technical
                                    </option>

                                    <option value="Programming">
                                        Programming
                                    </option>

                                    <option value="Data Science">
                                        Data Science
                                    </option>

                                    <option value="AI & ML">
                                        AI & ML
                                    </option>

                                    <option value="Web Development">
                                        Web Development
                                    </option>

                                    <option value="Cloud">
                                        Cloud
                                    </option>

                                    <option value="Database">
                                        Database
                                    </option>

                                    <option value="Cybersecurity">
                                        Cybersecurity
                                    </option>

                                    <option value="Professional">
                                        Professional
                                    </option>

                                    <option value="Soft Skills">
                                        Soft Skills
                                    </option>

                                </select>

                            </div>

                            {/* DESCRIPTION */}
                            <div className="form-group">

                                <label>
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    rows="4"
                                    placeholder="Describe this skill..."
                                    value={
                                        formData.description
                                    }
                                    onChange={handleChange}
                                />

                            </div>

                            {/* BUTTONS */}
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
                                    className="primary-button"
                                    disabled={saving}
                                >
                                    {saving
                                        ? "Saving..."
                                        : editingSkill
                                        ? "Update Skill"
                                        : "Add Skill"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
}

export default AdminSkills;