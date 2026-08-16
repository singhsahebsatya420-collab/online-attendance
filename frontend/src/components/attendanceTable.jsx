import React from "react";

function AttendanceTable({
    students,
    attendance,
    onChange
}) {

    return (

        <div className="table-responsive">

            <table className="table table-hover">

                <thead className="table-dark">

                    <tr>

                        <th>
                            #
                        </th>

                        <th>
                            Name
                        </th>

                        <th>
                            Roll Number
                        </th>

                        <th>
                            Course
                        </th>

                        <th>
                            Status
                        </th>

                    </tr>

                </thead>


                <tbody>

                    {students.map(
                        (student, index) => (

                            <tr
                                key={
                                    student._id
                                }
                            >

                                <td>
                                    {index + 1}
                                </td>

                                <td>
                                    {student.name}
                                </td>

                                <td>
                                    {
                                        student.rollNumber
                                    }
                                </td>

                                <td>
                                    {
                                        student.course
                                    }
                                </td>

                                <td>

                                    <button
                                        className={
                                            attendance[
                                                student._id
                                            ] ===
                                            "present"

                                                ? "btn btn-success btn-sm me-2"

                                                : "btn btn-outline-success btn-sm me-2"
                                        }
                                        onClick={() =>
                                            onChange(
                                                student._id,
                                                "present"
                                            )
                                        }
                                    >
                                        Present
                                    </button>


                                    <button
                                        className={
                                            attendance[
                                                student._id
                                            ] ===
                                            "absent"

                                                ? "btn btn-danger btn-sm"

                                                : "btn btn-outline-danger btn-sm"
                                        }
                                        onClick={() =>
                                            onChange(
                                                student._id,
                                                "absent"
                                            )
                                        }
                                    >
                                        Absent
                                    </button>

                                </td>

                            </tr>
                        )
                    )}

                </tbody>

            </table>

        </div>
    );
}


export default AttendanceTable;