const Assignment = require('../models/Assignment');

exports.createAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.create(req.body);
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAssignmentsByLesson = async (req, res) => {
  try {
    const assignments = await Assignment.findAll({ where: { lesson_id: req.params.lesson_id } });
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.update(req.body, { where: { assignment_id: req.params.assignment_id } });
    res.status(200).json(assignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAssignment = async (req, res) => {
  try {
    await Assignment.destroy({ where: { assignment_id: req.params.assignment_id } });
    res.status(200).json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};