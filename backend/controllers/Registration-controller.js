const { User } = require('../models');

const adminRegistration = async (req, res) => {
    try {

        const { email, password } = req.body;
        const login = await User.create({
            email: email,
            password: password,
            role: 2,
        });
        return res.status(201).json({
            success: true,
            message: ' added successfully!',
        });

    } catch (error) {
        console.error('Error Occured:', error);
        return res.status(500).json({
            error: 'An error occurred while Logging In',
        });
    }
};

const userRegistration = async (req, res) => {
    try {

        const { email, password } = req.body;
        const login = await User.create({
            email: email,
            password: password,
            role: 2,
        });
        return res.status(201).json({
            success: true,
            message: ' added successfully!',
        });

    } catch (error) {
        console.error('Error Occured:', error);
        return res.status(500).json({
            error: 'An error occurred while Logging In',
        });
    }
};

module.exports = {
    adminRegistration, userRegistration
};