const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.post('/create', reviewController.createReview);
router.get('/course/:course_id', reviewController.getReviewsByCourse);
router.put('/update/:review_id', reviewController.updateReview);
router.delete('/delete/:review_id', reviewController.deleteReview);
// Các route khác như update, delete, get...

module.exports = router;