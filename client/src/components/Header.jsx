import React, { useState } from 'react';
import './Header.scss';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="main-header">
      <div className="logo">
         <a href="/"> 
          <img src="/logo192.png" alt="Logo ENG CIVIL" />
        </a>
      </div>

      {/* Links de navegação (dropdown mobile fora do header) */}
      <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <a href="/">Home</a>
        <a href="/aitools">AI Tools</a>
        <a href="/about">About</a>
      </nav>

      <div className="header-right-controls">
        <a href="/login-seller" className="cta-button">Login</a>
        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          ☰
        </button>
      </div>
    </header>
  );
};

export default Header;
