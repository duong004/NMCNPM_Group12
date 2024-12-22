const express = require('express');
const router = express.Router();
const materialController = require('../controllers/materialController');
// const authMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Thư mục tạm để lưu trữ file trước khi upload lên Cloudinary


// Thêm tài liệu (Giáo viên)
// router.post('/materials', authMiddleware.authenticate, upload.single('file'), materialController.createMaterial);

// // Xem tài liệu của một bài học (Phạm vi xem phụ thuộc vai trò)
// router.get('/materials/:lesson_id', authMiddleware.authenticate, materialController.getMaterialsByLesson);

// // Cập nhật tài liệu (Giáo viên)
// router.put('/materials/:material_id', authMiddleware.authenticate, upload.single('file'), materialController.updateMaterial);

// // Xóa tài liệu (Giáo viên)
// router.delete('/materials/:material_id', authMiddleware.authenticate, materialController.deleteMaterial);
router.get('/materials/:lesson_id', materialController.getMaterialsByLesson);
router.post('/materials', upload.single('file'), materialController.createMaterial);
module.exports = router;