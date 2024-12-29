import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAvatar, setUserAvatar] = useState('');
  useEffect(() => {
    // Kiểm tra xem có thông tin người dùng trong localStorage hay không
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
        setIsLoggedIn(storedUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userAvatar, setUserAvatar }}>
      {children}
    </AuthContext.Provider>
  );
};