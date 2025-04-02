const PM = require('../models/profile');

exports.createProfile = async (req, res) => {
    try {
        const profile = req.body;

        if (req.file) {
            profile.profilePicture = req.file.filename;
        }

        await PM.create(profile);
        res.status(201).json({
            status: "success",
            message: "Profile data created successfully",
            data: profile,
        });

    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};

exports.allProfiles = async (req, res) => {
    try {
        const profiles = await PM.find().populate([
            { path: 'userId' },
        ]);

        res.status(201).json({
            status: "success",
            message: "Profiles data fetched successfully",
            data: profiles
        });

    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message,
        });
    }
};

exports.oneProfile = async (req, res) => {
    try {
        const profile = await PM.findById(req.params.id).populate([
            { path: 'userId' }
        ]);
        if (!profile) {
            return res.status(404).json({ message: 'Profile data not found' });
        }
        res.status(201).json({
            status: "success",
            message: "Profile data fetched successfully",
            data: profile,
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message,
        });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const updatedProfile = await PM.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProfile) {
            return res.status(404).json({ message: 'Profile data not found' });
        }
        res.status(201).json({
            status: "success",
            message: "Profile data updated successfully",
            data: updatedProfile,
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message,
        });
    }
};

exports.deleteProfile = async (req, res) => {
    try {
        const deletedProfile = await PM.findByIdAndDelete(req.params.id);
        if (!deletedProfile) {
            return res.status(404).json({ message: 'Profile data not found' });
        }
        res.status(201).json({
            status: "success",
            message: "Profile data deleted successfully",
            data: deletedProfile,
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message,
        });
    }
};
