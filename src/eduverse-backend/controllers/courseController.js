// Xử lý logic cho các yêu cầu liên quan đến khóa học.

const db = require('../config/db');

// Hàm tạo course_id theo cấu trúc C + số thứ tự
const generateCourseId = (courseCount) => {
    const courseIdNumber = courseCount + 1;
    return `C${courseIdNumber.toString().padStart(3, '0')}`;
};

// Tạo khóa học mới
exports.createCourse = (req, res) => {
    const { course_name, description, teacher_id } = req.body;

    // Đếm số lượng khóa học hiện có để tạo course_id
    const countCoursesSql = 'SELECT COUNT(*) as count FROM courses';
    db.query(countCoursesSql, (countErr, countData) => {
        if (countErr) {
            return res.status(500).json({ message: "Lỗi server" });
        }
        const courseId = generateCourseId(countData[0].count);
        const insertSql = 'INSERT INTO courses (course_id, course_name, description, teacher_id) VALUES (?, ?, ?, ?)';
        const values = [courseId, course_name, description, teacher_id];
        db.query(insertSql, values, (insertErr, result) => {
            if (insertErr) {
                return res.status(500).json({ message: "Lỗi server" });
            }
            return res.status(201).json({ message: "Khóa học đã được tạo", courseId });
        });
    });
};

// Lấy danh sách khóa học
exports.listCourses = (req, res) => {
    const sql = 'SELECT * FROM courses';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Lỗi server" });
        }
        return res.status(200).json(results);
    });
};

// Lấy thông tin khóa học theo ID
exports.getCourseById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM courses WHERE course_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Lỗi server" });
        }
        return res.status(200).json(result);
    });
};

// Cập nhật khóa học
exports.updateCourse = (req, res) => {
    const { id } = req.params;
    const { course_name, description } = req.body;
    const sql = 'UPDATE courses SET course_name = ?, description = ? WHERE course_id = ?';
    db.query(sql, [course_name, description, id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Lỗi server" });
        }
        return res.status(200).json({ message: "Khóa học đã được cập nhật" });
    });
};

// Xóa khóa học
exports.deleteCourse = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM courses WHERE course_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Lỗi server" });
        }
        return res.status(200).json({ message: "Khóa học đã được xóa" });
    });
};