import React, { createContext, useState, useEffect } from 'react';
import { login, logout, getUserProfile } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getUserProfile()
                .then(profile => {
                    setUser(profile);
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
            setUser(data.user);
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


/*import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAvatar, setUserAvatar] = useState('');

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userAvatar, setUserAvatar }}>
      {children}
    </AuthContext.Provider>
  );
};*/