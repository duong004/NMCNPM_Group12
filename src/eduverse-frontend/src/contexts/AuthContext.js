import React, { createContext, useState, useEffect } from 'react';
import defaultAvatar from '../assets/images/default_user.jpg';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [userAvatar, setUserAvatar] = useState(defaultAvatar);
  useEffect(() => {
    // Kiểm tra xem có thông tin người dùng trong localStorage hay không
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedUserInfo = JSON.parse(localStorage.getItem('userData'));
    console.log('defaultAvatar:', defaultAvatar); 
    if (storedUser) {
      setIsLoggedIn(storedUser);
      setUser(storedUser);
    }
    if (storedUserInfo){
      setUserInfo(storedUserInfo);
      const profilePicture = storedUserInfo.personalInfo?.[0]?.profile_picture;
      const avatar = profilePicture ? profilePicture : defaultAvatar; 
      setUserAvatar(avatar);
    }else {
      setUserAvatar(defaultAvatar); // Đặt ảnh mặc định nếu không có storedUserInfo
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, userInfo, setUserInfo, userAvatar, setUserAvatar }}>
      {children}
    </AuthContext.Provider>
  );
};