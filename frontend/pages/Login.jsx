import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setErr("");
        setLoading(true);
        try {
            const { data } = await api.post("/auth/login", form);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate(data.user.role === "admin" ? "/admin" : "/student");
        } catch (e) {
            setErr(e.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-decoration auth-decoration-one"></div>
            <div className="auth-decoration auth-decoration-two"></div>
            <div className="auth-layout">
                <div className="auth-intro d-none d-lg-block">
                    <div className="intro-badge">SMART ATTENDANCE</div>
                    <h1>Manage attendance<br /><span>with confidence.</span></h1>
                    <p>One simple platform for administrators and students to manage attendance records securely.</p>
                    <div className="intro-points">
                        <span>✓ Role based access</span>
                        <span>✓ Secure authentication</span>
                        <span>✓ Easy attendance tracking</span>
                    </div>
                </div>

                <div className="auth-card-modern">
                    <div className="auth-logo">OA</div>
                    <h2>Welcome back</h2>
                    <p className="auth-muted">Sign in to your attendance account</p>

                    {err && <div className="alert alert-danger modern-alert">{err}</div>}

                    <form onSubmit={submit}>
                        <label>Email Address</label>
                        <input className="form-control modern-input" type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />

                        <label className="mt-3">Password</label>
                        <input className="form-control modern-input" type="password" placeholder="Enter your password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />

                        <button className="btn primary-btn w-100 mt-4" disabled={loading}>
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    <div className="auth-divider"><span>OR</span></div>
                    <p className="text-center auth-switch">New student? <Link to="/register">Create an account</Link></p>
                </div>
            </div>
        </div>
    );
}
