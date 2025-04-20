import React from "react";
import styles from "@/styles/Header.module.css";
import { Link } from "react-router-dom";
import { Heading } from "@chakra-ui/react";

const Header: React.FC = () => {
  const navbar = document.querySelector('header');
  var lastScrollPos = 0;
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    if (navbar) {
      if (scrollTop > lastScrollPos) {
        navbar.style.transition = 'all .4s ease';
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transition = 'all .6s ease';
        navbar.style.transform = 'translateY(0)';
      }
    }
    lastScrollPos = scrollTop;

  })
  return (
    <header className={styles.header}>
      <div className={styles.imageContainer}>
        <img src="/images/logo.png" alt="Logo" className={styles.logo} />
        <Heading className={styles.brandText}>ASTRONUMER</Heading>
      </div>


      <nav className={styles.nav}>
        <Link to='/' className={styles.link}>Trang chủ</Link>
        <Link to="#" className={styles.link}>Về chúng tôi</Link>
        <Link to="#" className={styles.link}>Dịch vụ</Link>
        <Link to="#" className={styles.link}>Blog</Link>
        <Link to="#" className={styles.link}>Liên hệ</Link>
      </nav>
    </header>
  );
};

export default Header;
