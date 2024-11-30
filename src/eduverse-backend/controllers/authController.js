// Xử lý logic cho các yêu cầu xác thực.

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const { sendEmail } = require('../utils/emailService');

exports.register = async (req, res) => {
    // ... logic for register
};

exports.login = async (req, res) => {
    // ... logic for login
};

exports.verifyOTP = async (req, res) => {
    // ... logic for OTP verification
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
        const resetLink = `http://yourdomain.com/reset-password/${token}`;
        await sendEmail(user.email, 'Reset Password', 'forgotPasswordTemplate', { RESET_LINK: resetLink });
        res.json({ message: 'Reset link sent to your email' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
        const decoded = jwt.verify(token, 'secret');
        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.password = await bcrypt.hash(password, 10);
        await user.save();
        await sendEmail(user.email, 'Password Reset Successful', 'resetPasswordTemplate', {});
        res.json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};