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


module.exports = {

    markAttendance,

    getMyAttendance,

    getAllAttendance

};