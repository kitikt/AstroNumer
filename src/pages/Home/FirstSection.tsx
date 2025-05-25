import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import styles from "@/styles/Home/FirstSection.module.css";
import { useAuth } from "@/hooks/useAuth";

const FirstSection = () => {
  const { isLoggedIn } = useAuth();

  return (
    <section className={styles.firstSection}>
      {/* <img
        src="/images/space.png"
        alt="Cosmic Illustration"
        className={styles.cosmicImage}
      /> */}
      <h1 className={styles.heading}>BẠN LÀ AI TRONG VŨ TRỤ NÀY</h1>
      <p className={styles.subheading}>
        Hãy khám phá hành trình của bạn giữa các vì sao và những con số cùng với
        Astronumer nhé
      </p>

      {!isLoggedIn && (
        <Link to="/login" className={styles.buttonWrapper}>
          <Button>Đăng Nhập</Button>
        </Link>
      )}
    </section>
  );
};

export default FirstSection;
