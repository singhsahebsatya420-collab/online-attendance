import React from "react";

import {
    useEffect,
    useState
} from "react";

import axios from "axios";


function StudentDashboard() {

    const [data, setData] =
        useState(null);


    const token =
        localStorage.getItem(
            "token"
        );


    const loadAttendance =
        async () => {

            try {

                const response =
                    await axios.get(

                        "http://localhost:5000/api/attendance/my",

                        {
                            headers: {

                                Authorization:
                                    `Bearer ${token}`

                            }
                        }

                    );


                setData(
                    response.data
                );

            } catch (error) {

                console.log(error);

            }
        };


    useEffect(() => {

        loadAttendance();

    }, []);


    if (!data) {

        return (

            <div className="container py-5">

                Loading...

            </div>

        );
    }


    return (

        <div className="container py-4">

            <h2 className="mb-4">
                My Attendance
            </h2>


            <div className="row">

                <div className="col-md-3">

                    <div className="card dashboard-card">

                        <div className="card-body">

                            <h6>
                                Total Classes
                            </h6>

                            <h2>
                                {
                                    data.summary.total
                                }
                            </h2>

                        </div>

                    </div>

                </div>


                <div className="col-md-3">

                    <div className="card dashboard-card">

                        <div className="card-body">

                            <h6>
                                Present
                            </h6>

                            <h2 className="text-success">

                                {
                                    data.summary.present
                                }

                            </h2>

                        </div>

                    </div>

                </div>


                <div className="col-md-3">

                    <div className="card dashboard-card">

                        <div className="card-body">

                            <h6>
                                Absent
                            </h6>

                            <h2 className="text-danger">

                                {
                                    data.summary.absent
                                }

                            </h2>

                        </div>

                    </div>

                </div>


                <div className="col-md-3">

                    <div className="card dashboard-card">

                        <div className="card-body">

                            <h6>
                                Attendance
                            </h6>

                            <h2 className="text-primary">

                                {
                                    data.summary.percentage
                                }%

                            </h2>

                        </div>

                    </div>

                </div>

            </div>


            <div className="card shadow-sm mt-4">

                <div className="card-body">

                    <h5>
                        Attendance History
                    </h5>


                    <div className="table-responsive">

                        <table className="table">

                            <thead>

                                <tr>

                                    <th>
                                        Date
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Marked By
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {
                                    data.records.map(
                                        record => (

                                            <tr
                                                key={
                                                    record._id
                                                }
                                            >

                                                <td>

                                                    {
                                                        new Date(
                                                            record.date
                                                        ).toLocaleDateString()
                                                    }

                                                </td>


                                                <td>

                                                    <span
                                                        className={
                                                            record.status ===
                                                            "present"

                                                                ? "badge bg-success"

                                                                : "badge bg-danger"
                                                        }
                                                    >

                                                        {
                                                            record.status
                                                        }

                                                    </span>

                                                </td>


                                                <td>

                                                    {
                                                        record.markedBy?.name ||
                                                        "Admin"
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


export default StudentDashboard;