const JM = require('../models/jobApplicationStatus');
const UM = require('../models/user');
const nodemailer = require('nodemailer');

exports.createJobApplicationStatus = async (req, res) => {
    try {


        const jobApplicationStatus = await JM.create(req.body);

        const user = await UM.findById(req.body.user);

        if (user) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'pipaliyayakshat2024.katargam@gmail.com',
                    pass: 'ghswudkgrjiuoanf'
                }
            });

            const mailOptions = {
                from: 'pipaliyayakshat2024.katargam@gmail.com',
                to: user.email,
                subject: 'Job Application Status',
                text: `Dear ${user.username},\n\n Your job application status has been updated.\n Here are the details:\n Status: ${jobApplicationStatus.status} \nBest regards.`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error sending email: ', error);
                    return res.status(500).json({
                        status: "fail",
                        message: "Payment created, but email could not be sent."
                    });
                }
            });
        }

        res.status(201).json({
            status: "success",
            message: "Job application status created successfully",
            data: jobApplicationStatus,
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};


exports.allJobApplicationStatuses = async (req, res) => {
    try {
        const jobApplicationStatuses = await JM.find().populate('JobApplicationId');

        res.status(200).json({
            status: "success",
            message: "Job application statuses fetched successfully",
            data: jobApplicationStatuses,
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};

exports.oneJobApplicationStatus = async (req, res) => {
    try {
        const jobApplicationStatus = await JM.findById(req.params.id).populate('JobApplicationId');

        if (!jobApplicationStatus) {
            return res.status(404).json({
                status: "fail",
                message: 'Job application status not found',
            });
        }

        res.status(200).json({
            status: "success",
            message: "Job application status fetched successfully",
            data: jobApplicationStatus,
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};

exports.updateJobApplicationStatus = async (req, res) => {
    try {


        const updatedJobApplicationStatus = await JM.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedJobApplicationStatus) {
            return res.status(404).json({
                status: "fail",
                message: 'Job application status not found',
            });
        }

        res.status(200).json({
            status: "success",
            message: "Job application status updated successfully",
            data: updatedJobApplicationStatus,
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};


exports.deleteJobApplicationStatus = async (req, res) => {
    try {
        const deletedJobApplicationStatus = await JM.findByIdAndDelete(req.params.id);

        if (!deletedJobApplicationStatus) {
            return res.status(404).json({
                status: "fail",
                message: 'Job application status not found',
            });
        }

        res.status(200).json({
            status: "success",
            message: "Job application status deleted successfully",
            data: deletedJobApplicationStatus,
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};
