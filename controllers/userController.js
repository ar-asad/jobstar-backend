const User = require("./../models/userModels");
const { catchAsync } = require("../utilis/catchAsync");


// Controllers
const updateMe = catchAsync(async (req, res, next) => {
    const updatedData = {};

    Object.keys(req.body).forEach((val) => {
        if (["name", "email", "location"].includes(val)) {
            updatedData[val] = req.body[val];
        }
    });

    const updatedUser = await User.findByIdAndUpdate(req.user.id, updatedData, {
        new: true,
        runValidators: true,
    });
    updatedUser.__v = undefined;
    res
        .status(200)
        .send({ status: "success", token: req.token, data: { user: updatedUser } });
});

module.exports = { updateMe };