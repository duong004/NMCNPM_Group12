// Định tuyến cho các API liên quan đến tài liệu.

const express = require('express');
const router = express.Router();
const materialController = require('../controllers/materialController');

router.post('/upload', materialController.uploadMaterial);
router.get('/view/:id', materialController.viewMaterial);

module.exports = router;