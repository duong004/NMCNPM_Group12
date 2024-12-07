import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './RegisterValidation'
import axios from 'axios'

function Register() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
    })
    const navigate  = useNavigate()
    const [errors, setErrors] = useState({ })
    const handleInput = (e) => {
        setValues(prev => ({...prev, [e.target.name]: e.target.value}))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const validationErrors = Validation(values)
        setErrors(validationErrors)

        if (errors.name === "" && errors.email === "" && errors.password === "" ) {
            axios.post('http://localhost:5000/api/auth/register', values)
            .then(res => {
                navigate('/login')
            })
            .catch(err => console.log(err))
        }

        if (Object.keys(validationErrors).length !== 0) {
            console.log("Form contains errors", validationErrors)
        } 
    }
    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <form action="" onSubmit ={handleSubmit}>
                    <h1 style={{ fontSize: '36px', textAlign: 'center' }}>Register</h1>
                    <div className='mb-3'>
                        <label htmlFor="name">
                            name:
                        </label>
                        <input type="text" placeholder="Enter name" name="name" 
                        onChange={handleInput} className='form-control rounded-0' required />
                        {errors.name && <span className='text-danger'> {errors.name}</span>}

                    </div>
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
                    <button className='btn btn-success w-100' type="submit">Sign up</button>
                    <p>You are agree to our terms and policies</p>
                    <Link to="/login" className='btn btn-default border w-100 text-decoration-none'>Log In</Link>
                </form>
            </div>
        </div>
    )
}

export default Register