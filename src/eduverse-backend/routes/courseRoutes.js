// Định tuyến cho các API liên quan đến khóa học.

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController'); 

router.post('/create', courseController.createCourse);
router.get('/list', courseController.listCourses);
router.get('/:id', courseController.getCourseById);
router.put('/:id', courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);

module.exports = router;