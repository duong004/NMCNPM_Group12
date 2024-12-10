const Review = require('../models/Review');

exports.createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReviewsByCourse = async (req, res) => {
  try {
    const reviews = await Review.findAll({ where: { course_id: req.params.course_id } });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Các phương thức khác như updateReview, deleteReview, getReviews...
