import React from "react";

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";


import Navbar
    from "./components/navbar";


import ProtectedRoute
    from "./components/protectedRoute";


import Login
    from "./pages/login";


import Register
    from "./pages/register";


import AdminDashboard
    from "./pages/adminDashboard";


import StudentDashboard
    from "./pages/studnetDashboard";


import Students
    from "./pages/students";


import Attendance
    from "./pages/attendance";


import ManageAdmins
    from "./pages/manageAdmins";


function App() {

    return (

        <BrowserRouter>

            <Navbar />


            <Routes>


                {/* LOGIN */}

                <Route
                    path="/login"
                    element={
                        <Login />
                    }
                />


                {/* REGISTER */}

                <Route
                    path="/register"
                    element={
                        <Register />
                    }
                />


                {/* ADMIN DASHBOARD */}

                <Route
                    path="/admin"
                    element={

                        <ProtectedRoute
                            role="admin"
                        >

                            <AdminDashboard />

                        </ProtectedRoute>

                    }
                />


                {/* ADMIN STUDENTS */}

                <Route
                    path="/students"
                    element={

                        <ProtectedRoute
                            role="admin"
                        >

                            <Students />

                        </ProtectedRoute>

                    }
                />


                {/* ADMIN ATTENDANCE */}

                <Route
                    path="/attendance"
                    element={

                        <ProtectedRoute
                            role="admin"
                        >

                            <Attendance />

                        </ProtectedRoute>

                    }
                />


                {/* ADMIN MANAGEMENT */}

                <Route
                    path="/manage-admins"
                    element={

                        <ProtectedRoute
                            role="admin"
                        >

                            <ManageAdmins />

                        </ProtectedRoute>

                    }
                />


                {/* STUDENT */}

                <Route
                    path="/student"
                    element={

                        <ProtectedRoute
                            role="student"
                        >

                            <StudentDashboard />

                        </ProtectedRoute>

                    }
                />


                {/* HOME */}

                <Route
                    path="/"
                    element={

                        localStorage.getItem(
                            "token"
                        )

                            ? (

                                JSON.parse(
                                    localStorage.getItem(
                                        "user"
                                    )
                                )?.role ===
                                    "admin"

                                    ? (
                                        <Navigate
                                            to="/admin"
                                        />
                                    )

                                    : (
                                        <Navigate
                                            to="/student"
                                        />
                                    )

                            )

                            : (
                                <Navigate
                                    to="/login"
                                />
                            )

                    }
                />


                {/* 404 */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/"
                        />
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}


export default App;