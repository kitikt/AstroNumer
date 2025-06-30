import styles from "@/styles/Home/Home.module.css";
import SecondSection from "@/pages/Home/SecondSection";
import ThirdSection from "@/pages/Home/ThirdSection";
import FourthSection from "@/pages/Home/FourthSection";
import FirstSection from "@/pages/Home/FirstSection";
import SixSection from "@/pages/Home/SixSection";
import FifthSection from "@/pages/Home/FifthSection";
import SevenSection from "@/pages/Home/SevenSection";
import EightSection from "@/pages/Home/EightSection";
import FeedbackSection from "@/pages/Home/FeedbackSection";

const HomePage = () => {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <main className={styles.main}>
        <section className={`${styles.section} ${styles.FirstSection}`}>
          <FirstSection />
        </section>
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
        {/* <section className={`${styles.sevenSection}`}>
          <SevenSection />
        </section> */}
        {/* <section className={`${styles.eightSection}`}>
          <EightSection />
        </section> */}
        <section className={`${styles.feedbackSection}`}>
          <FeedbackSection />
        </section>
      </main>

      {/* Modal overlay */}
    </div>
  );
};

export default HomePage;
