import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './LoginValidation'
import axios from 'axios'
function Login() {
    const [values, setValues] = useState({
        email: '',
        password: '',
    })
    const navigate = useNavigate()
    const [errors, setErrors] = useState({ })
    const handleInput = (e) => {
        setValues(prev => ({...prev, [e.target.name]: e.target.value}))
    }
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
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <form action="" onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email">
                            Email:
                        </label>
                        <input type="email" placeholder="Enter email" name="email" 
                        onChange={handleInput} className='form-control rounded-0' required />
                        {errors.email && <span className='text-danger'> {errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password">
                            Password:
                        </label>
                        <input type="password" placeholder="Enter Password" name="password"
                        onChange={handleInput} className='form-control rounded-0' required />
                        {errors.password && <span className='text-danger'> {errors.password}</span>}
                    </div>
                    <button type="submit" className='btn btn-success w-100'>Log in</button>
                    <p>You are agree to our terms and policies</p>
                    <Link to="/register" className='btn btn-default border w-100 text-decoration-none'>Create Account</Link>
                </form>
            </div>
        </div>
    )
}

export default Login