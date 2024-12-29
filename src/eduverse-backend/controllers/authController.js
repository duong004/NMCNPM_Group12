// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');
const UserController = require('./userController');
const sendEmail = require('../utils/emailService');

// Hàm tạo user_id theo cấu trúc U + số thứ tự
const generateUserId = (userCount) => {
    const userIdNumber = userCount + 1;
    return `U${userIdNumber.toString().padStart(3, '0')}`;
};

// Đăng ký người dùng mới
exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const existingUser = await UserModel.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "Email đã tồn tại" });
        }

        const countUsersSql = 'SELECT COUNT(*) as count FROM users';
        db.query(countUsersSql, async (countErr, countData) => {
            if (countErr) {
                return res.status(500).json({ message: "Lỗi server" });
            }
            const userId = generateUserId(countData[0].count);
            const hashedPassword = await bcrypt.hash(password, 10);
            await UserModel.createUser(userId, name, email, hashedPassword, role);
            return res.status(201).json({ message: "Đăng ký thành công" });
        });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi server" });
    }
};

// Đăng nhập người dùng
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Mật khẩu không đúng" });
        }

        const token = jwt.sign({ id: user.user_id }, 'secret', { expiresIn: '1h' });
        const userData = await UserController.getUserData(user.user_id);

        await UserModel.updateLastLogin(user.user_id);

        return res.status(200).json({ message: "Đăng nhập thành công", token, user, userData });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi server" });
    }
};

// Quên mật khẩu
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await UserModel.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }

        const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
        
        await UserModel.updateTokenReset(user.user_id, token);
        await sendEmail(user.email, 'Đặt lại mật khẩu', 'forgotPasswordTemplate', { RESET_LINK: resetLink });

        return res.json({ message: 'Đã gửi liên kết đặt lại mật khẩu đến email của bạn' });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi server" });
    }
};

// Đặt lại mật khẩu
exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    if (!password || password.length < 8) {
        return res.status(400).json({ message: "Yêu cầu không hợp lệ." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.getUserById(decoded.id);
        if (!user || user.token_reset !== token) {
            return res.status(400).json({ message: "Yêu cầu không hợp lệ." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.resetPassword(user.user_id, hashedPassword);

        return res.json({ message: 'Đặt lại mật khẩu thành công.' });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi server" });
    }
};

