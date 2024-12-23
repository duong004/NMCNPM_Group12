// Định tuyến cho các API liên quan đến khóa học.

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
//const authMiddleware = require('../middlewares/authMiddleware');

// router.post('/create', authMiddleware.authenticate, courseController.createCourse);
// router.get('/list', courseController.listCourses);
// router.get('/:id', courseController.getCourseById);
// router.put('/:id', authMiddleware.authenticate, courseController.updateCourse);
// router.delete('/:id', authMiddleware.authenticate, courseController.deleteCourse);

router.post('/create', courseController.createCourse);
router.get('/list', courseController.listCourses);
router.get('/me/list', courseController.listMeCourses);
module.exports = router;