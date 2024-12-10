// Xử lý logic cho các yêu cầu xác thực.

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { sendEmail } = require('../utils/emailService');

// Hàm tạo user_id theo cấu trúc U + số thứ tự
const generateUserId = (userCount) => {
    const userIdNumber = userCount + 1;
    return `U${userIdNumber.toString().padStart(3, '0')}`;
};

// Đăng ký người dùng mới
exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;
    console.log(req.body)
    try {
        // Kiểm tra xem email đã tồn tại chưa
        const checkEmailSql = 'SELECT * FROM users WHERE `email` = ?';
        db.query(checkEmailSql, [email], async (err, data) => {
            if (err) {
                
                return res.status(500).json({ message: "Lỗi server" });
            }
            if (data.length > 0) {
                return res.status(400).json({ message: "Email đã tồn tại" });
            }
       
            // Đếm số lượng người dùng hiện có để tạo user_id
            const countUsersSql = 'SELECT COUNT(*) as count FROM users';
            db.query(countUsersSql, async (countErr, countData) => {
                if (countErr) {
                    return res.status(500).json({ message: "Lỗi server" });
                }
                const userId = generateUserId(countData[0].count);
                const hashedPassword = await bcrypt.hash(password, 10);
                const insertSql = 'INSERT INTO `users` (`user_id`, `name`, `email`, `password`, `role`) VALUES (?)';
                const values = [userId, name, email, hashedPassword, role || 'Học viên'];
                db.query(insertSql, [values], (insertErr, insertData) => {
                    if (insertErr) {
                        return res.status(500).json({ message: "Lỗi server" });
                    }
                    return res.status(201).json({ message: "Đăng ký thành công" });
                });
            });
        });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi server" });
    }
};

// Đăng nhập người dùng
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const sql = 'SELECT * FROM users WHERE `email` = ?';
        db.query(sql, [email], async (err, data) => {
            if (err) {
                return res.status(500).json({ message: "Lỗi server" });
            }
            if (data.length === 0) {
                return res.status(404).json({ message: "Người dùng không tồn tại" });
            }
            const user = data[0];
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Mật khẩu không đúng" });
            }
            const token = jwt.sign({ id: user.user_id }, 'secret', { expiresIn: '1h' });
            // Cập nhật last_login
            const updateLastLoginSql = 'UPDATE users SET last_login = ? WHERE user_id = ?';
            db.query(updateLastLoginSql, [new Date(), user.user_id], (updateErr) => {
                if (updateErr) {
                    return res.status(500).json({ message: "Lỗi server khi cập nhật thông tin đăng nhập" });
                }
                return res.status(200).json({ message: "Đăng nhập thành công", token });
            });
        });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi server" });
    }
};

// Xác minh OTP
exports.verifyOTP = async (req, res) => {
    // Logic xác minh OTP
};

// Quên mật khẩu
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const sql = 'SELECT * FROM users WHERE `email` = ?';
        db.query(sql, [email], async (err, data) => {
            if (err) {
                return res.status(500).json({ message: "Lỗi server" });
            }
            if (data.length === 0) {
                return res.status(404).json({ message: "Người dùng không tồn tại" });
            }
            const user = data[0];
            const token = jwt.sign({ id: user.user_id }, 'secret', { expiresIn: '1h' });
            const resetLink = `http://localhost:3000/reset-password/${token}`;
            await sendEmail(user.email, 'Reset Password', 'forgotPasswordTemplate', { RESET_LINK: resetLink });
            return res.json({ message: 'Đã gửi liên kết đặt lại mật khẩu đến email của bạn' });
        });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi server" });
    }
};

// Đặt lại mật khẩu
exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
        const decoded = jwt.verify(token, 'secret');
        const sql = 'SELECT * FROM users WHERE `user_id` = ?';
        db.query(sql, [decoded.id], async (err, data) => {
            if (err) {
                return res.status(500).json({ message: "Lỗi server" });
            }
            if (data.length === 0) {
                return res.status(404).json({ message: "Người dùng không tồn tại" });
            }
            const user = data[0];
            const hashedPassword = await bcrypt.hash(password, 10);
            const updateSql = 'UPDATE users SET `password` = ? WHERE `user_id` = ?';
            db.query(updateSql, [hashedPassword, user.user_id], async (updateErr) => {
                if (updateErr) {
                    return res.status(500).json({ message: "Lỗi server" });
                }
                await sendEmail(user.email, 'Password Reset Successful', 'resetPasswordTemplate', {});
                return res.json({ message: 'Password reset successful' });
            });
        });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi server" });
    }
};