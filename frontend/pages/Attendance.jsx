import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

const today = () => new Date().toISOString().slice(0, 10);

export default function Attendance() {
    const [date, setDate] = useState(today());
    const [rows, setRows] = useState([]);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    const load = () => api.get(`/attendance/date/${date}`).then(r => setRows(r.data || []));
    useEffect(() => { load(); }, [date]);

    const setStatus = (id, status) => {
        setRows(rows.map(x => x.student._id === id ? { ...x, attendance: { ...x.attendance, status } } : x));
    };

    const save = async () => {
        setSaving(true);
        setMessage("");
        try {
            await api.post("/attendance/mark", { date, attendance: rows.map(x => ({ studentId: x.student._id, status: x.attendance?.status || "absent" })) });
            setMessage("Attendance saved successfully.");
            load();
        } catch (e) {
            setMessage(e.response?.data?.message || "Unable to save attendance.");
        } finally {
            setSaving(false);
        }
    };

    const present = rows.filter(x => x.attendance?.status === "present").length;
    const absent = rows.length - present;

    return (
        <div className="dashboard-page">
            <div className="container-fluid px-3 px-lg-4 py-4">
                <div className="page-heading-row">
                    <div><span className="eyebrow">ADMIN PANEL</span><h1>Mark Attendance</h1><p>Record attendance for every registered student.</p></div>
                    <div className="date-control"><span>Attendance date</span><input type="date" value={date} onChange={e => setDate(e.target.value)} /></div>
                </div>

                {message && <div className={`alert ${message.includes("successfully") ? "alert-success" : "alert-danger"} modern-alert`}>{message}</div>}

                <div className="row g-3 mb-4">
                    <div className="col-md-4"><div className="mini-stat"><span className="metric-icon blue">👥</span><div><small>Total Students</small><strong>{rows.length}</strong></div></div></div>
                    <div className="col-md-4"><div className="mini-stat"><span className="metric-icon green">✓</span><div><small>Present</small><strong>{present}</strong></div></div></div>
                    <div className="col-md-4"><div className="mini-stat"><span className="metric-icon red">×</span><div><small>Absent</small><strong>{absent}</strong></div></div></div>
                </div>

                <div className="panel-card">
                    <div className="panel-header"><div><h3>Student Attendance</h3><p>Select Present or Absent for each student.</p></div><Link to="/admin" className="view-link">← Dashboard</Link></div>
                    <div className="table-responsive">
                        <table className="professional-table">
                            <thead><tr><th>#</th><th>Student</th><th>Roll Number</th><th>Course</th><th>Status</th></tr></thead>
                            <tbody>
                                {rows.map((x, index) => <tr key={x.student._id}><td>{index + 1}</td><td><div className="student-cell"><span className="student-avatar">{x.student.name.charAt(0).toUpperCase()}</span><div><strong>{x.student.name}</strong><small>{x.student.email}</small></div></div></td><td>{x.student.rollNumber || "-"}</td><td>{x.student.course || "-"}</td><td><button className={`status-button present-button ${x.attendance?.status === "present" ? "selected" : ""}`} onClick={() => setStatus(x.student._id, "present")}>✓ Present</button><button className={`status-button absent-button ${x.attendance?.status === "absent" ? "selected" : ""}`} onClick={() => setStatus(x.student._id, "absent")}>× Absent</button></td></tr>)}
                                {rows.length === 0 && <tr><td colSpan="5" className="empty-state">No students found.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                    <div className="panel-footer-action"><button className="btn primary-btn" onClick={save} disabled={saving || rows.length === 0}>{saving ? "Saving..." : "Save Attendance"}</button></div>
                </div>
            </div>
        </div>
    );
}
