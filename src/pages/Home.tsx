import React, { ReactNode } from "react";

import { Link } from "react-router-dom";
import Button from "@/components/Button";
import styles from "@/styles/Home.module.css"
import SecondPage from "@/pages/SecondPage";
import ThirdPage from "@/pages/ThirdPage";
import FourthPage from "@/pages/FourthPage";
import FirstSection from "@/pages/FirstPage";

const HomePage = ({ children }: { children?: ReactNode }) => {
    return (
        <main className={styles.main}>
            <section className={`${styles.section} ${styles.FirstSection}`}>
                <FirstSection />
            </section>
            {/* <h1 className={styles.heading}>BẠN LÀ AI TRONG VŨ TRỤ NÀY</h1>
            <p className={styles.subheading}>
                Hãy khám phá hành trình của bạn giữa các vì sao và những con số cùng với Astronumer nhé
            </p> */}
            {/* <Link to="/login" className={styles.buttonWrapper}>
                <Button label="ĐĂNG NHẬP" />
            </Link> */}
            <section className={`${styles.section} ${styles.secondSection}`}>
                <SecondPage />
            </section>
            <section className={`${styles.threeSection}`} >
                <ThirdPage />
            </section>
            <section className={`${styles.FourthSection}`} >
                <FourthPage />
            </section>
        </main>

    );
};

export default HomePage;