import styles from "@/styles/Home/Home.module.css";
import SecondSection from "@/pages/Home/SecondSection";
import ThirdSection from "@/pages/Home/ThirdSection";
import FourthSection from "@/pages/Home/FourthSection";
import FirstSection from "@/pages/Home/FirstSection";
import SixSection from "@/pages/Home/SixSection";
import FifthSection from "@/pages/Home/FifthSection";
import SevenSection from "@/pages/Home/SevenSection";
import EightSection from "@/pages/Home/EightSection";

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
        <SecondSection />
      </section>
      <section className={`${styles.threeSection}`}>
        <ThirdSection />
      </section>
      <section className={`${styles.fourthSection}`}>
        <FourthSection />
      </section>
      <section className={`${styles.fifthSection}`}>
        <FifthSection />
      </section>
      <section className={`${styles.sixSection}`}>
        <SixSection />
      </section>
      <section className={`${styles.sevenSection}`}>
        <SevenSection />
      </section>
      <section className={`${styles.eightSection}`}>
        <EightSection />
      </section>
    </main>
  );
};

export default HomePage;
