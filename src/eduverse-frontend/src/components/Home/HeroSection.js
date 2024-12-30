import React from 'react';
import './HeroSection.css';
import coverImage from '../../assets/images/Home-Section.jpg';
import { Link } from 'react-router-dom'

const HeroSection = () => {
    return (
        <div className="hero-section">
            <img src={coverImage} alt="EduVerse Cover" className="hero-image" />
            <div className="hero-content">
                <h1>Welcome to EduVerse</h1>
                <p>Explore a world of learning and enhance your skills with our diverse range of courses.</p>
                <Link to="/register" className="cta-button">Get Started</Link>
            </div>
        </div>
        
    );
};

export default HeroSection;