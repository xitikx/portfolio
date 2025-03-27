import React, { useState, useEffect } from "react";
import { FaUser, FaTools, FaProjectDiagram, FaEnvelope } from "react-icons/fa";
import "../styles/Navbar.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "about-me", text: "About", icon: <FaUser /> },
    { id: "skills", text: "Skills", icon: <FaTools /> },
    { id: "projects", text: "Projects", icon: <FaProjectDiagram /> },
    { id: "contact", text: "Contact", icon: <FaEnvelope /> },
  ];

  return (
    <>
      <header className="mobile-header">
        <h1 className="logo-text">Ritika Sharma</h1>
      </header>

      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">
          <div className="navbar-logo">
            <h1 className="logo-text">Ritika Sharma</h1>
          </div>

          <div className="nav-links">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="nav-link"
                onClick={(e) => handleNavClick(e, item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.text}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;