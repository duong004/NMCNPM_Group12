// controllers/userController.js
const UserModel = require('../models/UserModel');

exports.getUserData = async (userId) => {
    try {
        const [coursesEnrolled, notifications, payments, personalInfo] = await Promise.all([
            UserModel.getCoursesEnrolled(userId),
            UserModel.getNotifications(userId),
            UserModel.getPayments(userId),
            UserModel.getPersonalInfo(userId)
        ]);
        
        return { coursesEnrolled, notifications, payments, personalInfo };
    } catch (error) {
        throw new Error('Lỗi khi lấy dữ liệu người dùng');
    }
};
