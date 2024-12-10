const Submission = require('../models/Submission');

exports.createSubmission = async (req, res) => {
  try {
    const submission = await Submission.create(req.body);
    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSubmissionsByAssignment = async (req, res) => {
  try {
    const submissions = await Submission.findAll({ where: { assignment_id: req.params.assignment_id } });
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSubmission = async (req, res) => {
  try {
    const submission = await Submission.update(req.body, { where: { submission_id: req.params.submission_id } });
    res.status(200).json(submission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSubmission = async (req, res) => {
  try {
    await Submission.destroy({ where: { submission_id: req.params.submission_id } });
    res.status(200).json({ message: 'Submission deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
