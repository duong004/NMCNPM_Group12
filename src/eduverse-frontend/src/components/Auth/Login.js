import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';
import './Login.css';

const LoginPage = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput = (e) => {
        setValues(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const res = await axios.post('http://localhost:5000/api/auth/login', values);
                if (res.data.message === "Đăng nhập thành công") {
                    navigate('/home');
                } else {
                    alert(res.data.message);
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            console.log("Form contains errors", validationErrors);
        }
    };

    return (
        <div className="login-page">
            <div className="login-box">
                <h2>Đăng nhập</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email"
                            value={values.email} 
                            onChange={handleInput} 
                            required 
                            className="form-control rounded-0"
                        />
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Mật khẩu:</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password"
                            value={values.password}
                            onChange={handleInput} 
                            required 
                            className="form-control rounded-0"
                        />
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                    </div>
                    <button type="submit" className="login-button">Đăng nhập</button>
                </form>
                <div className="links">
                    <p>Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link></p>
                    <p><Link to="/forgot-password">Quên mật khẩu?</Link></p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;