// Định tuyến cho các API liên quan đến người dùng.

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/profile', userController.getUserProfile);
router.put('/update-profile', userController.updateUserProfile);

module.exports = router;