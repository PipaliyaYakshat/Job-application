const CM = require('../models/company');

exports.createCompany = async (req, res) => {
    try {
        const companyData = req.body;

        const company = await CM.create(companyData);
        res.status(201).json({
            status: "success",
            message: "Company data created successfully",
            data: company,
        });

    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};

exports.allCompanies = async (req, res) => {
    try {
        const companies = await CM.find().populate('userId')

        res.status(200).json({
            status: "success",
            message: "Companies data fetched successfully",
            data: companies,
        });

    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};

exports.oneCompany = async (req, res) => {
    try {
        const company = await CM.findById(req.params.id).populate('userId');
        if (!company) {
            return res.status(404).json({
                message: 'Company data not found'
            });
        }

        res.status(200).json({
            status: "success",
            message: "Company data fetched successfully",
            data: company,
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};

exports.updateCompany = async (req, res) => {
    try {
        const updatedCompany = await CM.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCompany) {
            return res.status(404).json({
                message:
                    'Company data not found'
            });
        }

        res.status(200).json({
            status: "success",
            message: "Company data updated successfully",
            data: updatedCompany,
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};

exports.deleteCompany = async (req, res) => {
    try {
        const deletedCompany = await CM.findByIdAndDelete(req.params.id);
        if (!deletedCompany) {
            return res.status(404).json({
                message:
                    'Company data not found'
            });
        }

        res.status(200).json({
            status: "success",
            message: "Company data deleted successfully",
            data: deletedCompany,
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};
