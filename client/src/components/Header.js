import React from 'react';
import './Header.scss';

const Header = () => {
  return (
    <header className="main-header">
      <div className="logo">
        <img src="/logo192.png" alt="Logo ENG CIVIL" />
      </div>

      <nav className="nav-links">
        <a href="#home">Home</a>
        <a href="#projects">Projects</a>
        <a href="#solutions">Solutions</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
};

export default Header;
