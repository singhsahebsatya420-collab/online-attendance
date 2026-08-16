import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Students from "./pages/Students";
import Attendance from "./pages/Attendance";
import ManageAdmins from "./pages/ManageAdmins";

function Layout() {
    const location = useLocation();
    const isAuthPage = ["/login", "/register"].includes(location.pathname);

    return (
        <div className="app-shell">
            {!isAuthPage && <Navbar />}
            <main className={isAuthPage ? "app-main auth-main" : "app-main"}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute role="admin">
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/students"
                        element={
                            <ProtectedRoute role="admin">
                                <Students />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/attendance"
                        element={
                            <ProtectedRoute role="admin">
                                <Attendance />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/admins"
                        element={
                            <ProtectedRoute role="admin">
                                <ManageAdmins />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/student"
                        element={
                            <ProtectedRoute role="student">
                                <StudentDashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/"
                        element={
                            localStorage.getItem("token") ? (
                                JSON.parse(localStorage.getItem("user") || "null")?.role === "admin" ? (
                                    <Navigate to="/admin" replace />
                                ) : (
                                    <Navigate to="/student" replace />
                                )
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
            {!isAuthPage && <Footer />}
        </div>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    );
}
