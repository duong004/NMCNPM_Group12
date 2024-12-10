const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.post('/create', notificationController.createNotification);
router.get('/:user_id', notificationController.getNotifications);
router.put('/mark-as-read/:notification_id', notificationController.markAsRead);
router.delete('/delete/:notification_id', notificationController.deleteNotification);
// Các route khác như delete...

module.exports = router;