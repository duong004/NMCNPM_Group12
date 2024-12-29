// models/UserModel.js
const db = require('../config/db');

exports.getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users WHERE `email` = ?';
        db.query(sql, [email], (err, data) => {
            if (err) reject(err);
            else resolve(data[0]);
        });
    });
};

exports.getUserById = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users WHERE `user_id` = ?';
        db.query(sql, [userId], (err, data) => {
            if (err) reject(err);
            else resolve(data[0]);
        });
    });
};

exports.createUser = (userId, name, email, hashedPassword, role) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO `users` (`user_id`, `name`, `email`, `password`, `role`) VALUES (?)';
        const values = [userId, name, email, hashedPassword, role || 'Học viên'];
        db.query(sql, [values], (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
};

exports.updateLastLogin = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE users SET last_login = ? WHERE user_id = ?';
        db.query(sql, [new Date(), userId], (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
};

exports.updateTokenReset = (userId, token) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE users SET token_reset = ? WHERE user_id = ?';
        db.query(sql, [token, userId], (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
};

exports.resetPassword = (userId, hashedPassword) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE users SET password = ?, token_reset = NULL WHERE user_id = ?';
        db.query(sql, [hashedPassword, userId], (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
};

// Các hàm lấy thông tin liên quan (courses, notifications, payments, personalInfo)
exports.getCoursesEnrolled = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM enrollments WHERE `student_id` = ?';
        db.query(sql, [userId], (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
};

exports.getNotifications = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM notifications WHERE `user_id` = ?';
        db.query(sql, [userId], (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
};

exports.getPayments = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM payments WHERE `student_id` = ?';
        db.query(sql, [userId], (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
};

exports.getPersonalInfo = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM personal WHERE `user_id` = ?';
        db.query(sql, [userId], (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
};
