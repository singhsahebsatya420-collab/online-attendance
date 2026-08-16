import React from "react";

import {
    useEffect,
    useState
} from "react";

import axios from "axios";

import AttendanceTable
    from "../components/attendanceTable";


function Attendance() {

    const token =
        localStorage.getItem(
            "token"
        );


    const [students, setStudents] =
        useState([]);


    const [attendance, setAttendance] =
        useState({});


    const [date, setDate] =
        useState(

            new Date()
                .toISOString()
                .split("T")[0]

        );


    const getStudents =
        async () => {

            try {

                const response =
                    await axios.get(

                        "http://localhost:5000/api/students?limit=100",

                        {
                            headers: {

                                Authorization:
                                    `Bearer ${token}`

                            }
                        }

                    );


                setStudents(
                    response.data.students
                );


                const initial = {};


                response.data.students
                    .forEach(
                        student => {

                            initial[
                                student._id
                            ] = "present";

                        }
                    );


                setAttendance(
                    initial
                );

            } catch (error) {

                console.log(error);

            }
        };


    useEffect(() => {

        getStudents();

    }, []);


    const changeAttendance =
        (
            studentId,
            status
        ) => {

            setAttendance({

                ...attendance,

                [studentId]:
                    status

            });
        };


    const saveAttendance =
        async () => {

            try {

                const data =
                    students.map(
                        student => ({

                            studentId:
                                student._id,

                            status:
                                attendance[
                                    student._id
                                ] ||
                                "absent"

                        })
                    );


                await axios.post(

                    "http://localhost:5000/api/attendance/mark",

                    {
                        date,
                        attendance:
                            data
                    },

                    {
                        headers: {

                            Authorization:
                                `Bearer ${token}`

                        }
                    }

                );


                alert(
                    "Attendance saved successfully"
                );

            } catch (error) {

                alert(

                    error.response
                        ?.data?.message ||

                    "Something went wrong"

                );
            }
        };


    return (

        <div className="container py-4">

            <h2 className="mb-4">
                Mark Attendance
            </h2>


            <div className="card shadow-sm mb-4">

                <div className="card-body">

                    <label className="form-label">
                        Attendance Date
                    </label>

                    <input
                        type="date"
                        className="form-control"
                        value={date}
                        onChange={
                            e =>
                                setDate(
                                    e.target.value
                                )
                        }
                    />

                </div>

            </div>


            <div className="card shadow-sm">

                <div className="card-body">

                    <AttendanceTable

                        students={
                            students
                        }

                        attendance={
                            attendance
                        }

                        onChange={
                            changeAttendance
                        }

                    />


                    <button
                        className="btn btn-primary"
                        onClick={
                            saveAttendance
                        }
                    >

                        Save Attendance

                    </button>

                </div>

            </div>

        </div>
    );
}


export default Attendance;