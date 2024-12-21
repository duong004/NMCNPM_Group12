// Định tuyến cho các API liên quan đến khóa học.

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
// const authMiddleware = require('../middlewares/authMiddleware');

router.get('/list', courseController.listCourses);
router.get('/me/list', courseController.listMeCourses);
router.get('/:id', courseController.getCourseById);
router.post('/create', courseController.createCourse);
// router.put('/:id', authMiddleware.authenticate, courseController.updateCourse);
// router.delete('/:id', authMiddleware.authenticate, courseController.deleteCourse);

module.exports = router;