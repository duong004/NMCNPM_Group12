// Mô hình dữ liệu cho tài liệu.

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('eduverse_db', 'root', '07052004', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

const Material = sequelize.define('materials', {
  material_id: {
    type: DataTypes.STRING(20),
    primaryKey: true
  },
  lesson_id: {
    type: DataTypes.STRING(20),
    references: {
      model: 'lessons',
      key: 'lesson_id'
    }
  },
  title: DataTypes.STRING(255),
  type: DataTypes.ENUM('Tài liệu', 'Video'),
  content_url: DataTypes.STRING(255),
  uploaded_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false,
});

module.exports = Material;