const express = require("express");

const {
    markAttendance,
    getMyAttendance,
    getAllAttendance
} =
    require(
        "../controllers/attendenceController"
    );


const {
    protect
} =
    require(
        "../middleware/authMiddleware"
    );


const {
    adminOnly
} =
    require(
        "../middleware/roleMiddleware"
    );


const router =
    express.Router();


router.get(
    "/my",
    protect,
    getMyAttendance
);


router.get(
    "/all",
    protect,
    adminOnly,
    getAllAttendance
);


router.post(
    "/mark",
    protect,
    adminOnly,
    markAttendance
);


module.exports = router;