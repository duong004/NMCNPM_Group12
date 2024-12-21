import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
// import logo from '../../assets/images/EduVerse_apose_1.svg';
import orgLogo from '../../assets/images/Footer-OrgLogo.jpg';
import { FaPhone, FaEnvelope, FaFacebook, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-column left-column">
                    {/* <img src={logo} alt="EduVerse Logo" className="footer-logo" /> */}
                    <h1>EduVerse</h1>
                    <p><FaPhone /> Số điện thoại: 0123 456 789</p>
                    <p><FaEnvelope /> Email: info@eduverse.com</p>
                    <p><FaFacebook /> Facebook: facebook.com/eduverse</p>
                    <p><FaTwitter /> Twitter: twitter.com/eduverse</p>
                </div>
                <div className="footer-column middle-column">
                    <h3>Đại học ABCDEF</h3>
                    <p>Số 1, Đường RTYUIOP, phường POILKGBN, quận MVBDNDM, Thành phố JNFJBF</p>
                </div>
                <div className="footer-column right-column">
                    <div className="right-subcolumn">
                        <h4>Thông tin</h4>
                        <p>Quy định chung</p>
                        <p>Hướng dẫn</p>
                        <p>Các chính sách</p>
                        <p>Tin tức</p>
                    </div>
                    <div className="right-subcolumn">
                        <h4>Liên kết</h4>
                        <Link to="/home">Trang chủ</Link>
                        <Link to="/contact">Liên hệ</Link>
                        <Link to="/info">Thông tin hàng hóa</Link>
                        <Link to="/ads">Liên hệ quảng cáo</Link>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p className="small-text">Built by Group 12.</p>
                <p className="small-text">Powered by ABCD.</p>
                <p>&nbsp;</p> {/* Dòng trống */}
                <p className="small-text">©Copyright 2024 EduVerse. All rights reserved.</p>
                <div className="organizer">
                    <p>Đơn vị tổ chức</p>
                    <img src={orgLogo} alt="Organizer Logo" className="org-logo" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;