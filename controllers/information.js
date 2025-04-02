const IM = require('../models/information');

exports.createInformation = async (req, res) => {
    try {
        const Information = req.body;

        await IM.create(Information);

        res.status(201).json({
            status: "success",
            message: "Information created successfully",
            data: Information,
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};

exports.allInformation = async (req, res) => {
    try {
        const Informations = await IM.find().populate([
            { path: 'userId', select: 'username email password role' },
            { path: 'ProfileId' },
            { path: 'CompanyId' },
            { path: 'JobListingId' },
            { path: 'JobApplicationId', select: 'resume coverLetter appliedAt' },
            { path: 'JobApplicationStatusId', select: 'status ' }
        ]);

        res.status(200).json({
            status: "success",
            message: "Information fetched successfully",
            data: Informations
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};

exports.oneInformation = async (req, res) => {
    try {
        const Information = await IM.findById(req.params.id).populate([
            { path: 'userId' },
            { path: 'JobListingId' },
            { path: 'JobApplicationId' },
            { path: 'JobApplicationStatusId' }
        ]);

        if (!Information) {
            return res.status(404).json({
                 message: 'Information not found' 
                });
        }

        res.status(200).json({
            status: "success",
            message: "Information fetched successfully",
            data: Information,
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};

exports.updateInformation = async (req, res) => {
    try {
        const updatedInformation = await IM.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedInformation) {
            return res.status(404).json({ 
                message: 'Information not found' 
            });
        }

        res.status(200).json({
            status: "success",
            message: "Information updated successfully",
            data: updatedInformation,
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};

exports.deleteInformation = async (req, res) => {
    try {
        const deletedInformation = await IM.findByIdAndDelete(req.params.id);

        if (!deletedInformation) {
            return res.status(404).json({
                 message: 'Information not found'
                 });
        }

        res.status(200).json({
            status: "success",
            message: "Information deleted successfully",
            data: deletedInformation,
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};
