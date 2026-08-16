import React from "react";

import {
    useEffect,
    useState
} from "react";

import axios from "axios";


function Students() {

    const token =
        localStorage.getItem(
            "token"
        );


    const [students, setStudents] =
        useState([]);


    const [search, setSearch] =
        useState("");


    const [editingStudent, setEditingStudent] =
        useState(null);


    const [form, setForm] =
        useState({
            name: "",
            email: "",
            rollNumber: "",
            course: "MCA",
            semester: 1,
            phone: ""
        });


    const loadStudents =
        async () => {

            try {

                const response =
                    await axios.get(

                        `http://localhost:5000/api/students?limit=100&search=${search}`,

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

            } catch (error) {

                console.log(error);

            }
        };


    useEffect(() => {

        loadStudents();

    }, [search]);


    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]:
                e.target.value
        });
    };


    const startEdit = (student) => {

        setEditingStudent(student._id);

        setForm({
            name: student.name,
            email: student.email,
            rollNumber: student.rollNumber || "",
            course: student.course || "MCA",
            semester: student.semester || 1,
            phone: student.phone || ""
        });
    };


    const updateStudent =
        async () => {

            if (!editingStudent) {
                return;
            }

            try {

                await axios.put(

                    `http://localhost:5000/api/students/${editingStudent}`,

                    form,

                    {
                        headers: {

                            Authorization:
                                `Bearer ${token}`

                        }
                    }

                );


                setEditingStudent(null);
                setForm({
                    name: "",
                    email: "",
                    rollNumber: "",
                    course: "MCA",
                    semester: 1,
                    phone: ""
                });

                loadStudents();

            } catch (error) {

                alert(
                    error.response
                        ?.data?.message ||
                    "Update failed"
                );
            }
        };


    const deleteStudent =
        async (id) => {

            if (
                !window.confirm(
                    "Delete this student?"
                )
            ) {

                return;

            }


            try {

                await axios.delete(

                    `http://localhost:5000/api/students/${id}`,

                    {
                        headers: {

                            Authorization:
                                `Bearer ${token}`

                        }
                    }

                );


                loadStudents();

            } catch (error) {

                alert(
                    error.response
                        ?.data?.message ||
                    "Delete failed"
                );

            }
        };


    return (

        <div className="container py-4">

            <h2 className="mb-4">
                Students
            </h2>


            <input
                type="text"
                className="form-control mb-4"
                placeholder="Search student..."
                value={search}
                onChange={
                    e =>
                        setSearch(
                            e.target.value
                        )
                }
            />


            {editingStudent && (
                <div className="card shadow-sm mb-4">
                    <div className="card-body">
                        <h5 className="mb-3">Edit Student</h5>

                        <div className="row g-3">
                            <div className="col-md-4">
                                <label className="form-label">Name</label>
                                <input className="form-control" name="name" value={form.name} onChange={handleChange} />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Email</label>
                                <input className="form-control" name="email" value={form.email} onChange={handleChange} />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Roll Number</label>
                                <input className="form-control" name="rollNumber" value={form.rollNumber} onChange={handleChange} />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Course</label>
                                <select className="form-select" name="course" value={form.course} onChange={handleChange}>
                                    <option value="MCA">MCA</option>
                                    <option value="BCA">BCA</option>
                                    <option value="B.Tech">B.Tech</option>
                                </select>
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Semester</label>
                                <select className="form-select" name="semester" value={form.semester} onChange={handleChange}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Phone</label>
                                <input className="form-control" name="phone" value={form.phone} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="mt-3">
                            <button className="btn btn-primary me-2" onClick={updateStudent}>Save Changes</button>
                            <button className="btn btn-secondary" onClick={() => setEditingStudent(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}


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
                                        Roll Number
                                    </th>

                                    <th>
                                        Course
                                    </th>

                                    <th>
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {
                                    students.map(
                                        student => (

                                            <tr
                                                key={
                                                    student._id
                                                }
                                            >

                                                <td>
                                                    {
                                                        student.name
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        student.email
                                                    }
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
                                                    <div className="d-flex gap-2">
                                                        <button
                                                            className="btn btn-warning btn-sm"
                                                            onClick={() =>
                                                                startEdit(
                                                                    student
                                                                )
                                                            }
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() =>
                                                                deleteStudent(
                                                                    student._id
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
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


export default Students;