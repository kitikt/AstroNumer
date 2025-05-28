import React, { useState, useEffect } from "react";
import styles from "@/styles/Home/Home.module.css";
import SecondSection from "@/pages/Home/SecondSection";
import ThirdSection from "@/pages/Home/ThirdSection";
import FourthSection from "@/pages/Home/FourthSection";
import FirstSection from "@/pages/Home/FirstSection";
import SixSection from "@/pages/Home/SixSection";
import FifthSection from "@/pages/Home/FifthSection";
import SevenSection from "@/pages/Home/SevenSection";
import EightSection from "@/pages/Home/EightSection";
import FormHome from "@/components/ui/FormHome";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      setIsModalOpen(true);
    }
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = () => {
    setIsModalOpen(false);
  };

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
        <section className={`${styles.sevenSection}`}>
          <SevenSection />
        </section>
        <section className={`${styles.eightSection}`}>
          <EightSection />
        </section>
      </main>

      {/* Modal overlay */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <FormHome onClose={handleCloseModal} onSubmit={handleFormSubmit} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
