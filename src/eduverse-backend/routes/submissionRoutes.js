const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');

router.post('/create', submissionController.createSubmission);
router.get('/assignment/:assignment_id', submissionController.getSubmissionsByAssignment);
router.put('/update/:submission_id', submissionController.updateSubmission);
router.delete('/delete/:submission_id', submissionController.deleteSubmission);

module.exports = router;