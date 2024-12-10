// Định tuyến cho các API liên quan đến tài liệu.

const express = require('express');
const router = express.Router();
const materialController = require('../controllers/materialController');

router.post('/upload', materialController.uploadMaterial);
router.get('/view/:id', materialController.viewMaterial);
router.post('/create', materialController.createMaterial);
router.get('/lesson/:lesson_id', materialController.getMaterialsByLesson);
router.put('/update/:material_id', materialController.updateMaterial);
router.delete('/delete/:material_id', materialController.deleteMaterial);

module.exports = router;
