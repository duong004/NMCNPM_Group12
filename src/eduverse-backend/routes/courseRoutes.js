// Định tuyến cho các API liên quan đến khóa học.

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.post('/create', courseController.createCourse);
router.put('/update/:id', courseController.updateCourse);
router.delete('/delete/:id', courseController.deleteCourse);
router.get('/list', courseController.listCourses);

module.exports = router;