import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './Header.css';  
import logo from '../../assets/images/EduVerse_apose_1.svg'; 
import { FaSearch, FaCaretDown, FaGlobe, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaUser, FaBook, FaWallet, FaCertificate, FaCog } from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthContext';
import { searchCourses } from './search'; // Import hàm tìm kiếm
import { courses } from './courses'; // Import dữ liệu giả lập

const Header = () => {
  const { isLoggedIn, userAvatar, logout } = useContext(AuthContext); // Lấy setIsLoggedIn từ AuthContext
  const [dropdownOpen, setDropdownOpen] = useState(false); // dropdown Khám phá
  const [languageOpen, setLanguageOpen] = useState(false); // dropdown ngôn ngữ
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false); // dropdown Avatar
  //const [avatarDropdownOpen, setAvatarDropdownOpen] = useState(false); // State for avatar dropdown
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate(); 

  // Hàm để mở/tắt dropdown Khám phá
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Hàm để mở/tắt dropdown ngôn ngữ
  const toggleLanguageDropdown = () => setLanguageOpen(!languageOpen);

  // Hàm để mở/tắt dropdown Avatar
  const toggleAvatarMenu = () => setAvatarMenuOpen(!avatarMenuOpen);

  // Hàm đăng xuất
  const handleLogout = () => { 
    logout(); 
    navigate('/'); 
  };

  // Hàm tìm kiếm
  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  useEffect(() => {
    const results = searchCourses(courses, searchQuery);
    setSearchResults(results);
  }, [searchQuery]);

  return (
    <header className="header">
      <div className="header-toolbar">
        {/* Logo */}
        <a href="/">
          <img src={logo} alt="EduVerse Logo" className="header-logo" />
        </a>

        {/* Dropdown Khám phá */}
        <div className="header-dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
          <button className="header-dropdown-button">
            Khám phá <FaCaretDown />
          </button>
          {dropdownOpen && (
            <div className="header-dropdown-content">
              {/* Danh sách các lĩnh vực khóa học */}
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
          <input type="text" placeholder="Tìm kiếm..." className="header-search-input" value={searchQuery} onChange={handleSearchChange} onKeyPress={handleKeyPress} />
          <button className="header-search-button" onClick={() => navigate(`/search?q=${searchQuery}`)}><FaSearch /></button>
          <div className="header-search-results">
            {searchResults.length > 0 ? (
              <ul>
                {searchResults.map(course => (
                  <li key={course.id} className="header-search-result-item" onClick={() => navigate(`/courses/${course.id}`)}>
                    <img src={course.image} alt={course.name} className="header-search-result-image" />
                    <div className="header-search-result-info">
                      <h3>{course.name}</h3>
                      <p>{course.description}</p>
                      <p>Giáo viên: {course.teacher}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              searchQuery && <p className="header-no-search-results">Không tìm thấy khóa học nào phù hợp.</p>
            )}
          </div>
        </div>

        {/* Các nút Đăng nhập, Đăng ký hoặc Ảnh đại diện người dùng */}
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="header-btn"><FaSignInAlt />Đăng nhập</Link>
            <Link to="/register" className="header-btn"><FaUserPlus />Đăng ký</Link>
          </>
        ) : (
          <div 
            className="header-user-section" onMouseEnter={toggleAvatarMenu} onMouseLeave={toggleAvatarMenu} 
            //onMouseEnter={() => setAvatarDropdownOpen(true)} 
            //onMouseLeave={() => setAvatarDropdownOpen(false)}
          >
            <img src={userAvatar} alt="User Avatar" className="header-avatar" />
            {avatarMenuOpen && (
              <div className="header-avatar-menu">
                <Link to="/my-profile" className="header-avatar-menu-item"><FaUser /> Hồ sơ của tôi</Link>
                <Link to="/my-courses" className="header-avatar-menu-item"><FaBook /> Khóa học của tôi</Link>
                <Link to="/transactions" className="header-avatar-menu-item"><FaWallet /> Giao dịch</Link>
                {/* Thêm các mục khác nếu cần */}
                <Link to="/settings" className="header-avatar-menu-item"><FaCog /> Cài đặt</Link>
                <button onClick={handleLogout} className="header-avatar-menu-item"><FaSignOutAlt /> Đăng xuất</button>
              </div>
            )}
          </div>
        )}

        {/* Dropdown chọn ngôn ngữ */}
        <div className="header-language-dropdown" onMouseEnter={toggleLanguageDropdown} onMouseLeave={toggleLanguageDropdown}>
          <button className="header-language-button"><FaGlobe /></button>
          {languageOpen && (
            <div className="header-language-content">
              {/* Danh sách các ngôn ngữ */}
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