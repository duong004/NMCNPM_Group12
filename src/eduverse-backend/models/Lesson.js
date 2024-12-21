// Mô hình dữ liệu cho bài học

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('eduverse_db', 'root', '07052004', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

const Lesson = sequelize.define('lessons', {
  lesson_id: {
    type: DataTypes.STRING(20),
    primaryKey: true
  },
  course_id: {
    type: DataTypes.STRING(20),
    references: {
      model: 'courses',
      key: 'course_id'
    }
  },
  title: DataTypes.STRING(255),
  content: DataTypes.TEXT,
  lesson_order: DataTypes.INTEGER
},{
  timestamps: false // Kích hoạt các trường createdAt và updatedAt
});

module.exports = Lesson;