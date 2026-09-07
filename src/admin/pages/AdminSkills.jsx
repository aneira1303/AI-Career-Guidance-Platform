import React, { useEffect, useState } from "react";
import "./AdminSkills.css";

const API_URL = "http://localhost:5000/api/admin/skills";

function AdminSkills() {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [editingSkill, setEditingSkill] = useState(null);

    const [form, setForm] = useState({
        name: "",
        category: "",
        description: ""
    });

    // =====================================================
    // LOAD SKILLS
    // =====================================================

    const loadSkills = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            const response = await fetch(API_URL, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to load skills"
                );
            }

            setSkills(data.skills || data.data || []);

        } catch (error) {
            console.error("❌ Skills error:", error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSkills();
    }, []);

    // =====================================================
    // ADD
    // =====================================================

    const openAdd = () => {
        setEditingSkill(null);

        setForm({
            name: "",
            category: "",
            description: ""
        });

        setShowModal(true);
    };

    // =====================================================
    // EDIT
    // =====================================================

    const openEdit = (skill) => {
        setEditingSkill(skill);

        setForm({
            name: skill.name || "",
            category: skill.category || "",
            description: skill.description || ""
        });

        setShowModal(true);
    };

    // =====================================================
    // CLOSE
    // =====================================================

    const closeModal = () => {
        if (saving) return;

        setShowModal(false);
        setEditingSkill(null);

        setForm({
            name: "",
            category: "",
            description: ""
        });
    };

    // =====================================================
    // INPUT
    // =====================================================

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // =====================================================
    // SAVE
    // =====================================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name.trim()) {
            alert("Skill name is required.");
            return;
        }

        try {
            setSaving(true);

            const token = localStorage.getItem("token");

            const editing = editingSkill !== null;

            const url = editing
                ? `${API_URL}/${editingSkill.id}`
                : API_URL;

            const response = await fetch(url, {
                method: editing ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: form.name.trim(),
                    category: form.category.trim(),
                    description: form.description.trim()
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to save skill"
                );
            }

            alert(
                editing
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
    // DELETE
    // =====================================================

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this skill?"
        );

        if (!confirmed) return;

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `${API_URL}/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to delete skill"
                );
            }

            alert("Skill deleted successfully!");

            setSkills((current) =>
                current.filter(
                    (skill) =>
                        Number(skill.id) !== Number(id)
                )
            );

        } catch (error) {
            console.error("❌ Delete skill error:", error);
            alert(error.message);
        }
    };

    // =====================================================
    // UI
    // =====================================================

    return (
        <div className="admin-page">

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
                    onClick={openAdd}
                >
                    + Add Skill
                </button>

            </div>


            <div className="admin-panel">

                <div className="panel-header">

                    <div>
                        <h3>Skill Management</h3>

                        <p>
                            {skills.length} skills loaded
                            from MySQL.
                        </p>
                    </div>

                    <button
                        className="primary-button"
                        onClick={loadSkills}
                    >
                        Refresh
                    </button>

                </div>


                {loading && (
                    <div className="loading-state">
                        Loading skills...
                    </div>
                )}


                {!loading && skills.length === 0 && (
                    <div className="empty-state">

                        <h3>No skills found</h3>

                        <p>
                            Add a skill to get started.
                        </p>

                        <button
                            className="primary-button"
                            onClick={openAdd}
                        >
                            + Add Skill
                        </button>

                    </div>
                )}


                {!loading && skills.length > 0 && (
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

                                {skills.map((skill, index) => (

                                    <tr key={skill.id}>

                                        <td>
                                            {index + 1}
                                        </td>

                                        <td>
                                            <strong>
                                                {skill.name}
                                            </strong>
                                        </td>

                                        <td>
                                            {skill.category ||
                                                "General"}
                                        </td>

                                        <td>
                                            {skill.description ||
                                                "No description"}
                                        </td>

                                        <td>

                                            <button
                                                type="button"
                                                className="action-button edit"
                                                onClick={() =>
                                                    openEdit(skill)
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                type="button"
                                                className="action-button delete"
                                                onClick={() =>
                                                    handleDelete(
                                                        skill.id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>
                )}

            </div>


            {/* =================================================
                MODAL
            ================================================= */}

            {showModal && (

                <div className="modal-overlay">

                    <div className="skill-modal">

                        <div className="modal-header">

                            <div>
                                <h2>
                                    {editingSkill
                                        ? "Edit Skill"
                                        : "Add Skill"}
                                </h2>

                                <p>
                                    Enter skill information
                                    below.
                                </p>
                            </div>

                            <button
                                type="button"
                                className="modal-close"
                                onClick={closeModal}
                            >
                                ×
                            </button>

                        </div>


                        <form onSubmit={handleSubmit}>

                            <div className="form-group">

                                <label>
                                    Skill Name *
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Example: Python"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Category
                                </label>

                                <select
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Select category
                                    </option>

                                    <option value="Programming">
                                        Programming
                                    </option>

                                    <option value="AI & ML">
                                        AI & ML
                                    </option>

                                    <option value="Data Science">
                                        Data Science
                                    </option>

                                    <option value="Web Development">
                                        Web Development
                                    </option>

                                    <option value="Backend Development">
                                        Backend Development
                                    </option>

                                    <option value="Database">
                                        Database
                                    </option>

                                    <option value="Cloud">
                                        Cloud
                                    </option>

                                    <option value="Cybersecurity">
                                        Cybersecurity
                                    </option>

                                    <option value="DevOps">
                                        DevOps
                                    </option>

                                    <option value="Professional">
                                        Professional
                                    </option>

                                    <option value="Soft Skills">
                                        Soft Skills
                                    </option>

                                </select>

                            </div>


                            <div className="form-group">

                                <label>
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Describe the skill..."
                                    rows="4"
                                />

                            </div>


                            <div className="modal-actions">

                                <button
                                    type="button"
                                    className="cancel-button"
                                    onClick={closeModal}
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