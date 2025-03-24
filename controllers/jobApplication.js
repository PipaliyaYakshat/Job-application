const JM = require('../models/jobApplication');
const JLM = require('../models/jobListing');
const UM = require('../models/user');

exports.createJobApplication = async (req, res) => {
    try {
        const { userId, JobListingId } = req.body;

        if (!req.files || !req.files.resume || !req.files.coverLetter) {
            return res.status(400).json({
                status: 'fail',
                message: 'Both resume and cover letter are required.',
            });
        }

        if (req.files) {
            if (req.files.resume && req.files.resume.length > 0) {
                req.body.resume = req.files.resume.map(file => file.filename);
            }
            if (req.files.coverLetter && req.files.coverLetter.length > 0) {
                req.body.coverLetter = req.files.coverLetter.map(file => file.filename);
            }
        }

        const jobListing = await JLM.findById(JobListingId);
        if (!jobListing) {
            return res.status(404).json({
                status: "fail",
                message: "Job listing not found",
            });
        }
        const user = await UM.findById(userId);
        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "User not found",
            });
        }

        const jobApplication = await JM.create(req.body);

        res.status(201).json({
            status: "success",
            message: "Job application created successfully",
            data: jobApplication,
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};



exports.allJobApplications = async (req, res) => {
    try {
        const jobApplications = await JM.find()
            .populate('userId')
            .populate('JobListingId');

        res.status(200).json({
            status: "success",
            message: "Job applications fetched successfully",
            data: jobApplications,
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};

exports.oneJobApplication = async (req, res) => {
    try {
        const jobApplication = await JM.findById(req.params.id)
            .populate('userId')
            .populate('JobListingId');
        if (!jobApplication) {
            return res.status(404).json({
                status: "fail",
                message: "Job application not found",
            });
        }

        res.status(200).json({
            status: "success",
            message: "Job application fetched successfully",
            data: jobApplication,
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};

exports.updateJobApplication = async (req, res) => {
    try {
        const updatedJobApplication = await JM.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedJobApplication) {
            return res.status(404).json({
                status: "fail",
                message: "Job application not found",
            });
        }

        res.status(200).json({
            status: "success",
            message: "Job application updated successfully",
            data: updatedJobApplication,
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};

exports.deleteJobApplication = async (req, res) => {
    try {
        const deletedJobApplication = await JM.findByIdAndDelete(req.params.id);
        if (!deletedJobApplication) {
            return res.status(404).json({
                status: "fail",
                message: "Job application not found",
            });
        }

        res.status(200).json({
            status: "success",
            message: "Job application deleted successfully",
            data: deletedJobApplication,
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};
