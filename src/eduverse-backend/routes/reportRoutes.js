// Định tuyến cho các API liên quan đến báo cáo.

const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/activity', reportController.getActivityReport);
router.get('/progress', reportController.getProgressReport);

module.exports = router;