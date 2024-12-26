import React, { createContext, useState, useEffect } from 'react';
import { login, logout, getUserProfile, parseJWT } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Retrieved token:', token); // Thêm dòng này
        if (token) {
            const decodedToken = parseJWT(token);
            console.log('Decoded token:', decodedToken); // Thêm dòng này
            getUserProfile()
                .then(profile => {
                    setUser({ ...profile, ...decodedToken });
                    console.log('User profile set:', profile);
                    setIsLoggedIn(true);
                })
                .catch(error => {
                    console.error("Failed to get user profile", error);
                    setIsLoggedIn(false);
                    logout(); // Xóa token nếu không lấy được thông tin người dùng
                });
        }
    }, []);

    const handleLogin = async (email, password) => {
        try {
            const data = await login(email, password);
            const decodedToken = parseJWT(data.token);
            setUser({ ...data.user, ...decodedToken });
            setIsLoggedIn(true);
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        }
    };

    const handleLogout = () => {
        logout();
        setUser(null);
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login: handleLogin, logout: handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};