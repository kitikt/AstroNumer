import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Heading, Button } from "@chakra-ui/react";
import { useAuth } from "@/hooks/useAuth";

const Header: React.FC = () => {
  const navbarRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const lastScrollPosRef = useRef(0);
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
        <div className="relative group inline-block text-left">
          {/* Nút chính */}
          <button
            className="flex items-center gap-1 font-medium"
            style={{ color: "#fdecfbb5" }}
          >
            Tra cứu
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Dropdown menu */}
          <div className="absolute hidden group-hover:block mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
            <div className="py-2 text-gray-700 text-sm">
              <Link to="numerology"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
              >
                Thần số học
              </Link>
              <Link to="#"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
              >
                Thần số học cho con
              </Link>
              <Link to="#"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
              >
                Trắc nghiệm DISC
              </Link>
              <Link to="#"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
              >
                Trắc nghiệm MBTI
              </Link>
              <Link to="#"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
              >
                Tra cứu tử vi
              </Link>
              <Link to="#"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
              >
                Tra cứu bản đồ sao
              </Link>
            </div>
          </div>
        </div>
        <Link to="/about" className={styles.link}>
          Về chúng tôi
        </Link>
        <Link to="/service" className={styles.link}>
          Gói VIP
        </Link>

        {/* Dropdown */}
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
              <Link to="/lookup/astrology" className={styles.dropdownItem}>
                Thần Số Học
              </Link>
              <Link to="/lookup/numerology" className={styles.dropdownItem}>
                Thần Số Học Cho Con
              </Link>
              <Link to="/lookup/forecast" className={styles.dropdownItem}>
                Trắc Nghiệm DISC
              </Link>
              <Link to="/lookup/forecast" className={styles.dropdownItem}>
                Trắc Nghiệm MBTI
              </Link>
              <Link to="/lookup/forecast" className={styles.dropdownItem}>
                Tra Cứu Tử Vi
              </Link>
              <Link to="/lookup/forecast" className={styles.dropdownItem}>
                Tra Cứu Bản Đồ Sao
              </Link>
            </div>
          )}
        </div>

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
            background="transparent"
            padding="0 1rem"
            height="21.6px"
            display="flex"
            alignItems="center"
            lineHeight="21.6px"
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
