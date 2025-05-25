// src/components/FirstSection.tsx
import { Button, } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import styles from "@/styles/Home/FifthSection.module.css";

const FifthSection = () => {
    return (
        <section className={styles.fifthSection}>
            {/* <img
                src="/images/space.png"
                alt="Cosmic Illustration"
                className={styles.cosmicImage}
            /> */}
            <h1 className={styles.heading}>HÃY THAM GIA THÀNH VIÊN CÙNG CHÚNG TÔI <br /> ĐỂ NHẬN ƯU ĐÃI</h1>

            <Link to="/login" className={styles.buttonWrapper}>
                <Button>THAM GIA </Button>
            </Link>
        </section>
    );
};

export default FifthSection;