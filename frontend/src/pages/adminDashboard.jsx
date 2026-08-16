import React from "react";

function AdminDashboard() {

    return (

        <div className="container py-5">

            <h2 className="mb-4">
                Admin Dashboard
            </h2>


            <div className="row">

                <div className="col-md-4 mb-3">

                    <div className="card dashboard-card">

                        <div className="card-body">

                            <h5>
                                Students
                            </h5>

                            <p>
                                Manage all students
                            </p>

                        </div>

                    </div>

                </div>


                <div className="col-md-4 mb-3">

                    <div className="card dashboard-card">

                        <div className="card-body">

                            <h5>
                                Attendance
                            </h5>

                            <p>
                                Mark today's attendance
                            </p>

                        </div>

                    </div>

                </div>


                <div className="col-md-4 mb-3">

                    <div className="card dashboard-card">

                        <div className="card-body">

                            <h5>
                                Manage Admins
                            </h5>

                            <p>
                                Create and manage admins
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}


export default AdminDashboard;