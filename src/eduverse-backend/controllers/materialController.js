// Xử lý logic cho các yêu cầu liên quan đến tài liệu.

const Material = require('../models/Material');

exports.createMaterial = async (req, res) => {
  try {
    const material = await Material.create(req.body);
    res.status(201).json(material);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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