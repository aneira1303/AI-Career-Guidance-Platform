import React, { useEffect, useMemo, useState } from "react";
import "../styles/AdminCareers.css";

const API_URL = "http://localhost:5000/api/admin/careers";
const emptyCareer = {
    title: "", description: "", category: "", salary_min: "", salary_max: "",
    demand_level: "medium", education_required: "", responsibilities: "", career_path: ""
};

function AdminCareers() {
    const [careers, setCareers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [form, setForm] = useState(emptyCareer);
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [saving, setSaving] = useState(false);

    const request = async (url, options = {}) => {
        const token = localStorage.getItem("token");
        const response = await fetch(url, {
            ...options,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                ...(options.headers || {})
            }
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok || !data.success) throw new Error(data.message || "Request failed");
        return data;
    };

    const loadCareers = async () => {
        setLoading(true);
        setError("");
        try {
            const data = await request(API_URL);
            setCareers(Array.isArray(data.careers) ? data.careers : []);
        } catch (err) {
            setCareers([]);
            setError(err.message || "Unable to load careers");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadCareers(); }, []);

    const visibleCareers = useMemo(() => {
        const query = search.trim().toLowerCase();
        if (!query) return careers;
        return careers.filter((career) =>
            [career.title, career.category, career.description, career.demand_level]
                .some((value) => String(value || "").toLowerCase().includes(query))
        );
    }, [careers, search]);

    const openCreate = () => {
        setEditingId(null);
        setForm(emptyCareer);
        setShowForm(true);
    };

    const openEdit = (career) => {
        setEditingId(career.id);
        setForm({
            ...emptyCareer,
            ...career,
            salary_min: career.salary_min ?? "",
            salary_max: career.salary_max ?? ""
        });
        setShowForm(true);
    };

    const saveCareer = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError("");
        try {
            await request(editingId ? `${API_URL}/${editingId}` : API_URL, {
                method: editingId ? "PUT" : "POST",
                body: JSON.stringify(form)
            });
            setShowForm(false);
            await loadCareers();
        } catch (err) {
            setError(err.message || "Unable to save career");
        } finally {
            setSaving(false);
        }
    };

    const deleteCareer = async (career) => {
        if (!window.confirm(`Delete “${career.title}”? This cannot be undone.`)) return;
        try {
            await request(`${API_URL}/${career.id}`, { method: "DELETE" });
            await loadCareers();
        } catch (err) {
            setError(err.message || "Unable to delete career");
        }
    };

    const formatSalary = (career) => {
        if (career.salary_min == null && career.salary_max == null) return "Not specified";
        const format = (value) => value == null ? "—" : new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value);
        return `₹${format(career.salary_min)} – ₹${format(career.salary_max)}`;
    };

    return (
        <div className="admin-page careers-page">
            <div className="page-header">
                <div>
                    <h1>Careers</h1>
                    <p>Manage the career paths available to the recommendation system.</p>
                </div>
                <button className="primary-button" onClick={openCreate}>+ Add Career</button>
            </div>

            <section className="admin-panel careers-panel">
                <div className="panel-header">
                    <div>
                        <h3>Career Management</h3>
                        <p>{careers.length} career{careers.length === 1 ? "" : "s"} loaded from MySQL.</p>
                    </div>
                    <button className="career-refresh" onClick={loadCareers} disabled={loading}>
                        {loading ? "Loading…" : "↻ Refresh"}
                    </button>
                </div>

                <input className="career-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search careers, category or demand…" />

                {error && <div className="career-error">{error}<button onClick={loadCareers}>Try again</button></div>}
                {loading && <div className="career-state">Loading careers from MySQL…</div>}
                {!loading && !error && visibleCareers.length === 0 && <div className="career-state"><h3>No careers found</h3><p>{search ? "No careers match your search." : "Add the first career to make recommendations available."}</p></div>}

                {!loading && !error && visibleCareers.length > 0 && (
                    <div className="career-table-wrap">
                        <table className="career-table">
                            <thead><tr><th>Career</th><th>Category</th><th>Demand</th><th>Salary range</th><th>Actions</th></tr></thead>
                            <tbody>{visibleCareers.map((career) => (
                                <tr key={career.id}>
                                    <td><strong>{career.title}</strong><span>{career.description || "No description"}</span></td>
                                    <td>{career.category || "—"}</td>
                                    <td><span className={`demand-badge demand-${career.demand_level}`}>{String(career.demand_level || "medium").replace("_", " ")}</span></td>
                                    <td>{formatSalary(career)}</td>
                                    <td className="career-actions"><button onClick={() => openEdit(career)}>Edit</button><button className="career-delete" onClick={() => deleteCareer(career)}>Delete</button></td>
                                </tr>
                            ))}</tbody>
                        </table>
                    </div>
                )}
            </section>

            {showForm && (
                <div className="career-modal-backdrop" role="presentation" onMouseDown={() => !saving && setShowForm(false)}>
                    <form className="career-modal" onSubmit={saveCareer} onMouseDown={(event) => event.stopPropagation()}>
                        <div className="career-modal-header"><h2>{editingId ? "Edit Career" : "Add Career"}</h2><button type="button" onClick={() => setShowForm(false)} aria-label="Close">×</button></div>
                        <div className="career-form-grid">
                            <label className="career-form-wide">Career title<input required maxLength="200" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
                            <label>Category<input value={form.category || ""} onChange={(e) => setForm({ ...form, category: e.target.value })} /></label>
                            <label>Demand<select value={form.demand_level} onChange={(e) => setForm({ ...form, demand_level: e.target.value })}><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="very_high">Very high</option></select></label>
                            <label>Minimum salary (₹)<input type="number" min="0" value={form.salary_min} onChange={(e) => setForm({ ...form, salary_min: e.target.value })} /></label>
                            <label>Maximum salary (₹)<input type="number" min="0" value={form.salary_max} onChange={(e) => setForm({ ...form, salary_max: e.target.value })} /></label>
                            <label className="career-form-wide">Description<textarea rows="3" value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label>
                            <label className="career-form-wide">Education required<textarea rows="2" value={form.education_required || ""} onChange={(e) => setForm({ ...form, education_required: e.target.value })} /></label>
                            <label className="career-form-wide">Responsibilities<textarea rows="3" value={form.responsibilities || ""} onChange={(e) => setForm({ ...form, responsibilities: e.target.value })} /></label>
                            <label className="career-form-wide">Career path<textarea rows="3" value={form.career_path || ""} onChange={(e) => setForm({ ...form, career_path: e.target.value })} /></label>
                        </div>
                        <div className="career-modal-actions"><button type="button" onClick={() => setShowForm(false)} disabled={saving}>Cancel</button><button className="primary-button" disabled={saving}>{saving ? "Saving…" : editingId ? "Save Changes" : "Create Career"}</button></div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default AdminCareers;
