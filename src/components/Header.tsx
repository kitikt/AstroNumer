import React from "react";
import "../styles/Header.css";
const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="/images/logo.png" alt="Logo" className="logo" />
        <span className="brand-text">ASTRONUMER</span>
      </div>
      <nav className="nav">
        <a href="#" className="link">Trang chủ</a>
        <a href="#" className="link">Về chúng tôi</a>
        <a href="#" className="link">Dịch vụ</a>
        <a href="#" className="link">Blog</a>
        <a href="#" className="link">Liên hệ</a>
      </nav>
    </header>
  );
};

export default Header;