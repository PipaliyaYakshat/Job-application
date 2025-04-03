const UM = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signupUser = async function (req, res) {
    try {

        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        const { email, password } = req.body;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status: "fail",
                message: "Please enter a valid Gmail address (must end with @gmail.com)."
            });
        }

        const existingUser = await UM.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({
                status: "fail",
                message: 'User with this email already exists.'
            });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                status: "fail",
                message: "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character."
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const createdata = await UM.create({ ...req.body, password: hashedPassword });

        const token = jwt.sign({ id: createdata._id }, Secure_key);


        return res.status(201).json({
            status: "success",
            message: 'User registered successfully',
            data: createdata,
            token
        });
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: error.message
        });
    }
};

exports.loginUser = async function (req, res) {
    try {
        let logindata = await UM.findOne({ email: req.body.email, });
        if (!logindata) {
            return res.status(400).json({
                status: "fail",
                message: 'Invalid email '
            });
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password, logindata.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                status: "Fail",
                message: "Invalid password"
            });
        }

        return res.status(200).json({
            status: "success",
            message: 'Login successful',
            data: logindata
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "fail",
            message: error.message
        });
    }
};

exports.viewAllUsers = async function (req, res) {
    try {
        const users = await UM.find();

        return res.status(200).json({
            status: "success",
            message: "Users fetched successfully!",
            users
        });
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: error.message
        });
    }
};

exports.updateUser = async function (req, res) {
    try {

        const updatedata = await UM.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedata) {
            return res.status(404).json({
                status: "fail",
                message: "User not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "User updated successfully!",
            data: updatedata
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        });
    }
};

exports.deleteUser = async function (req, res) {
    try {

        const deletedata = await UM.findByIdAndDelete(req.params.id);

        if (!deletedata) {
            return res.status(404).json({
                status: "fail",
                message: "User not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "User deleted successfully!",
            data: deletedata
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        });
    }
};
