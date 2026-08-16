const User =
    require("../models/User");


// GET ALL USERS
const getAllUsers = async (
    req,
    res
) => {

    try {

        const users =
            await User.find()

                .select(
                    "-password"
                )

                .sort({
                    createdAt: -1
                });


        res.json(users);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


// MAKE ADMIN
const makeAdmin = async (
    req,
    res
) => {

    try {

        const user =
            await User.findById(
                req.params.id
            );


        if (!user) {

            return res.status(404).json({

                message:
                    "User not found"

            });
        }


        user.role = "admin";

        await user.save();


        res.json({

            message:
                `${user.name} is now an admin`

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


// REMOVE ADMIN
const removeAdmin = async (
    req,
    res
) => {

    try {

        const user =
            await User.findById(
                req.params.id
            );


        if (!user) {

            return res.status(404).json({

                message:
                    "User not found"

            });
        }


        // Admin khud ko remove nahi kar sakta

        if (
            user._id.toString() ===
            req.user._id.toString()
        ) {

            return res.status(400).json({

                message:
                    "You cannot remove yourself"

            });
        }


        user.role = "student";

        await user.save();


        res.json({

            message:
                `${user.name} is now a student`

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {

    getAllUsers,

    makeAdmin,

    removeAdmin

};