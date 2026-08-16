import React from "react";

import {
    useEffect,
    useState
} from "react";

import axios from "axios";


function ManageAdmins() {

    const token =
        localStorage.getItem(
            "token"
        );


    const [users, setUsers] =
        useState([]);


    const loadUsers =
        async () => {

            try {

                const response =
                    await axios.get(

                        "http://localhost:5000/api/admin/users",

                        {
                            headers: {

                                Authorization:
                                    `Bearer ${token}`

                            }
                        }

                    );


                setUsers(
                    response.data
                );

            } catch (error) {

                console.log(error);

            }
        };


    useEffect(() => {

        loadUsers();

    }, []);


    const makeAdmin =
        async (id) => {

            try {

                await axios.put(

                    `http://localhost:5000/api/admin/make-admin/${id}`,

                    {},

                    {
                        headers: {

                            Authorization:
                                `Bearer ${token}`

                        }
                    }

                );


                loadUsers();

            } catch (error) {

                alert(
                    error.response
                        ?.data?.message ||
                    "Operation failed"
                );

            }
        };


    const removeAdmin =
        async (id) => {

            try {

                await axios.put(

                    `http://localhost:5000/api/admin/remove-admin/${id}`,

                    {},

                    {
                        headers: {

                            Authorization:
                                `Bearer ${token}`

                        }
                    }

                );


                loadUsers();

            } catch (error) {

                alert(
                    error.response
                        ?.data?.message ||
                    "Operation failed"
                );

            }
        };


    return (

        <div className="container py-4">

            <h2 className="mb-4">
                Manage Admins
            </h2>


            <div className="card shadow-sm">

                <div className="card-body">

                    <div className="table-responsive">

                        <table className="table">

                            <thead>

                                <tr>

                                    <th>
                                        Name
                                    </th>

                                    <th>
                                        Email
                                    </th>

                                    <th>
                                        Role
                                    </th>

                                    <th>
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {
                                    users.map(
                                        user => (

                                            <tr
                                                key={
                                                    user._id
                                                }
                                            >

                                                <td>
                                                    {
                                                        user.name
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        user.email
                                                    }
                                                </td>

                                                <td>

                                                    <span
                                                        className={
                                                            user.role ===
                                                            "admin"

                                                                ? "badge bg-primary"

                                                                : "badge bg-secondary"
                                                        }
                                                    >

                                                        {
                                                            user.role
                                                        }

                                                    </span>

                                                </td>


                                                <td>

                                                    {
                                                        user.role ===
                                                        "admin"

                                                            ? (

                                                                <button
                                                                    className="btn btn-warning btn-sm"
                                                                    onClick={() =>
                                                                        removeAdmin(
                                                                            user._id
                                                                        )
                                                                    }
                                                                >
                                                                    Remove Admin
                                                                </button>

                                                            )

                                                            : (

                                                                <button
                                                                    className="btn btn-success btn-sm"
                                                                    onClick={() =>
                                                                        makeAdmin(
                                                                            user._id
                                                                        )
                                                                    }
                                                                >
                                                                    Make Admin
                                                                </button>

                                                            )
                                                    }

                                                </td>

                                            </tr>

                                        )
                                    )
                                }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>
    );
}


export default ManageAdmins;