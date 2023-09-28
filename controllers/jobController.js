
const Job = require("./../models/jobModels");
const APIFeatures = require("./../utilis/apiFeatures");
const AppError = require("./../utilis/appError");
const { catchAsync } = require("./../utilis/catchAsync");


// Controllers
const createAJob = catchAsync(async (req, res, next) => {
    const newJob = await Job.create(req.body);
    newJob.__v = undefined;
    res.status(201).send({ status: "success", data: { job: newJob } });
});
const getAllJobs = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Job.find(), req.query)
        .filter()
        .sort()
        .pagination();

    const featuresFilter = new APIFeatures(Job.find(), req.query).filter();
    const filtersQuery = await featuresFilter.query;
    const totalJobs = filtersQuery.length;

    const jobs = await features.query;
    const page = req.query.page;
    const numOfPages = Math.ceil(totalJobs / 10);

    res.status(200).send({
        status: "success",
        results: 30,
        data: {
            jobs,
            totalJobs,
            page,
            numOfPages,
        },
    });
});

const deleteAJob = catchAsync(async (req, res, next) => {
    const doc = await Job.findByIdAndDelete(req.params.id);
    if (!doc) {
        return next(new AppError("No job information found with that ID", 404));
    }
    res.status(204).send({ status: "successfully deleted", data: null });
});

const updateAJob = catchAsync(async (req, res, next) => {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!updatedJob) {
        return next(new AppError("No job information found with that ID", 404));
    }

    res.status(200).send({
        status: "successfully updated",
        data: {
            updatedJob,
        },
    });
});

const getStats = catchAsync(async (req, res, next) => {
    const stats = await Job.aggregate([
        {
            $match: {},
        },
        {
            $group: {
                _id: "$status",
                numberOfTotalStats: { $sum: 1 },
            },
        },
    ]);

    const statsObj = {};
    stats.map((val) => (statsObj[val._id] = val.numberOfTotalStats));

    res.status(200).send({
        status: "success",
        data: {
            stats: statsObj,
        },
    });
});

module.exports = {
    createAJob,
    getAllJobs,
    deleteAJob,
    updateAJob,
    getStats,
    // getMonthlyStats,
};
