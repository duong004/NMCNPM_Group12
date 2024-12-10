const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');

router.post('/create', assignmentController.createAssignment);
router.get('/lesson/:lesson_id', assignmentController.getAssignmentsByLesson);
router.put('/update/:assignment_id', assignmentController.updateAssignment);
router.delete('/delete/:assignment_id', assignmentController.deleteAssignment);

module.exports = router;