import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
// import NotificationBell from "./notification/NotificationRealtime";
import { useAuth } from "@/hooks/useAuth";

const Header: React.FC = () => {
  const navbarRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const lastScrollPosRef = useRef(0);
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

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

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  return (
    <header ref={navbarRef} className={styles.header}>
      <div className={styles.imageContainer}>
        <img src="/images/logo.png" alt="Logo" className={styles.logo} />
        <Heading className={styles.brandText}>ASTRONUMER</Heading>
      </div>
      {/* <NotificationBell /> */}

      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>
          Trang chủ
        </Link>

        <Link to="/about" className={styles.link}>
          Về chúng tôi
        </Link>
        <Link to="/service" className={styles.link}>
          Gói VIP
        </Link>

        {/* Tra cứu Dropdown */}
        <div className={styles.dropdown} ref={dropdownRef}>
          <button onClick={toggleDropdown} className={styles.link}>
            Tra cứu
            <span
              className={`${styles.arrow} ${
                isDropdownOpen ? styles.arrowOpen : ""
              }`}
            >
              ▲
            </span>
          </button>
          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              <Link to="/form/numerology" className={styles.dropdownItem}>
                Thần Số Học
              </Link>
              {/* <Link to="/lookup/numerology" className={styles.dropdownItem}>
                Thần Số Học Cho Con
              </Link> */}
              {/* <Link to="/lookup/forecast" className={styles.dropdownItem}>
                Trắc Nghiệm DISC
              </Link>
            
              {/* <Link to="/lookup/forecast" className={styles.dropdownItem}>
                Tra Cứu Tử Vi
              </Link> */}
              <Link to="/form/starmap" className={styles.dropdownItem}>
                Tra Cứu Bản Đồ Sao
              </Link>
              <Link to="/chat" className={styles.dropdownItem}>
                Chat với AI
              </Link>
              <Link to="/mbti" className={styles.dropdownItem}>
                Trắc Nghiệm MBTI
              </Link>
            </div>
          )}
        </div>

        <Link to="#" className={styles.link}>
          Bài viết
        </Link>
        <Link to="#" className={styles.link}>
          Liên hệ
        </Link>

        {isLoggedIn ? (
          <div className={styles.dropdown} ref={profileDropdownRef}>
            <button onClick={toggleProfileDropdown} className={styles.link}>
              <img
                src="/images/avatar.png"
                alt="Avatar"
                className={styles.avatar}
              />
              <span
                className={`${styles.arrow} ${
                  isProfileDropdownOpen ? styles.arrowOpen : ""
                }`}
              >
                ▲
              </span>
            </button>
            {isProfileDropdownOpen && (
              <div className={styles.profileDropdownMenu}>
                <Link to="/profile/transaction" className={styles.dropdownItem}>
                  Tra cứu giao dịch tài khoản
                </Link>
                <Link to="/profile/edit" className={styles.dropdownItem}>
                  Đổi thông tin
                </Link>
                <button
                  onClick={handleLogout}
                  className={styles.dropdownItem}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
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
