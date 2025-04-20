import React, { useEffect, useRef } from "react";
import styles from "@/styles/Header.module.css";
import { Link } from "react-router-dom";
import { Heading } from "@chakra-ui/react";

const Header: React.FC = () => {
  const navbarRef = useRef<HTMLHeadElement>(null);
  const lastScrollPosRef = useRef(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const navbar = navbarRef.current;

      if (navbar) {
        if (scrollTop > lastScrollPosRef.current) {
          // Cuộn xuống: ẩn header
          navbar.style.transition = "all 0.4s ease";
          navbar.style.transform = "translateY(-100%)";
        } else {
          // Cuộn lên: hiện header
          navbar.style.transition = "all 0.6s ease";
          navbar.style.transform = "translateY(0)";
        }
      }
      lastScrollPosRef.current = scrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header ref={navbarRef} className={styles.header}>
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
