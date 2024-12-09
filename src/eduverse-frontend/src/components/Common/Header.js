import React, { useState } from 'react';  
import { Link } from 'react-router-dom';
import './Header.css';  
import logo from '../../assets/images/Coursera_test.svg'; 

const Header = ({ isLoggedIn, userAvatar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);  // dropdown Khám phá
  const [languageOpen, setLanguageOpen] = useState(false);  // dropdown ngôn ngữ

  // Hàm để mở/tắt dropdown Khám phá
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Hàm để mở/tắt dropdown ngôn ngữ
  const toggleLanguageDropdown = () => setLanguageOpen(!languageOpen);

  return (
    <header className="header">
      <div className="toolbar">
        {/* Logo */}
        <img src={logo} alt="EduVerse Logo" className="logo" />
        <h1 className="site-title">EduVerse</h1>

        {/* Dropdown Khám phá */}
        <div className="dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
          <button className="dropdown-button">Khám phá ▼</button>
          {dropdownOpen && (
            <div className="dropdown-content">
              {/* Danh sách các lĩnh vực khóa học */}
              <div className="dropdown-category">Lập trình</div>
              <div className="dropdown-category">Kinh doanh</div>
              <div className="dropdown-category">Tài chính - Kế toán</div>
              <div className="dropdown-category">Văn phòng</div>
              <div className="dropdown-category">Thiết kế</div>
              <div className="dropdown-category">Marketing</div>
              <div className="dropdown-category">Nhiếp ảnh</div>
              <div className="dropdown-category">Sức khỏe - Thể dục</div>
              <div className="dropdown-category">Âm nhạc - Mỹ thuật</div>
              <div className="dropdown-category">Khác</div>
            </div>
          )}
        </div>

        {/* Khung tìm kiếm */}
        <div className="search-bar">
          <input type="text" placeholder="Tìm kiếm..." className="search-input" />
          <button className="search-button">🔍</button>
        </div>

        {/* Các nút Đăng nhập, Đăng ký hoặc Ảnh đại diện người dùng */}
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="btn">Đăng nhập</Link>
            <Link to="/register" className="btn">Đăng ký</Link>
          </>
        ) : (
          <Link to="/profile">
            <img src={userAvatar} alt="User Avatar" className="avatar" />
          </Link>
        )}

        {/* Dropdown chọn ngôn ngữ */}
        <div className="language-dropdown" onClick={toggleLanguageDropdown}>
          <button className="language-button">🌐</button>
          {languageOpen && (
            <div className="language-content">
              {/* Danh sách các ngôn ngữ */}
              <div className="language-option">English</div>
              <div className="language-option">Vietnamese</div>
              <div className="language-option">Chinese</div>
              <div className="language-option">Japanese</div>
              <div className="language-option">Russian</div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
