const express = require('express');
const {
    createAJob,
    getAllJobs,
    deleteAJob,
    updateAJob,
    getStats,
    // getMonthlyStats,
} = require("./../controllers/jobController");

// Routs
const router = express.Router();

router.get("/get-stats", getStats);
// router.get("/get-monthly-stats", getMonthlyStats);

router.post("/add-job", createAJob);
router.get("/", getAllJobs);
router.route("/:id").delete(deleteAJob).patch(updateAJob);

module.exports = router;


