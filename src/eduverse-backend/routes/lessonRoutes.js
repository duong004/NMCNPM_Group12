const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');

router.post('/create', lessonController.createLesson);
router.get('/total', lessonController.getTotalLesson);
router.get('/course/:course_id', lessonController.getLessonsByCourse);
router.put('/update/:lesson_id', lessonController.updateLesson);
router.delete('/delete/:lesson_id', lessonController.deleteLesson);
// Các route khác như update, delete, get...

module.exports = router;