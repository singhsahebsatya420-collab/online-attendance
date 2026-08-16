const Attendance =
    require("../models/attendece");

const User =
    require("../models/User");


// MARK BULK ATTENDANCE
const markAttendance = async (
    req,
    res
) => {

    try {

        const {
            date,
            attendance
        } = req.body;


        if (
            !date ||
            !Array.isArray(attendance)
        ) {

            return res.status(400).json({

                message:
                    "Invalid attendance data"

            });
        }


        const attendanceDate =
            new Date(date);

        attendanceDate.setHours(
            0,
            0,
            0,
            0
        );


        for (
            const item of attendance
        ) {

            await Attendance.findOneAndUpdate(

                {
                    student:
                        item.studentId,

                    date:
                        attendanceDate
                },

                {

                    student:
                        item.studentId,

                    date:
                        attendanceDate,

                    status:
                        item.status,

                    markedBy:
                        req.user._id

                },

                {
                    upsert: true,
                    new: true
                }
            );
        }


        res.json({

            message:
                "Attendance saved successfully"

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


// STUDENT OWN ATTENDANCE
const getMyAttendance = async (
    req,
    res
) => {

    try {

        const records =
            await Attendance.find({

                student:
                    req.user._id

            })

                .populate(
                    "markedBy",
                    "name"
                )

                .sort({
                    date: -1
                });


        const total =
            records.length;


        const present =
            records.filter(
                record =>
                    record.status ===
                    "present"
            ).length;


        const absent =
            records.filter(
                record =>
                    record.status ===
                    "absent"
            ).length;


        const percentage =
            total === 0
                ? 0
                : (
                    present /
                    total *
                    100
                ).toFixed(2);


        res.json({

            records,

            summary: {

                total,

                present,

                absent,

                percentage

            }

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


// ADMIN ALL ATTENDANCE
const getAllAttendance = async (
    req,
    res
) => {

    try {

        const {
            date
        } = req.query;


        let query = {};


        if (date) {

            const start =
                new Date(date);

            start.setHours(
                0,
                0,
                0,
                0
            );


            const end =
                new Date(date);

            end.setHours(
                23,
                59,
                59,
                999
            );


            query.date = {

                $gte: start,

                $lte: end

            };
        }


        const records =
            await Attendance.find(query)

                .populate(
                    "student",
                    "name email rollNumber course"
                )

                .populate(
                    "markedBy",
                    "name"
                )

                .sort({
                    date: -1
                });


        res.json(records);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


// GET ATTENDANCE SUMMARY FOR DASHBOARD
const getAttendanceSummary = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const totalStudents = await User.countDocuments({ role: "student" });
        
        const markedToday = await Attendance.find({
            date: { $gte: today, $lt: tomorrow }
        }).distinct("student");
        
        const presentToday = await Attendance.countDocuments({
            date: { $gte: today, $lt: tomorrow },
            status: "present"
        });

        const totalMarked = markedToday.length;
        const percentage = totalMarked === 0 ? 0 : ((presentToday / totalMarked) * 100).toFixed(2);

        res.json({
            totalStudents,
            totalMarked,
            present: presentToday,
            absent: totalMarked - presentToday,
            percentage: Number(percentage)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET ATTENDANCE FOR SPECIFIC DATE
const getAttendanceByDate = async (req, res) => {
    try {
        const { date } = req.params;

        const start = new Date(date);
        start.setHours(0, 0, 0, 0);

        const end = new Date(date);
        end.setHours(23, 59, 59, 999);

        // Get all students
        const students = await User.find({ role: "student" }).select("-password");

        // Get attendance records for this date
        const attendanceRecords = await Attendance.find({
            date: { $gte: start, $lte: end }
        });

        // Map students with their attendance status
        const records = students.map(student => {
            const attendance = attendanceRecords.find(a => a.student.toString() === student._id.toString());
            return {
                student: {
                    _id: student._id,
                    name: student.name,
                    email: student.email,
                    rollNumber: student.rollNumber,
                    course: student.course
                },
                attendance: attendance || null
            };
        });

        res.json(records);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {

    markAttendance,

    getMyAttendance,

    getAllAttendance,

    getAttendanceSummary,

    getAttendanceByDate

};