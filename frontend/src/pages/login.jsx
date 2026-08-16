import React from "react";

import {
    useState
} from "react";

import axios from "axios";

import {
    Link,
    useNavigate
} from "react-router-dom";


function Login() {

    const navigate =
        useNavigate();


    const [form, setForm] =
        useState({

            email: "",

            password: ""

        });


    const [error, setError] =
        useState("");


    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]:
                e.target.value

        });
    };


    const handleSubmit = async (
        e
    ) => {

        e.preventDefault();

        setError("");


        try {

            const response =
                await axios.post(

                    "http://localhost:5000/api/auth/login",

                    form

                );


            localStorage.setItem(
                "token",
                response.data.token
            );


            localStorage.setItem(
                "user",
                JSON.stringify(
                    response.data.user
                )
            );


            if (
                response.data.user.role ===
                "admin"
            ) {

                navigate("/admin");

            } else {

                navigate("/student");

            }

        } catch (error) {

            setError(

                error.response?.data
                    ?.message ||

                "Login failed"

            );
        }
    };


    return (

        <div className="auth-container">

            <div className="auth-card">

                <h2 className="text-center mb-4">
                    Login
                </h2>


                {error && (

                    <div className="alert alert-danger">

                        {error}

                    </div>

                )}


                <form
                    onSubmit={
                        handleSubmit
                    }
                >

                    <div className="mb-3">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={
                                form.email
                            }
                            onChange={
                                handleChange
                            }
                            required
                        />

                    </div>


                    <div className="mb-3">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={
                                form.password
                            }
                            onChange={
                                handleChange
                            }
                            required
                        />

                    </div>


                    <button
                        className="btn btn-primary w-100"
                    >
                        Login
                    </button>

                </form>


                <p className="text-center mt-3">

                    Don't have an account?

                    {" "}

                    <Link to="/register">
                        Register
                    </Link>

                </p>

            </div>

        </div>
    );
}


export default Login;