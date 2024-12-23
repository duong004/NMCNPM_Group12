// Xử lý logic cho các yêu cầu liên quan đến người dùng.

const db = require('../config/db');

exports.getUserProfile = (req, res) => {
    const userId = req.user.user_id;
    
    const userQuery = 'SELECT * FROM users WHERE user_id = ?';
    const personalQuery = 'SELECT * FROM personal WHERE user_id = ?';

    db.query(userQuery, [userId], (err, userData) => {
        if (err) return res.status(500).json({ message: 'Lỗi server' });
        if (userData.length === 0) return res.status(404).json({ message: 'Người dùng không tồn tại' });

        db.query(personalQuery, [userId], (err, personalData) => {
            if (err) return res.status(500).json({ message: 'Lỗi server' });
            if (personalData.length === 0) return res.status(404).json({ message: 'Thông tin cá nhân không tồn tại' });

            const userProfile = { ...userData[0], profile_picture: personalData[0].profile_picture };
            return res.json(userProfile);
        });
    });
};

/*exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.update(req.body, { where: { user_id: req.params.user_id } });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};*/