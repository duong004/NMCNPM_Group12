const Certificate = require('../models/Certificate');

exports.createCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.create(req.body);
    res.status(201).json(certificate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCertificatesByStudent = async (req, res) => {
  try {
    const certificates = await Certificate.findAll({ where: { student_id: req.params.student_id } });
    res.status(200).json(certificates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.update(req.body, { where: { certificate_id: req.params.certificate_id } });
    res.status(200).json(certificate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCertificate = async (req, res) => {
  try {
    await Certificate.destroy({ where: { certificate_id: req.params.certificate_id } });
    res.status(200).json({ message: 'Certificate deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};