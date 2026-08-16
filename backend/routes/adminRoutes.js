const express = require("express");


const {
    getAllUsers,
    makeAdmin,
    removeAdmin
} =
    require(
        "../controllers/adminController"
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
    "/users",
    protect,
    adminOnly,
    getAllUsers
);


router.put(
    "/make-admin/:id",
    protect,
    adminOnly,
    makeAdmin
);


router.put(
    "/remove-admin/:id",
    protect,
    adminOnly,
    removeAdmin
);


module.exports = router;