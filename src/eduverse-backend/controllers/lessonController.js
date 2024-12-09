const Lesson = require('../models/Lesson');

exports.createLesson = async (req, res) => {
  try {
    const lesson = await Lesson.create(req.body);
    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLessonsByCourse = async (req, res) => {
  try {
    const lessons = await Lesson.findAll({ where: { course_id: req.params.course_id } });
    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateLesson = async (req, res) => {
  try {
    const lesson = await Lesson.update(req.body, { where: { lesson_id: req.params.lesson_id } });
    res.status(200).json(lesson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteLesson = async (req, res) => {
  try {
    await Lesson.destroy({ where: { lesson_id: req.params.lesson_id } });
    res.status(200).json({ message: 'Lesson deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
