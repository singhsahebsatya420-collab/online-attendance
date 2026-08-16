import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", password: "", rollNumber: "", course: "", semester: 1 });
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);

    const update = (key, value) => setForm({ ...form, [key]: value });

    const submit = async (e) => {
        e.preventDefault();
        setErr("");
        setLoading(true);
        try {
            const { data } = await api.post("/auth/register", form);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate("/student");
        } catch (e) {
            setErr(e.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page register-page">
            <div className="auth-decoration auth-decoration-one"></div>
            <div className="auth-decoration auth-decoration-two"></div>
            <div className="auth-layout register-layout">
                <div className="auth-intro d-none d-lg-block">
                    <div className="intro-badge">STUDENT PORTAL</div>
                    <h1>Start tracking<br /><span>your attendance.</span></h1>
                    <p>Create your student account and view your attendance history anytime.</p>
                    <div className="intro-points">
                        <span>✓ Personal attendance dashboard</span>
                        <span>✓ Attendance percentage</span>
                        <span>✓ Complete attendance history</span>
                    </div>
                </div>

                <div className="auth-card-modern register-card">
                    <div className="auth-logo">OA</div>
                    <h2>Create account</h2>
                    <p className="auth-muted">Register as a student</p>
                    {err && <div className="alert alert-danger modern-alert">{err}</div>}

                    <form onSubmit={submit}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label>Full Name</label>
                                <input className="form-control modern-input" placeholder="Your name" value={form.name} onChange={e => update("name", e.target.value)} required />
                            </div>
                            <div className="col-md-6">
                                <label>Email Address</label>
                                <input className="form-control modern-input" type="email" placeholder="you@example.com" value={form.email} onChange={e => update("email", e.target.value)} required />
                            </div>
                            <div className="col-md-6">
                                <label>Password</label>
                                <input className="form-control modern-input" type="password" minLength="6" placeholder="Minimum 6 characters" value={form.password} onChange={e => update("password", e.target.value)} required />
                            </div>
                            <div className="col-md-6">
                                <label>Roll Number</label>
                                <input className="form-control modern-input" placeholder="e.g. MCA001" value={form.rollNumber} onChange={e => update("rollNumber", e.target.value)} />
                            </div>
                            <div className="col-md-8">
                                <label>Course</label>
                                <input className="form-control modern-input" placeholder="e.g. MCA" value={form.course} onChange={e => update("course", e.target.value)} />
                            </div>
                            <div className="col-md-4">
                                <label>Semester</label>
                                <input className="form-control modern-input" type="number" min="1" value={form.semester} onChange={e => update("semester", e.target.value)} />
                            </div>
                        </div>
                        <button className="btn success-btn w-100 mt-4" disabled={loading}>
                            {loading ? "Creating account..." : "Create Student Account"}
                        </button>
                    </form>

                    <p className="text-center auth-switch mt-4">Already registered? <Link to="/login">Sign in</Link></p>
                </div>
            </div>
        </div>
    );
}
