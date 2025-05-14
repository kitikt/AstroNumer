import styles from "@/styles/SevenPage.module.css";
import { useState } from "react";
import { motion } from "framer-motion";
import { PositionType } from "@/utils/Enum";

const SevenSection = () => {
  const [positionIndex, setPositionIndex] = useState([0, 1, 2, 3, 4]);

  const handleNext = () => {
    setPositionIndex((prevIndexes) => {
      const updatedIndexes = prevIndexes.map(
        (prevIndex) => (prevIndex + 1) % 5
      );

      return updatedIndexes;
    });
  };
  const handlePrev = () => {
    setPositionIndex((prevIndexes) => {
      const updatedIndexes = prevIndexes.map(
        (prevIndex) => (prevIndex - 1 + 5) % 5
      );
      return updatedIndexes;
    });
  };

  const images: string[] = [
    "/images/image1.png",
    "/images/image2.png",
    "/images/image3.png",
    "/images/image4.png",
    "/images/image5.png",
  ];

  const positions: PositionType[] = [
    "center",
    "right1",
    "right",
    "left",
    "left1",
  ];

  const imageVariants = {
    center: { x: "0%", scale: 1, zIndex: 5 },
    left1: { x: "-50%", scale: 0.7, zIndex: 2 },
    left: { x: "-90%", scale: 0.5, zIndex: 1 },
    right: { x: "90%", scale: 0.5, zIndex: 1 },
    right1: { x: "50%", scale: 0.7, zIndex: 2 },
  };

  return (
    <section className={styles.sevenSection}>
      <h1 className={styles.heading}>
        CÁC KHÁCH HÀNG NÓI
        <br />
        GÌ VỀ ASTRONUMER
      </h1>

      <div className={styles.slider}>
        {images.map((image, index) => (
          <motion.img
            key={index}
            src={image}
            className={styles.sliderImage}
            initial="center"
            animate={positions[positionIndex[index]]}
            variants={imageVariants}
            transition={{ duration: 0.5 }}
            style={{ width: "40%" }}
          />
        ))}
        <div className={styles.buttonWrapper}>
          <button onClick={handlePrev} className={styles.prevButton}>
            Previous
          </button>
          <button onClick={handleNext} className={styles.nextButton}>
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default SevenSection;
