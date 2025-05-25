import React, { useEffect, useRef } from "react";
import styles from "@/styles/Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Heading, Button } from "@chakra-ui/react";
import { useAuth } from "@/hooks/useAuth";

const Header: React.FC = () => {
  const navbarRef = useRef<HTMLElement>(null);
  const lastScrollPosRef = useRef(0);
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const navbar = navbarRef.current;

      if (navbar) {
        if (scrollTop > lastScrollPosRef.current) {
          navbar.style.transition = "all 0.4s ease";
          navbar.style.transform = "translateY(-100%)";
        } else {
          navbar.style.transition = "all 0.6s ease";
          navbar.style.transform = "translateY(0)";
        }
      }
      lastScrollPosRef.current = scrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <header ref={navbarRef} className={styles.header}>
      <div className={styles.imageContainer}>
        <img src="/images/logo.png" alt="Logo" className={styles.logo} />
        <Heading className={styles.brandText}>ASTRONUMER</Heading>
      </div>

      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>
          Trang chủ
        </Link>
        <Link to="/about" className={styles.link}>
          Về chúng tôi
        </Link>
        <Link to="/service" className={styles.link}>
          Dịch vụ
        </Link>
        <Link to="#" className={styles.link}>
          Blog
        </Link>
        <Link to="#" className={styles.link}>
          Liên hệ
        </Link>

        {isLoggedIn ? (
          <Button
            className={styles.link}
            onClick={handleLogout}
            ml={4}
            background={"transparent"}
          >
            Logout
          </Button>
        ) : (
          <Link
            to="/login"
            className={styles.link}
            style={{ marginLeft: "16px" }}
          >
            Đăng nhập
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
