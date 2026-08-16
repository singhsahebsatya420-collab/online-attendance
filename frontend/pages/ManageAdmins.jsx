import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function ManageAdmins() {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const load = () => api.get("/admin/users").then(r => setUsers(r.data || []));
    useEffect(() => { load(); }, []);

    const act = async (u) => {
        const url = u.role === "admin" ? `/admin/users/${u._id}/remove-admin` : `/admin/users/${u._id}/make-admin`;
        try { await api.put(url); setMessage("Admin access updated successfully."); load(); } catch (e) { setMessage(e.response?.data?.message || "Error"); }
    };

    return (
        <div className="dashboard-page">
            <div className="container-fluid px-3 px-lg-4 py-4">
                <div className="page-heading-row"><div><span className="eyebrow">ADMIN PANEL</span><h1>Manage Admins</h1><p>Control administrator access for the attendance system.</p></div><Link to="/admin" className="btn secondary-btn">← Dashboard</Link></div>
                {message && <div className="alert alert-success modern-alert">{message}</div>}
                <div className="panel-card"><div className="panel-header"><div><h3>Users & Roles</h3><p>Promote students or remove administrator access.</p></div></div>
                    <div className="table-responsive"><table className="professional-table"><thead><tr><th>User</th><th>Email</th><th>Role</th><th>Action</th></tr></thead><tbody>
                        {users.map(u => <tr key={u._id}><td><div className="student-cell"><span className="student-avatar">{u.name.charAt(0).toUpperCase()}</span><div><strong>{u.name}</strong><small>User account</small></div></div></td><td>{u.email}</td><td><span className={`role-badge ${u.role === 'admin' ? 'role-admin' : 'role-student'}`}>{u.role}</span></td><td>{u.role === "admin" ? <button className="role-action warning" onClick={() => act(u)}>Remove Admin</button> : <button className="role-action success" onClick={() => act(u)}>Make Admin</button>}</td></tr>)}
                        {users.length === 0 && <tr><td colSpan="4" className="empty-state">No users found.</td></tr>}
                    </tbody></table></div>
                </div>
            </div>
        </div>
    );
}
