import React, { useState } from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the menu state
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo/Name */}
        <div className="navbar-logo">
          <h1>Your Name</h1> {/* Replace with your name or logo */}
        </div>

        {/* Hamburger Icon (Three Lines) */}
        <div className="hamburger" onClick={toggleMenu}>
          {!isOpen ? (
            <>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </>
          ) : null}
        </div>

        {/* Navigation Links with Cross Button */}
        <nav className={`nav-links ${isOpen ? 'active' : ''}`}>
          {/* Cross Button Inside Menu */}
          {isOpen && (
            <div className="close-btn" onClick={toggleMenu}>
              <span className="cross-bar"></span>
              <span className="cross-bar"></span>
            </div>
          )}
          <a href="#home" onClick={toggleMenu}>Home</a>
          <a href="#about" onClick={toggleMenu}>About</a>
          <a href="#skills" onClick={toggleMenu}>Skills</a>
          <a href="#projects" onClick={toggleMenu}>Projects</a>
          <a href="#hobbies" onClick={toggleMenu}>Hobbies</a>
          <a href="#timeline" onClick={toggleMenu}>Timeline</a>
          <a href="#contact" onClick={toggleMenu}>Contact</a>
        </nav>

        {/* CTA Button (Visible on Desktop Only) */}
        <div className="cta-button">
          <button>Contact Me</button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;