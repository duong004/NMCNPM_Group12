// Xử lý logic cho các yêu cầu liên quan đến tài liệu.
const db = require('../config/db');
const Material = require('../models/Material');

const generateMaterielId = (materialCount) => {
  const materialIdNumber = materialCount + 1;
  return `M${materialIdNumber.toString().padStart(3, '0')}`;
};

exports.createMaterial = async (req, res) => {
  const { lesson_id, title, type, content_url } = req.body;
  console.log(req.body)
    
  const countMaterialSql = 'SELECT COUNT(*) as count FROM materials';
  db.query(countMaterialSql, async (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Lỗi server' });
    }
    const materialId = generateMaterielId (result[0].count);
    const insertSql = `INSERT INTO materials (material_id, lesson_id, title, type, content_url, uploaded_at) VALUES (?,?,?,?,?,?)`;
    const uploaded_at = new Date();

    const values = [materialId, lesson_id, title, type, content_url, uploaded_at];
    db.query(insertSql, values, (insertErr, result) => {
      if (insertErr) {
        return res.status(500).json({ message: "Lỗi server" });
      }
      return res.status(201).json({ message: "Tài liệu đã được tạo", materialId });
    })
  });
};


exports.getMaterialsByLesson = async (req, res) => {
  try {
    const materials = await Material.findAll({ where: { lesson_id: req.params.lesson_id } });
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMaterial = async (req, res) => {
  try {
    const material = await Material.update(req.body, { where: { material_id: req.params.material_id } });
    res.status(200).json(material);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMaterial = async (req, res) => {
  try {
    await Material.destroy({ where: { material_id: req.params.material_id } });
    res.status(200).json({ message: 'Material deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};