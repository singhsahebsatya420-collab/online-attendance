import React from "react";

import {
    useState
} from "react";

import axios from "axios";

import {
    Link,
    useNavigate
} from "react-router-dom";


function Register() {

    const navigate =
        useNavigate();


    const [form, setForm] =
        useState({

            name: "",

            email: "",

            password: "",

            rollNumber: "",

            course: "MCA",

            semester: 1,

            phone: ""

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

                    "http://localhost:5000/api/auth/register",

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


            alert(
                "Registration successful"
            );


            navigate("/student");

        } catch (error) {

            setError(

                error.response?.data
                    ?.message ||

                "Registration failed"

            );
        }
    };


    return (

        <div className="auth-container">

            <div className="auth-card">

                <h2 className="text-center mb-4">
                    Student Registration
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
                            Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={
                                form.name
                            }
                            onChange={
                                handleChange
                            }
                            required
                        />

                    </div>


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
                            minLength="6"
                            value={
                                form.password
                            }
                            onChange={
                                handleChange
                            }
                            required
                        />

                    </div>


                    <div className="mb-3">

                        <label>
                            Roll Number
                        </label>

                        <input
                            type="text"
                            name="rollNumber"
                            className="form-control"
                            value={
                                form.rollNumber
                            }
                            onChange={
                                handleChange
                            }
                            required
                        />

                    </div>


                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <label>
                                Course
                            </label>

                            <select
                                name="course"
                                className="form-select"
                                value={
                                    form.course
                                }
                                onChange={
                                    handleChange
                                }
                            >

                                <option>
                                    MCA
                                </option>

                                <option>
                                    BCA
                                </option>

                                <option>
                                    B.Tech
                                </option>

                            </select>

                        </div>


                        <div className="col-md-6 mb-3">

                            <label>
                                Semester
                            </label>

                            <select
                                name="semester"
                                className="form-select"
                                value={
                                    form.semester
                                }
                                onChange={
                                    handleChange
                                }
                            >

                                <option value="1">
                                    1
                                </option>

                                <option value="2">
                                    2
                                </option>

                                <option value="3">
                                    3
                                </option>

                                <option value="4">
                                    4
                                </option>

                            </select>

                        </div>

                    </div>


                    <div className="mb-3">

                        <label>
                            Phone
                        </label>

                        <input
                            type="text"
                            name="phone"
                            className="form-control"
                            value={
                                form.phone
                            }
                            onChange={
                                handleChange
                            }
                        />

                    </div>


                    <button
                        className="btn btn-success w-100"
                    >
                        Register
                    </button>

                </form>


                <p className="text-center mt-3">

                    Already registered?

                    {" "}

                    <Link to="/login">
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
}


export default Register;