const JM = require('../models/jobListing');

exports.createJobListing = async (req, res) => {
    try {
        const jobListingData = req.body;

        const jobListing = await JM.create(jobListingData);
        res.status(201).json({
            status: "success",
            message: "Job listing created successfully",
            data: jobListing,
        });

    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};


exports.allJobListings = async (req, res) => {
    try {
        const jobListings = await JM.find().populate('companyId');

        res.status(200).json({
            status: "success",
            message: "Job listings fetched successfully",
            data: jobListings,
        });

    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};

exports.oneJobListing = async (req, res) => {
    try {
        const jobListing = await JM.findById(req.params.id).populate('companyId');
        if (!jobListing) {
            return res.status(404).json({
                message: 'Job listing not found'
            });
        }

        res.status(200).json({
            status: "success",
            message: "Job listing fetched successfully",
            data: jobListing,
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};

exports.updateJobListing = async (req, res) => {
    try {
        const updatedJobListing = await JM.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedJobListing) {
            return res.status(404).json({
                message: 'Job listing not found'
            });
        }

        res.status(200).json({
            status: "success",
            message: "Job listing updated successfully",
            data: updatedJobListing,
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};

exports.deleteJobListing = async (req, res) => {
    try {
        const deletedJobListing = await JM.findByIdAndDelete(req.params.id);
        if (!deletedJobListing) {
            return res.status(404).json({
                message: 'Job listing not found'
            });
        }

        res.status(200).json({
            status: "success",
            message: "Job listing deleted successfully",
            data: deletedJobListing,
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};
