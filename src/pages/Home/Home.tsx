import React from "react";

import styles from "@/styles/Home.module.css";
import SecondPage from "@/pages/Home/SecondSection";
import ThirdPage from "@/pages/Home/ThirdSection";
import FourthSection from "@/pages/Home/FourthSection";
import FirstSection from "@/pages/Home/FirstSection";
import SixPage from "@/pages/Home/SixSection";
import FifthPage from "@/pages/Home/FifthPage";
import SevenPage from "@/pages/Home/SevenSection";
import EightPage from "@/pages/Home/EightSection";

const HomePage = () => {
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
      <section className={`${styles.threeSection}`}>
        <ThirdPage />
      </section>
      <section className={`${styles.fourthSection}`}>
        <FourthSection />
      </section>
      <section className={`${styles.fifthSection}`}>
        <FifthPage />
      </section>
      <section className={`${styles.sixSection}`}>
        <SixPage />
      </section>
      <section className={`${styles.sevenSection}`}>
        <SevenPage />
      </section>
      <section className={`${styles.eightSection}`}>
        <EightPage />
      </section>
    </main>
  );
};

export default HomePage;
