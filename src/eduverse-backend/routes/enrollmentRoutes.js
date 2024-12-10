const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/enroll', authMiddleware, enrollmentController.enrollInCourse);
router.get('/enrolled-courses/:student_id?', authMiddleware, enrollmentController.getEnrolledCourses);

module.exports = router;