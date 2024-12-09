const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/create', paymentController.createPayment);
router.get('/student/:student_id', paymentController.getPaymentsByStudent);
// Các route khác như get...

module.exports = router;