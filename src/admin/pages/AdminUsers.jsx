import React, { useEffect, useState } from "react";
import "./AdminUsers.css";

const API_URL = "http://localhost:5000/api/admin/users";

function AdminUsers() {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const [form, setForm] = useState({
        name: "",
        email: "",
        role: "student",
        is_active: true
    });

    // =====================================================
    // LOAD USERS
    // =====================================================

    const loadUsers = async () => {

        try {

            setLoading(true);

            const token =
                localStorage.getItem("token");

            const response = await fetch(
                API_URL,
                {
                    method: "GET",
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
                    "Failed to load users"
                );
            }

            setUsers(
                data.users ||
                data.data ||
                []
            );

        } catch (error) {

            console.error(
                "❌ Users error:",
                error
            );

            alert(error.message);

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        loadUsers();
    }, []);


    // =====================================================
    // OPEN ADD
    // =====================================================

    const openAdd = () => {

        setEditingUser(null);

        setForm({
            name: "",
            email: "",
            role: "student",
            is_active: true
        });

        setShowModal(true);
    };


    // =====================================================
    // OPEN EDIT
    // =====================================================

    const openEdit = (user) => {

        setEditingUser(user);

        setForm({
            name: user.name || "",
            email: user.email || "",
            role: user.role || "student",
            is_active:
                Boolean(user.is_active)
        });

        setShowModal(true);
    };


    // =====================================================
    // CLOSE MODAL
    // =====================================================

    const closeModal = () => {

        if (saving) return;

        setShowModal(false);

        setEditingUser(null);

        setForm({
            name: "",
            email: "",
            role: "student",
            is_active: true
        });
    };


    // =====================================================
    // CHANGE
    // =====================================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm((previous) => ({
            ...previous,
            [name]:
                name === "is_active"
                    ? value === "true"
                    : value
        }));
    };


    // =====================================================
    // SAVE USER
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!form.name.trim()) {
            alert("Name is required.");
            return;
        }

        if (!form.email.trim()) {
            alert("Email is required.");
            return;
        }

        try {

            setSaving(true);

            const token =
                localStorage.getItem("token");

            const editing =
                editingUser !== null;

            const url = editing
                ? `${API_URL}/${editingUser.id}`
                : API_URL;

            const response = await fetch(
                url,
                {
                    method:
                        editing
                            ? "PUT"
                            : "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        name:
                            form.name.trim(),

                        email:
                            form.email
                                .trim()
                                .toLowerCase(),

                        role:
                            form.role,

                        is_active:
                            form.is_active
                    })
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to save user"
                );
            }

            alert(
                editing
                    ? "User updated successfully!"
                    : "User created successfully!"
            );

            closeModal();

            await loadUsers();

        } catch (error) {

            console.error(
                "❌ Save user error:",
                error
            );

            alert(error.message);

        } finally {

            setSaving(false);

        }
    };


    // =====================================================
    // DELETE
    // =====================================================

    const handleDelete = async (id, role) => {

        if (role === "admin") {

            alert(
                "Administrator accounts cannot be deleted."
            );

            return;
        }

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this user?"
            );

        if (!confirmed) return;

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await fetch(
                    `${API_URL}/${id}`,
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
                    "Failed to delete user"
                );
            }

            alert(
                "User deleted successfully!"
            );

            setUsers((current) =>
                current.filter(
                    (user) =>
                        Number(user.id) !==
                        Number(id)
                )
            );

        } catch (error) {

            console.error(
                "❌ Delete user error:",
                error
            );

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

                    <h1>Users</h1>

                    <p>
                        Manage CareerAI platform
                        users.
                    </p>

                </div>

                <button
                    className="primary-button"
                    onClick={openAdd}
                >
                    + Add User
                </button>

            </div>


            <div className="admin-panel">

                <div className="panel-header">

                    <div>

                        <h3>
                            User Management
                        </h3>

                        <p>
                            {users.length}
                            {" "}
                            users loaded from
                            MySQL.
                        </p>

                    </div>

                    <button
                        className="primary-button"
                        onClick={loadUsers}
                    >
                        Refresh
                    </button>

                </div>


                {loading && (

                    <div className="loading-state">
                        Loading users...
                    </div>

                )}


                {!loading &&
                    users.length === 0 && (

                        <div className="empty-state">

                            <h3>
                                No users found
                            </h3>

                            <p>
                                Add your first
                                user.
                            </p>

                            <button
                                className="primary-button"
                                onClick={openAdd}
                            >
                                + Add User
                            </button>

                        </div>

                    )}


                {!loading &&
                    users.length > 0 && (

                        <div className="admin-table-wrapper">

                            <table className="admin-table">

                                <thead>

                                    <tr>

                                        <th>#</th>

                                        <th>
                                            Name
                                        </th>

                                        <th>
                                            Email
                                        </th>

                                        <th>
                                            Role
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                        <th>
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {users.map(
                                        (user, index) => (

                                            <tr
                                                key={
                                                    user.id
                                                }
                                            >

                                                <td>
                                                    {index + 1}
                                                </td>

                                                <td>
                                                    <strong>
                                                        {
                                                            user.name
                                                        }
                                                    </strong>
                                                </td>

                                                <td>
                                                    {
                                                        user.email
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        user.role
                                                    }
                                                </td>

                                                <td>

                                                    {user.is_active
                                                        ? "Active"
                                                        : "Inactive"}

                                                </td>

                                                <td>

                                                    <button
                                                        type="button"
                                                        className="action-button edit"
                                                        onClick={() =>
                                                            openEdit(
                                                                user
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
                                                                user.id,
                                                                user.role
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>

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
                USER MODAL
            ================================================= */}

            {showModal && (

                <div className="modal-overlay">

                    <div className="user-modal">

                        <div className="modal-header">

                            <div>

                                <h2>
                                    {editingUser
                                        ? "Edit User"
                                        : "Add User"}
                                </h2>

                                <p>
                                    Enter user
                                    information.
                                </p>

                            </div>

                            <button
                                type="button"
                                className="modal-close"
                                onClick={
                                    closeModal
                                }
                            >
                                ×
                            </button>

                        </div>


                        <form
                            onSubmit={
                                handleSubmit
                            }
                        >

                            <div className="form-group">

                                <label>
                                    Full Name *
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={
                                        form.name
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter name"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Email *
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={
                                        form.email
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter email"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Role
                                </label>

                                <select
                                    name="role"
                                    value={
                                        form.role
                                    }
                                    onChange={
                                        handleChange
                                    }
                                >

                                    <option value="student">
                                        Student
                                    </option>

                                    <option value="admin">
                                        Administrator
                                    </option>

                                </select>

                            </div>


                            <div className="form-group">

                                <label>
                                    Status
                                </label>

                                <select
                                    name="is_active"
                                    value={
                                        String(
                                            form.is_active
                                        )
                                    }
                                    onChange={
                                        handleChange
                                    }
                                >

                                    <option value="true">
                                        Active
                                    </option>

                                    <option value="false">
                                        Inactive
                                    </option>

                                </select>

                            </div>


                            <div className="modal-actions">

                                <button
                                    type="button"
                                    className="cancel-button"
                                    onClick={
                                        closeModal
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="primary-button"
                                    disabled={
                                        saving
                                    }
                                >
                                    {saving
                                        ? "Saving..."
                                        : editingUser
                                        ? "Update User"
                                        : "Add User"}
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