const db = require('../config/db');
const Lesson = require('../models/Lesson');

const generateLessonId = (lessonCount) => {
  const lessonIdNumber = lessonCount + 1;
  return `L${lessonIdNumber.toString().padStart(3, '0')}`;
};

exports.createLesson = async (req, res) => {
  const { course_id, title, content, lesson_order } = req.body;
  
  const countLessonsSql = 'SELECT COUNT(*) as count FROM lessons';
  db.query(countLessonsSql, async (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Lỗi server' });
    }
    const lessonId = generateLessonId(result[0].count);
    const insertSql = 'INSERT INTO lessons (lesson_id, course_id, title, content, lesson_order) VALUES (?,?,?,?,?)';
    const values = [lessonId, course_id, title, content, lesson_order];
    db.query(insertSql, values, (insertErr, result) => {
      if (insertErr) {
        return res.status(500).json({ message: "Lỗi server" });
      }
      return res.status(201).json({ message: "Bài học đã được tạo", lessonId });
    })
  });
};

exports.getTotalLesson = async (req, res) => {
  try {
      const courseId = req.query.course_id; // Lấy course_id từ query string

      if (!courseId) {
          return res.status(400).json({ message: 'course_id không được để trống' });
      }

      const sql = `SELECT COUNT(*) AS total FROM lessons WHERE course_id = ?`;

      // Truy vấn cơ sở dữ liệu
      db.query(sql, [courseId], (err, results) => {
          if (err) {
              return res.status(500).json({ message: 'Lỗi server', error: err.message });
          }

          const totalLessons = results[0]?.total || 0; // Lấy số lượng bài học
          res.status(200).json({ totalLessons });
      });
  } catch (error) {
      res.status(500).json({ message: 'Lỗi server', error: error.message });
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
