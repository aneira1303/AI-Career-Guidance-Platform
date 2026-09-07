import React, { useEffect, useState } from "react";
import "../styles/AdminUsers.css";

const API_URL = "http://localhost:5000/api/admin/users";

function AdminUsers() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "student",
        is_active: true
    });


    // =====================================================
    // GET USERS
    // =====================================================

    const loadUsers = async () => {

        try {

            setLoading(true);
            setError("");

            const token =
                localStorage.getItem("token");

            const response = await fetch(
                API_URL,
                {
                    method: "GET",
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                        "Content-Type":
                            "application/json"
                    }
                }
            );

            const data =
                await response.json();

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to load users"
                );
            }

            if (data.success) {

                setUsers(
                    data.users ||
                    data.data ||
                    []
                );

            } else {

                throw new Error(
                    data.message ||
                    "Failed to load users"
                );
            }

        } catch (err) {

            console.error(
                "Users loading error:",
                err
            );

            setError(
                err.message ||
                "Unable to connect to server"
            );

        } finally {

            setLoading(false);
        }
    };


    // =====================================================
    // INITIAL LOAD
    // =====================================================

    useEffect(() => {

        loadUsers();

    }, []);


    // =====================================================
    // OPEN ADD USER
    // =====================================================

    const openAddModal = () => {

        setEditingUser(null);

        setFormData({
            name: "",
            email: "",
            role: "student",
            is_active: true
        });

        setShowModal(true);
    };


    // =====================================================
    // OPEN EDIT USER
    // =====================================================

    const openEditModal = (user) => {

        setEditingUser(user);

        setFormData({
            name: user.name || "",
            email: user.email || "",
            role: user.role || "student",
            is_active:
                Boolean(user.is_active)
        });

        setShowModal(true);
    };


    // =====================================================
    // FORM CHANGE
    // =====================================================

    const handleChange = (e) => {

        const {
            name,
            value,
            type,
            checked
        } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]:
                type === "checkbox"
                    ? checked
                    : value
        }));
    };


    // =====================================================
    // SAVE USER
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token =
                localStorage.getItem("token");

            const url = editingUser
                ? `${API_URL}/${editingUser.id}`
                : API_URL;

            const method = editingUser
                ? "PUT"
                : "POST";

            const response = await fetch(
                url,
                {
                    method,

                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify(
                        formData
                    )
                }
            );

            const data =
                await response.json();

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Unable to save user"
                );
            }

            if (!data.success) {

                throw new Error(
                    data.message ||
                    "Unable to save user"
                );
            }

            setShowModal(false);

            setEditingUser(null);

            await loadUsers();

        } catch (err) {

            console.error(
                "Save user error:",
                err
            );

            alert(
                err.message ||
                "Unable to save user"
            );
        }
    };


    // =====================================================
    // DELETE USER
    // =====================================================

    const deleteUser = async (user) => {

        if (user.role === "admin") {

            alert(
                "Admin users cannot be deleted."
            );

            return;
        }

        const confirmed =
            window.confirm(
                `Delete ${user.name}?`
            );

        if (!confirmed) {
            return;
        }

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await fetch(
                    `${API_URL}/${user.id}`,
                    {
                        method: "DELETE",

                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            const data =
                await response.json();

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Unable to delete user"
                );
            }

            if (!data.success) {

                throw new Error(
                    data.message ||
                    "Unable to delete user"
                );
            }

            // Reload from database
            await loadUsers();

        } catch (err) {

            console.error(
                "Delete user error:",
                err
            );

            alert(
                err.message ||
                "Unable to delete user"
            );
        }
    };


    // =====================================================
    // SEARCH
    // =====================================================

    const filteredUsers =
        users.filter((user) => {

            const text =
                `${user.name || ""} ${
                    user.email || ""
                } ${
                    user.role || ""
                }`.toLowerCase();

            return text.includes(
                search.toLowerCase()
            );
        });


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <div className="admin-page">

            {/* HEADER */}

            <div className="page-header">

                <div>

                    <h1>
                        Users
                    </h1>

                    <p>
                        Manage CareerAI platform users.
                    </p>

                </div>

                <button
                    className="primary-button"
                    onClick={openAddModal}
                >
                    + Add User
                </button>

            </div>


            {/* PANEL */}

            <div className="admin-panel">

                <div className="panel-header">

                    <div>

                        <h3>
                            User Management
                        </h3>

                        <p>
                            {users.length} registered
                            user
                            {users.length !== 1
                                ? "s"
                                : ""}
                        </p>

                    </div>

                    <button
                        className="primary-button"
                        onClick={loadUsers}
                        disabled={loading}
                    >
                        {loading
                            ? "Loading..."
                            : "↻ Refresh"}
                    </button>

                </div>


                {/* SEARCH */}

                <input
                    type="text"
                    className="admin-search"
                    placeholder="Search by name, email or role..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />


                {/* ERROR */}

                {error && (

                    <div className="error-state">

                        {error}

                        <button
                            onClick={loadUsers}
                            className="retry-button"
                        >
                            Retry
                        </button>

                    </div>
                )}


                {/* LOADING */}

                {loading && (

                    <div className="loading-state">

                        <div className="spinner"></div>

                        Loading users from database...

                    </div>
                )}


                {/* EMPTY */}

                {!loading &&
                    !error &&
                    filteredUsers.length === 0 && (

                    <div className="empty-state">

                        <div className="empty-icon">
                            👥
                        </div>

                        <h3>
                            No users found
                        </h3>

                        <p>
                            {search
                                ? "No users match your search."
                                : "No registered users found."}
                        </p>

                    </div>
                )}


                {/* TABLE */}

                {!loading &&
                    !error &&
                    filteredUsers.length > 0 && (

                    <div className="admin-table-wrapper">

                        <table className="admin-table">

                            <thead>

                                <tr>

                                    <th>#</th>

                                    <th>Name</th>

                                    <th>Email</th>

                                    <th>Role</th>

                                    <th>Status</th>

                                    <th>Created</th>

                                    <th>Actions</th>

                                </tr>

                            </thead>


                            <tbody>

                                {filteredUsers.map(
                                    (user, index) => (

                                    <tr
                                        key={user.id}
                                    >

                                        <td>
                                            {index + 1}
                                        </td>

                                        <td>

                                            <strong>
                                                {user.name ||
                                                    "Unknown"}
                                            </strong>

                                        </td>

                                        <td>
                                            {user.email ||
                                                "—"}
                                        </td>

                                        <td>

                                            <span
                                                className={
                                                    user.role ===
                                                    "admin"
                                                        ? "role-admin"
                                                        : "role-user"
                                                }
                                            >
                                                {user.role}
                                            </span>

                                        </td>

                                        <td>

                                            <span
                                                className={
                                                    user.is_active
                                                        ? "status-active"
                                                        : "status-inactive"
                                                }
                                            >
                                                {user.is_active
                                                    ? "Active"
                                                    : "Inactive"}
                                            </span>

                                        </td>

                                        <td>

                                            {user.created_at
                                                ? new Date(
                                                      user.created_at
                                                  ).toLocaleDateString()
                                                : "—"}

                                        </td>

                                        <td>

                                            <button
                                                className="action-button edit"
                                                onClick={() =>
                                                    openEditModal(
                                                        user
                                                    )
                                                }
                                            >
                                                ✏ Edit
                                            </button>


                                            {user.role ===
                                            "admin" ? (

                                                <span className="protected-badge">
                                                    🔒 Protected
                                                </span>

                                            ) : (

                                                <button
                                                    className="action-button delete"
                                                    onClick={() =>
                                                        deleteUser(
                                                            user
                                                        )
                                                    }
                                                >
                                                    🗑 Delete
                                                </button>
                                            )}

                                        </td>

                                    </tr>

                                ))}

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
                    onClick={() =>
                        setShowModal(false)
                    }
                >

                    <div
                        className="user-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <div className="modal-header">

                            <div>

                                <h2>
                                    {editingUser
                                        ? "Edit User"
                                        : "Add User"}
                                </h2>

                                <p>
                                    {editingUser
                                        ? "Update user information"
                                        : "Create a new platform user"}
                                </p>

                            </div>

                            <button
                                className="modal-close"
                                onClick={() =>
                                    setShowModal(false)
                                }
                            >
                                ×
                            </button>

                        </div>


                        <form
                            onSubmit={handleSubmit}
                        >

                            <div className="form-group">

                                <label>
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={
                                        formData.name
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    placeholder="Enter full name"
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={
                                        formData.email
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    placeholder="Enter email"
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Role
                                </label>

                                <select
                                    name="role"
                                    value={
                                        formData.role
                                    }
                                    onChange={
                                        handleChange
                                    }
                                >

                                    <option value="student">
                                        Student
                                    </option>

                                    <option value="admin">
                                        Admin
                                    </option>

                                </select>

                            </div>


                            <div className="form-checkbox">

                                <input
                                    type="checkbox"
                                    name="is_active"
                                    checked={
                                        formData.is_active
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                                <label>
                                    Active User
                                </label>

                            </div>


                            <div className="modal-actions">

                                <button
                                    type="button"
                                    className="cancel-button"
                                    onClick={() =>
                                        setShowModal(false)
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="save-button"
                                >
                                    {editingUser
                                        ? "Update User"
                                        : "Create User"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}

        </div>
    );
}

export default AdminUsers;