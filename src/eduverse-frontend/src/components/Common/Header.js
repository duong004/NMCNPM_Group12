import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaCaretDown, FaGlobe, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaUser, FaBook, FaWallet, FaCertificate, FaCog } from 'react-icons/fa';
import './Header.css';
import logo from '../../assets/images/Coursera_test.svg';
import { AuthContext } from '../../contexts/AuthContext';

const Header = () => {
    const { user, isLoggedIn, logout } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);   // dropdown Khám phá
    const [languageOpen, setLanguageOpen] = useState(false);  // dropdown ngôn ngữ
    const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
    const navigate = useNavigate();

    // Hàm để mở/tắt dropdown Khám phá
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    // Hàm để mở/tắt dropdown ngôn ngữ
    const toggleLanguageDropdown = () => setLanguageOpen(!languageOpen);
    const toggleAvatarMenu = () => setAvatarMenuOpen(!avatarMenuOpen);

    const handleLogout = () => {
        logout();
        navigate('/login');  // Chuyển hướng người dùng đến trang đăng nhập
    };

    return (
        <header className="header">
            <div className="header-toolbar">
                {/* Logo */}
                <img src={logo} alt="EduVerse Logo" className="header-logo" />
                <h1 className="header-site-title">EduVerse</h1>

                {/* Dropdown Khám phá */}
                <div className="header-dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
                    <button className="header-dropdown-button">
                        Khám phá <FaCaretDown />
                    </button>
                    {dropdownOpen && (
                        <div className="header-dropdown-content">
                            <div className="header-dropdown-category">Lập trình</div>
                            <div className="header-dropdown-category">Kinh doanh</div>
                            <div className="header-dropdown-category">Tài chính - Kế toán</div>
                            <div className="header-dropdown-category">Văn phòng</div>
                            <div className="header-dropdown-category">Thiết kế</div>
                            <div className="header-dropdown-category">Marketing</div>
                            <div className="header-dropdown-category">Nhiếp ảnh</div>
                            <div className="header-dropdown-category">Sức khỏe - Thể dục</div>
                            <div className="header-dropdown-category">Âm nhạc - Mỹ thuật</div>
                            <div className="header-dropdown-category">Khác</div>
                        </div>
                    )}
                </div>

                {/* Khung tìm kiếm */}
                <div className="header-search-bar">
                    <input type="text" placeholder="Tìm kiếm..." className="header-search-input" />
                    <button className="header-search-button"><FaSearch /></button>
                </div>

                {!isLoggedIn ? (
                    <>
                        <Link to="/login" className="header-btn"><FaSignInAlt /> Đăng nhập</Link>
                        <Link to="/register" className="header-btn"><FaUserPlus /> Đăng ký</Link>
                    </>
                ) : (
                    <div className="header-user-section">
                        <img src={user.profile_picture} alt="User Avatar" className="header-avatar" onClick={toggleAvatarMenu} />
                        {avatarMenuOpen && (
                            <div className="header-avatar-menu">
                                <Link to="/profile" className="header-avatar-menu-item"><FaUser /> Hồ sơ của tôi</Link>
                                <Link to="/my-courses" className="header-avatar-menu-item"><FaBook /> Khóa học của tôi</Link>
                                <Link to="/transactions" className="header-avatar-menu-item"><FaWallet /> Giao dịch</Link>
                                {user.role === 'Học viên' && (
                                    <Link to="/certificates" className="header-avatar-menu-item"><FaCertificate /> Chứng chỉ của tôi</Link>
                                )}
                                <Link to="/settings" className="header-avatar-menu-item"><FaCog /> Cài đặt</Link>
                                <button onClick={handleLogout} className="header-avatar-menu-item"><FaSignOutAlt /> Đăng xuất</button>
                            </div>
                        )}
                    </div>
                )}

                {/* Dropdown chọn ngôn ngữ */}
                <div className="header-language-dropdown" onClick={toggleLanguageDropdown}>
                    <button className="header-language-button"><FaGlobe /></button>
                    {languageOpen && (
                        <div className="header-language-content">
                            <div className="header-language-option">English</div>
                            <div className="header-language-option">Vietnamese</div>
                            <div className="header-language-option">Chinese</div>
                            <div className="header-language-option">Japanese</div>
                            <div className="header-language-option">Russian</div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;