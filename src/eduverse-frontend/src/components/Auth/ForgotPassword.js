import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ForgotPassword.css';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
          setMessage(response.data.message);
      } catch (error) {
          setMessage('Đã có lỗi xảy ra. Vui lòng thử lại.');
      }
    };

    return (
        <div className="forgot-password-page">
            <div className="forgot-password-box">
                <h2 className="forgot-password-heading">Quên Mật Khẩu</h2>
                <p className="forgot-password-para">Nhập email của bạn để nhận liên kết đặt lại mật khẩu.</p>
                <form onSubmit={handleSubmit}>
                    <div className="forgot-password-input-group">
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="Nhập email của bạn" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="forgot-password-reset-button">Gửi liên kết đặt lại mật khẩu</button>
                </form>
                <div className="forgot-password-links">
                    <p className="forgot-password-para"><Link to="/login">Quay lại đăng nhập</Link></p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
