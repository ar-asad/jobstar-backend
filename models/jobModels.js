const mongoose = require('mongoose');

// Schema
const jobSchema = new mongoose.Schema({
    position: {
        type: String,
        required: [true, 'Job must have a position'],
        trim: true,
        lowercase: true,
    },
    company: {
        type: String,
        required: [true, 'Job must have a position']KeyboardEvent,
        trim: true
    },
    jobLocation: {
        type: String,
        required: [true, 'job must have a location'],
        trim: true,
        lowercase: true,
    },
    status: {
        type: String,
        required: [true, 'job must have a type'],
        trim: true,
        lowercase: true,
        enum: {
            values: ["full-time", "part-time", "remote", "internship"],
            message:
                "Invalid data for status. (full-time/part-time/remote/internship)",
        },
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },
});

// Model
const Job = mongoose.model('Job', jobSchema);

module.exports = Job;