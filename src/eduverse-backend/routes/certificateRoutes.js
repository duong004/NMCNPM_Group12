const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');

router.post('/create', certificateController.createCertificate);
router.get('/student/:student_id', certificateController.getCertificatesByStudent);
router.put('/update/:certificate_id', certificateController.updateCertificate);
router.delete('/delete/:certificate_id', certificateController.deleteCertificate);

module.exports = router;