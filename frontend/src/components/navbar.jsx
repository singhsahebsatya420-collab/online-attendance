import React from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";


function Navbar() {

    const navigate =
        useNavigate();


    const user =
        JSON.parse(
            localStorage.getItem(
                "user"
            ) || "null"
        );


    const logout = () => {

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "user"
        );

        navigate("/login");
    };


    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container">

                <Link
                    className="navbar-brand fw-bold"
                    to="/"
                >
                    Online Attendance
                </Link>


                <button
                    className="navbar-toggler"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbar"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>


                <div
                    className="collapse navbar-collapse"
                    id="navbar"
                >

                    <ul className="navbar-nav me-auto">

                        {user?.role ===
                            "admin" && (

                            <>

                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/admin"
                                    >
                                        Dashboard
                                    </Link>

                                </li>


                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/students"
                                    >
                                        Students
                                    </Link>

                                </li>


                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/attendance"
                                    >
                                        Attendance
                                    </Link>

                                </li>


                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/manage-admins"
                                    >
                                        Manage Admins
                                    </Link>

                                </li>

                            </>
                        )}


                        {user?.role ===
                            "student" && (

                            <li className="nav-item">

                                <Link
                                    className="nav-link"
                                    to="/student"
                                >
                                    My Attendance
                                </Link>

                            </li>
                        )}

                    </ul>


                    {user && (

                        <div className="d-flex align-items-center">

                            <span className="text-white me-3">

                                {user.name}

                                {" - "}

                                {user.role}

                            </span>


                            <button
                                className="btn btn-danger btn-sm"
                                onClick={
                                    logout
                                }
                            >
                                Logout
                            </button>

                        </div>

                    )}

                </div>

            </div>

        </nav>
    );
}


export default Navbar;