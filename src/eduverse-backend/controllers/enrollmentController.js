const db = require('../config/db');

// Ghi danh vào khóa học (Chỉ 'Học viên' mới có thể ghi danh)
exports.enrollInCourse = (req, res) => {
    const { course_id } = req.body;
    const userId = req.user.user_id; // Giả sử req.user chứa thông tin người dùng đã xác thực
    const userRole = req.user.role;

    if (userRole !== 'Học viên') {
        return res.status(403).json({ message: "Chỉ Học viên mới có thể ghi danh vào khóa học" });
    }

    // Kiểm tra xem học viên đã ghi danh vào khóa học này chưa
    const checkEnrollmentSql = 'SELECT * FROM enrollments WHERE student_id = ? AND course_id = ?';
    db.query(checkEnrollmentSql, [userId, course_id], (checkErr, checkResult) => {
        if (checkErr) {
            return res.status(500).json({ message: "Lỗi server" });
        }
        if (checkResult.length > 0) {
            return res.status(400).json({ message: "Học viên đã ghi danh vào khóa học này" });
        }

        const enrollId = `E${Date.now()}`; // Tạo enrollment_id (Giả sử sử dụng timestamp)
        const enrollSql = 'INSERT INTO enrollments (enrollment_id, student_id, course_id, enrolled_at, status) VALUES (?, ?, ?, CURRENT_TIMESTAMP, "Đang học")';
        const values = [enrollId, userId, course_id];
        db.query(enrollSql, values, (enrollErr, result) => {
            if (enrollErr) {
                return res.status(500).json({ message: "Lỗi server" });
            }
            return res.status(201).json({ message: "Ghi danh thành công", enrollId });
        });
    });
};

// Xem danh sách khóa học đã ghi danh (Chỉ người dùng hoặc 'Quản trị viên' mới được xem danh sách ghi danh)
exports.getEnrolledCourses = (req, res) => {
    const userId = req.user.user_id; // Giả sử req.user chứa thông tin người dùng đã xác thực
    const userRole = req.user.role;
    const { student_id } = req.params; // Lấy student_id từ params nếu có (dành cho Quản trị viên)

    // Nếu là 'Học viên', chỉ cho phép xem danh sách của chính họ
    if (userRole === 'Học viên' && userId !== student_id) {
        return res.status(403).json({ message: "Chỉ được phép xem danh sách ghi danh của bản thân" });
    }

    // Nếu là 'Quản trị viên', cho phép xem danh sách ghi danh của bất kỳ ai
    const searchStudentId = userRole === 'Quản trị viên' ? student_id : userId;
    const sql = `
        SELECT c.*
        FROM enrollments e
        JOIN courses c ON e.course_id = c.course_id
        WHERE e.student_id = ?
    `;
    db.query(sql, [searchStudentId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Lỗi server" });
        }
        return res.status(200).json(results);
    });
};